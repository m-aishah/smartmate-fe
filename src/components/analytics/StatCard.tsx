import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/ui/use-mobile";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: "teal" | "blue" | "cyan" | "purple";
  delay?: number;
}

export function StatCard({ title, value, change, trend, icon: Icon, color, delay = 0 }: StatCardProps) {
  const isMobile = useIsMobile();
  
  const getColorClasses = () => {
    switch (color) {
      case "teal":
        return "from-smartmate-teal/20 to-transparent";
      case "blue":
        return "from-smartmate-blue/20 to-transparent";
      case "cyan":
        return "from-smartmate-cyan/20 to-transparent";
      case "purple":
        return "from-accent/20 to-transparent";
      default:
        return "from-smartmate-teal/20 to-transparent";
    }
  };

  const getIconColorClass = () => {
    switch (color) {
      case "teal":
        return "text-smartmate-teal";
      case "blue":
        return "text-smartmate-blue";
      case "cyan":
        return "text-smartmate-cyan";
      case "purple":
        return "text-accent";
      default:
        return "text-smartmate-teal";
    }
  };

  const getTrendColor = () => {
    return trend === "up" ? "text-green-500" : "text-red-500";
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-xl border border-smartmate-teal/20 p-3 md:p-5",
        "bg-gradient-to-br", getColorClasses(),
        "backdrop-blur-md transition-all duration-300 hover:shadow-lg cursor-pointer"
      )}
    >
      <div className="flex items-center gap-2 md:gap-4">
        <div className={cn(
          "h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-background/70 to-background/30",
          "flex items-center justify-center shrink-0 shadow-sm"
        )}>
          <Icon className={cn("h-4 w-4 md:h-5 md:w-5", getIconColorClass())} />
        </div>
        <div>
          <p className="text-xs md:text-sm text-muted-foreground font-orbitron">{title}</p>
          <p className="text-lg md:text-2xl font-bold mt-0.5 md:mt-1 font-orbitron">{value}</p>
        </div>
      </div>
      
      <div className="flex items-center mt-2 md:mt-4 text-[10px] md:text-xs">
        <TrendIcon className={cn("h-2 w-2 md:h-3 md:w-3 mr-1", getTrendColor())} />
        <span className={cn("font-medium", getTrendColor())}>
          {change}
        </span>
        <span className="text-muted-foreground ml-1">this week</span>
      </div>
    </motion.div>
  );
}
