
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MoodleConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MoodleConnectModal({ open, onOpenChange }: MoodleConnectModalProps) {
  const { toast } = useToast();
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!studentNumber || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both student number and password.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Successfully Connected!",
        description: "Your Moodle account has been linked to SmartMate.",
      });
      setIsConnecting(false);
      onOpenChange(false);
      setStudentNumber("");
      setPassword("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="smartmate-text-gradient glow-effect text-center">
            Connect to Moodle
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Link your Moodle account to sync course materials and deadlines with SmartMate.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="border-smartmate-teal/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4 text-smartmate-teal" />
                Secure Connection
              </CardTitle>
              <CardDescription className="text-xs">
                Your credentials are encrypted and stored securely
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-number">Student Number</Label>
              <Input
                id="student-number"
                placeholder="Enter your student number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moodle-password">Moodle Password</Label>
              <Input
                id="moodle-password"
                type="password"
                placeholder="Enter your Moodle password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="bg-smartmate-teal/10 rounded-lg p-3 border border-smartmate-teal/20">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-smartmate-teal mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">What happens next:</p>
                  <ul className="space-y-1">
                    <li>• Sync your course materials automatically</li>
                    <li>• Import lecture notes and assignments</li>
                    <li>• Get deadline reminders</li>
                    <li>• Generate study materials from course content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConnect}
              disabled={isConnecting || !studentNumber || !password}
              className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white"
            >
              {isConnecting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect Account
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
