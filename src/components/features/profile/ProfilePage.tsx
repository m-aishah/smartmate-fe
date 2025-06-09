
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/store/use-language";
import { useAuth } from "@/hooks/api/use-auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/ui/use-toast";
import { LogOut } from "lucide-react";
import { AccountTab } from "./AccountTab";
import { PreferencesTab } from "./PreferencesTab";

export function ProfilePage() {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <div className="space-y-6 pb-10 animate-fade-in relative z-50 pointer-events-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-orbitron smartmate-text-gradient glow-effect relative z-50">
          {t("profile")}
        </h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="account" className="w-full relative z-50">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 relative z-50">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        
        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
