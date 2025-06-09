import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileAudio, Mic, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/store/use-language";

interface UploadLectureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadLectureModal({
  open,
  onOpenChange,
}: UploadLectureModalProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleOptionSelect = (option: "upload" | "record" | "teams") => {
    onOpenChange(false);
    navigate(`/app/lectures/new/${option}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {t("addLecture")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-start gap-4 h-16 px-4 bg-secondary/20 backdrop-blur-sm border border-border/30 hover:bg-secondary/40"
            onClick={() => handleOptionSelect("upload")}
          >
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <FileAudio className="h-5 w-5 text-accent" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{t("uploadAudio")}</span>
              <span className="text-xs text-muted-foreground">
                {t("uploadAudioDescription")}
              </span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start gap-4 h-16 px-4 bg-secondary/20 backdrop-blur-sm border border-border/30 hover:bg-secondary/40"
            onClick={() => handleOptionSelect("record")}
          >
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Mic className="h-5 w-5 text-accent" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{t("recordLecture")}</span>
              <span className="text-xs text-muted-foreground">
                {t("recordLectureDescription")}
              </span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start gap-4 h-16 px-4 bg-secondary/20 backdrop-blur-sm border border-border/30 hover:bg-secondary/40"
            onClick={() => handleOptionSelect("teams")}
          >
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-accent" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{t("connectTeams")}</span>
              <span className="text-xs text-muted-foreground">
                {t("connectTeamsDescription")}
              </span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
