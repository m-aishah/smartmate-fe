import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/store/use-language";
import { useLayoutStore } from "@/hooks/store/use-layout-store";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Calendar, Home, HelpCircle, Brain, Plus, User } from "lucide-react";

interface RouteItem {
  icon: LucideIcon;
  labelKey: string;
  href: string;
}

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const coreMenuItems: RouteItem[] = [
    { icon: Home, labelKey: "dashboard", href: "/app/dashboard" },
    { icon: BookOpen, labelKey: "lectures", href: "/app/lectures" },
    { icon: MessageSquare, labelKey: "chats", href: "/app/chats" },
    { icon: Brain, labelKey: "quizzes", href: "/app/quizzes" },
  ];

  const systemMenuItems: RouteItem[] = [
    { icon: BarChart3, labelKey: "analytics", href: "/app/analytics" },
    { icon: HelpCircle, labelKey: "help", href: "/app/help" },
  ];

  const profileMenuItems: RouteItem[] = [
    { icon: User, labelKey: "profile", href: "/app/profile" },
  ];

  if (isMobile) {
    return null; // Mobile navigation is handled by BottomNav
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background/70 backdrop-blur-xl border-r border-smartmate-teal/20 z-40 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-background/80 border border-smartmate-teal/30 shadow-md flex items-center justify-center hover:bg-smartmate-teal/10"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </Button>

      {/* Circuit line decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={cn(
            "absolute top-12 left-0 h-px bg-gradient-to-r from-transparent via-smartmate-teal/30 to-transparent w-full"
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-24 left-0 h-px bg-gradient-to-r from-transparent via-smartmate-blue/30 to-transparent w-full"
          )}
        ></div>
      </div>

      <TooltipProvider delayDuration={0}>
        <nav
          className={cn(
            "flex flex-col pt-12 pb-6 px-3 h-full",
            sidebarOpen && "items-start"
          )}
        >
          {/* Core Functions Section */}
          <div
            className={cn(
              "w-full space-y-2 mb-6",
              !sidebarOpen && "flex flex-col items-center"
            )}
          >
            {sidebarOpen && (
              <div className="px-4 mb-4">
                <span className="text-xs font-orbitron text-smartmate-teal uppercase tracking-wider">
                  {t("coreFunctions")}
                </span>
              </div>
            )}

            {coreMenuItems.map((item) => (
              <NavItem
                key={item.href}
                route={item}
                active={location.pathname === item.href}
                sidebarOpen={sidebarOpen}
                setHoveredItem={setHoveredItem}
                hoveredItem={hoveredItem}
                t={t}
              />
            ))}
          </div>

          {/* System Section */}
          <div
            className={cn(
              "w-full space-y-2 mb-6",
              !sidebarOpen && "flex flex-col items-center"
            )}
          >
            {sidebarOpen && (
              <div className="px-4 mb-4">
                <span className="text-xs font-orbitron text-smartmate-blue uppercase tracking-wider">
                  {t("system")}
                </span>
              </div>
            )}

            {systemMenuItems.map((item) => (
              <NavItem
                key={item.href}
                route={item}
                active={location.pathname === item.href}
                sidebarOpen={sidebarOpen}
                setHoveredItem={setHoveredItem}
                hoveredItem={hoveredItem}
                t={t}
              />
            ))}
          </div>

          {/* Spacer to push profile to bottom */}
          <div className="flex-1" />

          {/* Profile Section at Bottom */}
          <div
            className={cn(
              "w-full space-y-2",
              !sidebarOpen && "flex flex-col items-center"
            )}
          >
            {sidebarOpen && (
              <div className="px-4 mb-4">
                <span className="text-xs font-orbitron text-smartmate-lavender uppercase tracking-wider">
                  {t("profile")}
                </span>
              </div>
            )}

            {profileMenuItems.map((item) => (
              <NavItem
                key={item.href}
                route={item}
                active={location.pathname === item.href}
                sidebarOpen={sidebarOpen}
                setHoveredItem={setHoveredItem}
                hoveredItem={hoveredItem}
                t={t}
              />
            ))}
          </div>
        </nav>
      </TooltipProvider>
    </aside>
  );
}

interface NavItemProps {
  route: RouteItem;
  active: boolean;
  sidebarOpen: boolean;
  hoveredItem: string | null;
  setHoveredItem: (path: string | null) => void;
  t: (key: string) => string;
}

function NavItem({
  route,
  active,
  sidebarOpen,
  hoveredItem,
  setHoveredItem,
  t,
}: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={route.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
            active
              ? "bg-smartmate-teal/10 text-smartmate-teal"
              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
            !sidebarOpen && "justify-center",
            // Remove hover effects when collapsed
            !sidebarOpen && "hover:bg-transparent"
          )}
          onMouseEnter={() => sidebarOpen && setHoveredItem(route.href)}
          onMouseLeave={() => sidebarOpen && setHoveredItem(null)}
        >
          <div
            className={cn(
              "relative h-8 w-8 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-teal/5 flex items-center justify-center",
              (active || (hoveredItem === route.href && sidebarOpen)) &&
                "from-smartmate-teal/30 to-smartmate-teal/10"
            )}
          >
            <route.icon
              size={16}
              className={cn(
                "transition-colors duration-300",
                active || (hoveredItem === route.href && sidebarOpen)
                  ? "text-smartmate-teal"
                  : "text-muted-foreground"
              )}
            />
          </div>

          {sidebarOpen && (
            <span className="text-sm font-medium">{t(route.labelKey)}</span>
          )}

          {active && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-smartmate-teal"></div>
          )}
        </Link>
      </TooltipTrigger>
      {!sidebarOpen && (
        <TooltipContent
          side="right"
          className="bg-background/80 backdrop-blur-lg border-smartmate-teal/30"
        >
          {t(route.labelKey)}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export default AppSidebar;
