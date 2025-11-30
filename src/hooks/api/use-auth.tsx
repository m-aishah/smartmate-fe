import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Authentication from "@/services/Authentication";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = new Authentication();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      if (auth.isAuthenticated()) {
        const userPayload = auth.getAccessTokenPayload();
        setUser(userPayload);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await auth.login({ email, password });
    const userPayload = auth.getAccessTokenPayload();
    setUser(userPayload);
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    console.log("Signing up with:", { firstName, lastName, email });
    const response = await auth.register({
      firstName,
      lastName,
      email,
      password,
    });
    console.log("Signup response:", response);
    const userPayload = auth.getAccessTokenPayload();
    setUser(userPayload);
  };

  const signOut = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
