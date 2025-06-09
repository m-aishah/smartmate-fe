
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationSettingsProps {
  onSave: () => void;
  isSaving: boolean;
}

export function NotificationSettings({ onSave, isSaving }: NotificationSettingsProps) {
  return (
    <Card className="glass-card border-smartmate-blue/20 relative z-50">
      <CardHeader>
        <CardTitle className="smartmate-text-gradient">Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about your lectures and deadlines.
            </p>
          </div>
          <div className="relative z-50">
            <Switch id="email-notifications" defaultChecked />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="browser-notifications">Browser Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Show browser notifications for important updates.
            </p>
          </div>
          <div className="relative z-50">
            <Switch id="browser-notifications" defaultChecked />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing-emails">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive promotional emails and updates about new features.
            </p>
          </div>
          <div className="relative z-50">
            <Switch id="marketing-emails" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-50">
        <Button onClick={onSave} disabled={isSaving} className="relative z-50">
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
  );
}
