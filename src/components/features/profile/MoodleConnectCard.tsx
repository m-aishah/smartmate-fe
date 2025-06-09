
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { MoodleConnectModal } from "./MoodleConnectModal";

export function MoodleConnectCard() {
  const [moodleModalOpen, setMoodleModalOpen] = useState(false);

  return (
    <>
      <Card className="glass-card border-smartmate-blue/20 relative z-50">
        <CardHeader>
          <CardTitle className="smartmate-text-gradient">Moodle Integration</CardTitle>
          <CardDescription>
            Connect your Moodle account to sync course materials and deadlines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-smartmate-teal/10 rounded-lg p-4 border border-smartmate-teal/20">
            <div className="text-sm text-muted-foreground mb-3">
              <p className="font-medium text-foreground mb-2">Benefits of connecting Moodle:</p>
              <ul className="space-y-1 text-xs">
                <li>• Automatic sync of course materials</li>
                <li>• Import lecture notes and assignments</li>
                <li>• Get deadline notifications</li>
                <li>• Generate study materials from course content</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-50">
          <Button 
            onClick={() => setMoodleModalOpen(true)}
            className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white relative z-50"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect Moodle Account
          </Button>
        </CardFooter>
      </Card>

      <MoodleConnectModal
        open={moodleModalOpen}
        onOpenChange={setMoodleModalOpen}
      />
    </>
  );
}
