
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/ui/use-toast";
import { useAuth } from "@/hooks/api/use-auth";
import { useLanguage } from "@/hooks/store/use-language";

const Login = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: t("loginSuccessful"),
        description: t("welcomeBack"),
      });
      navigate("/app/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred during login.";
      toast({
        title: t("error"),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen circuit-bg floating-particles">
      <AuthForm mode="login" onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default Login;
