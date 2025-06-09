
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  variant?: "network" | "not-found" | "server" | "generic";
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  showIcon?: boolean;
}

export function ErrorState({
  variant = "generic",
  title,
  description,
  onRetry,
  retryLabel = "Try Again",
  className,
  showIcon = true,
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (variant) {
      case "network":
        return {
          icon: WifiOff,
          defaultTitle: "Connection Error",
          defaultDescription: "Unable to connect to the server. Please check your internet connection.",
        };
      case "not-found":
        return {
          icon: AlertTriangle,
          defaultTitle: "Not Found",
          defaultDescription: "The requested resource could not be found.",
        };
      case "server":
        return {
          icon: AlertTriangle,
          defaultTitle: "Server Error",
          defaultDescription: "Something went wrong on our end. Please try again later.",
        };
      default:
        return {
          icon: AlertTriangle,
          defaultTitle: "Something went wrong",
          defaultDescription: "An unexpected error occurred. Please try again.",
        };
    }
  };

  const config = getErrorConfig();
  const IconComponent = config.icon;

  return (
    <Card className={cn("mx-auto max-w-md", className)}>
      <CardContent className="pt-6 text-center">
        {showIcon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <IconComponent className="h-6 w-6 text-destructive" />
          </div>
        )}
        <h3 className="mb-2 font-semibold">
          {title || config.defaultTitle}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {description || config.defaultDescription}
        </p>
        {onRetry && (
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            {retryLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
