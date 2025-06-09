
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { FileAudio, Upload, Brain, CheckCircle2, FileText } from "lucide-react";

interface UploadProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  progress: number;
  status: "uploading" | "processing" | "completed";
  message?: string;
  lectureType?: "audio" | "text";
}

export function UploadProgressModal({ 
  open, 
  onOpenChange, 
  fileName, 
  progress, 
  status,
  message,
  lectureType = "audio"
}: UploadProgressModalProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "uploading":
        return {
          icon: Upload,
          title: `Uploading ${lectureType === "audio" ? "Audio" : "Text"} Lecture`,
          color: "text-smartmate-blue",
          bgColor: "bg-smartmate-blue/10",
          borderColor: "border-smartmate-blue/30"
        };
      case "processing":
        return {
          icon: Brain,
          title: "Processing with AI",
          color: "text-smartmate-teal",
          bgColor: "bg-smartmate-teal/10", 
          borderColor: "border-smartmate-teal/30"
        };
      case "completed":
        return {
          icon: CheckCircle2,
          title: "Upload Complete",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const FileIcon = lectureType === "audio" ? FileAudio : FileText;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Processing Lecture</DialogTitle>
          <DialogDescription className="text-center">
            Please wait while we process your {lectureType} content
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <motion.div
              className={`p-4 rounded-full ${config.bgColor} ${config.borderColor} border-2`}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: status === "processing" ? [0, 360] : 0
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              <Icon className={`h-8 w-8 ${config.color}`} />
            </motion.div>
          </div>

          {/* File Info */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium truncate max-w-xs">
                {fileName || `${lectureType} content`}
              </span>
            </div>
            <h3 className="font-semibold">{config.title}</h3>
            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3">
              <motion.div
                className="h-full bg-gradient-to-r from-smartmate-teal to-smartmate-blue rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </Progress>
          </div>

          {/* Processing Steps */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <motion.div
                className={`w-2 h-2 rounded-full ${status === "uploading" ? "bg-smartmate-blue" : "bg-green-500"}`}
                animate={{ scale: status === "uploading" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: status === "uploading" ? Infinity : 0 }}
              />
              <span className={status === "uploading" ? "text-smartmate-blue font-medium" : "text-green-500"}>
                Upload {lectureType} content
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  status === "processing" ? "bg-smartmate-teal" : 
                  status === "completed" ? "bg-green-500" : "bg-muted"
                }`}
                animate={{ scale: status === "processing" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: status === "processing" ? Infinity : 0 }}
              />
              <span className={
                status === "processing" ? "text-smartmate-teal font-medium" : 
                status === "completed" ? "text-green-500" : "text-muted-foreground"
              }>
                {lectureType === "audio" ? "Transcribe and analyze" : "Analyze text content"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <motion.div
                className={`w-2 h-2 rounded-full ${status === "completed" ? "bg-green-500" : "bg-muted"}`}
                animate={{ scale: status === "completed" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: status === "completed" ? Infinity : 0 }}
              />
              <span className={status === "completed" ? "text-green-500 font-medium" : "text-muted-foreground"}>
                Generate summary & key points
              </span>
            </div>
          </div>

          {/* Sparkle Animation */}
          {status === "processing" && (
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-smartmate-teal rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${10 + (i % 2) * 20}px`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
