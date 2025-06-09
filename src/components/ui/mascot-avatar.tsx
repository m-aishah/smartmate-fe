
import { cn } from "@/lib/utils";

interface MascotAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

export function MascotAvatar({ size = "md", className, animate = false }: MascotAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16",
    xl: "h-28 w-28"
  };

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-blue/20 flex items-center justify-center overflow-hidden border-2 border-smartmate-teal/50",
      sizeClasses[size],
      animate && "animate-pulse-slow",
      className
    )}>
      <img 
        src="/smartmate-mascot.png" 
        alt="SmartMate AI Assistant" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
