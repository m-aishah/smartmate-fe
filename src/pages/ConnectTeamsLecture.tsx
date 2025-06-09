import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkIcon, X, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/store/use-language";
import { useToast } from "@/hooks/ui/use-toast";

const ConnectTeamsLecture = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!meetingLink.trim() || !title.trim()) {
      toast({
        variant: "destructive",
        title: t("missingInformation"),
        description: t("pleaseProvideUrlAndTitle"),
      });
      return;
    }

    // Basic validation for Teams URL
    if (!meetingLink.includes("teams.microsoft.com")) {
      toast({
        variant: "destructive",
        title: t("invalidTeamsLink"),
        description: t("pleaseEnterValidTeamsLink"),
      });
      return;
    }

    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      toast({
        title: t("connectionSuccessful"),
        description: t("teamsLectureConnected"),
      });
      setIsConnecting(false);
      navigate("/app/lectures");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/app/lectures");
  };

  return (
    <div className="max-w-2xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("connectTeamsLecture")}</h1>
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-8 border border-border/50 rounded-lg bg-secondary/10 backdrop-blur-sm flex flex-col items-center justify-center">
          <Video className="h-16 w-16 text-accent/50 mb-4" />
          <p className="text-lg font-medium mb-2">{t("connectTeamsMeeting")}</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
            {t("teamsLinkDescription")}
          </p>

          <div className="w-full max-w-md">
            <Label htmlFor="teams-link" className="mb-2 block">
              {t("microsoftTeamsLink")}
            </Label>
            <div className="flex gap-2">
              <Input
                id="teams-link"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://teams.microsoft.com/l/meetup-join/..."
                className="bg-secondary/20 flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">{t("lectureTitle")}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("enterLectureTitle")}
              className="bg-secondary/20"
            />
          </div>

          <div>
            <Label htmlFor="description">{t("lectureDescription")}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("enterLectureDescription")}
              className="bg-secondary/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isConnecting || !meetingLink.trim() || !title.trim()}
          >
            {isConnecting ? t("connecting") : t("connect")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConnectTeamsLecture;
