
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/hooks/store/use-language";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (email: string, password: string, firstName?: string, lastName?: string) => void;
  isLoading: boolean;
}

export function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Security validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Za-z]/.test(password) && 
           /\d/.test(password) && 
           /[@$!%*#?&]/.test(password);
  };

  const sanitizeName = (name: string): string => {
    return name.trim().replace(/[<>]/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!email || !password) {
      toast({
        title: t("validationError"),
        description: t("pleaseFillAllFields"),
        variant: "destructive",
      });
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      toast({
        title: t("validationError"),
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (mode === "signup") {
      if (!firstName || !lastName) {
        toast({
          title: t("validationError"),
          description: t("pleaseFillAllFields"),
          variant: "destructive",
        });
        return;
      }

      // Password strength validation for signup
      if (!isStrongPassword(password)) {
        toast({
          title: t("validationError"),
          description: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
          variant: "destructive",
        });
        return;
      }

      // Sanitize names
      const sanitizedFirstName = sanitizeName(firstName);
      const sanitizedLastName = sanitizeName(lastName);
      
      onSubmit(email.trim().toLowerCase(), password, sanitizedFirstName, sanitizedLastName);
    } else {
      onSubmit(email.trim().toLowerCase(), password);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative z-10">
      <div className="absolute top-4 left-4 z-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md animate-fade-in glass-card relative z-30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-smartmate-teal to-smartmate-blue flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              SM
            </div>
          </div>
          <CardTitle className="text-2xl font-orbitron smartmate-text-gradient">
            {mode === "login" ? t("welcomeBack") : t("createAccount")}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === "login" 
              ? t("enterCredentials") 
              : t("enterDetails")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("firstName")}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="h-12 relative z-40"
                    autoComplete="given-name"
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("lastName")}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="h-12 relative z-40"
                    autoComplete="family-name"
                    maxLength={50}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 relative z-40"
                autoComplete="email"
                maxLength={254}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("password")}</Label>
                {mode === "login" && (
                  <Link to="/forgot-password" className="text-sm text-smartmate-teal hover:underline">
                    {t("forgotPassword")}
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 relative z-40 pr-10"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  maxLength={128}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters with letters, numbers, and special characters
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-12 bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 relative z-40" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>{mode === "login" ? t("loggingIn") : t("creatingAccount")}</span>
                </div>
              ) : (
                <span>{mode === "login" ? t("logIn") : t("signUp")}</span>
              )}
            </Button>
            <div className="text-center text-sm">
              {mode === "login" ? (
                <div>
                  {t("dontHaveAccount")}{" "}
                  <Link to="/signup" className="text-smartmate-teal hover:underline font-medium">
                    {t("signUp")}
                  </Link>
                </div>
              ) : (
                <div>
                  {t("alreadyHaveAccount")}{" "}
                  <Link to="/login" className="text-smartmate-teal hover:underline font-medium">
                    {t("logIn")}
                  </Link>
                </div>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
