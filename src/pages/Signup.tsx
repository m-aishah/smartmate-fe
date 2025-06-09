
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/ui/use-toast";
import { useAuth } from "@/hooks/api/use-auth";
import { useLanguage } from "@/hooks/store/use-language";

const Signup = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await signUp(firstName || "", lastName || "", email, password);
      toast({
        title: t("accountCreatedSuccessfully"),
        description: t("welcomeToSmartMate"),
      });
      navigate("/app/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred during signup.";
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
      <AuthForm mode="signup" onSubmit={handleSignup} isLoading={isLoading} />
    </div>
  );
};

export default Signup;
