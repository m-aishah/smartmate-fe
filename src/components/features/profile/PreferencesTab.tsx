
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationSettings } from "./NotificationSettings";
import { useToast } from "@/components/ui/use-toast";

export function PreferencesTab() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your profile settings have been updated successfully.",
      });
      
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 mt-4 relative z-50">
      <Card className="glass-card border-smartmate-teal/20 relative z-50">
        <CardHeader>
          <CardTitle className="smartmate-text-gradient">Appearance</CardTitle>
          <CardDescription>
            Customize how SmartMate looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="theme">Theme</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>
            <div className="relative z-50">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="language">Language</Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred language.
              </p>
            </div>
            <div className="relative z-50">
              <LanguageToggle />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <NotificationSettings onSave={handleSaveSettings} isSaving={isSaving} />
    </div>
  );
}
