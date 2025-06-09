
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  subject?: string;
  isError?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onRetry?: (messageId: string) => void;
}

export function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await onRetry(message.id);
    } finally {
      setIsRetrying(false);
    }
  };

  const isAssistant = message.sender === "assistant";
  const showRetryButton = message.isError && isAssistant && onRetry;

  return (
    <div className={cn(
      "flex w-full",
      isAssistant ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 relative group",
        isAssistant 
          ? "bg-muted text-foreground" 
          : "bg-primary text-primary-foreground",
        message.isError && "border-destructive border"
      )}>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        
        {showRetryButton && (
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetry}
              disabled={isRetrying}
              className="h-7 px-2 text-xs bg-background hover:bg-accent text-foreground border-border"
            >
              <RotateCcw className={cn(
                "h-3 w-3 mr-1", 
                isRetrying && "animate-spin"
              )} />
              Retry
            </Button>
          </div>
        )}
        
        <div className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
