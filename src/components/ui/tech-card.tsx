
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechCardProps {
  className?: string;
  children: ReactNode;
  variant?: "default" | "gradient" | "glow" | "circuit";
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export function TechCard({
  className,
  children,
  variant = "default",
  onClick,
  animate = true,
  delay = 0
}: TechCardProps) {
  const variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay 
      }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl p-5 h-full",
        "border border-smartmate-teal/20",
        "transition-all duration-300",
        variant === "default" && "bg-background/50 backdrop-blur-md",
        variant === "gradient" && "bg-gradient-to-br from-background/70 to-smartmate-teal/10 backdrop-blur-md",
        variant === "glow" && "bg-background/50 backdrop-blur-md relative",
        variant === "circuit" && "bg-background/50 backdrop-blur-md circuit-pattern",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={onClick ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      variants={variants}
    >
      {variant === "glow" && (
        <div className="absolute -inset-px bg-gradient-to-tr from-smartmate-teal/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
      )}
      {children}
    </motion.div>
  );
}

export function TechCardHeader({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function TechCardTitle({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <h3 className={cn("font-orbitron text-lg font-semibold", className)}>
      {children}
    </h3>
  );
}

export function TechCardDescription({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>
      {children}
    </p>
  );
}

export function TechCardContent({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn("pt-1", className)}>
      {children}
    </div>
  );
}

export function TechCardFooter({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn("flex items-center justify-between mt-4 pt-4 border-t border-smartmate-teal/10", className)}>
      {children}
    </div>
  );
}

export function TechCardIcon({ 
  className, 
  children,
  pulse = false
}: { 
  className?: string, 
  children: ReactNode,
  pulse?: boolean
}) {
  return (
    <div className={cn(
      "h-10 w-10 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-blue/20 flex items-center justify-center",
      pulse && "animate-pulse-slow",
      className
    )}>
      {children}
    </div>
  );
}
