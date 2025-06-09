
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MoodleConnectCard } from "./MoodleConnectCard";

export function AccountTab() {
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
          <CardTitle className="smartmate-text-gradient">Account Information</CardTitle>
          <CardDescription>
            Update your account details and personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Alex Johnson" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="alex@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" defaultValue="State University" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" defaultValue="Computer Science" />
          </div>
        </CardContent>
        <CardFooter className="relative z-50">
          <Button onClick={handleSaveSettings} disabled={isSaving} className="relative z-50">
            {isSaving ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <MoodleConnectCard />
    </div>
  );
}
