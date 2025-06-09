import { Bell, ChevronDown, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useLanguage } from "@/hooks/store/use-language";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MascotAvatar } from "@/components/ui/mascot-avatar";

export function TopBar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 h-16">
      <div className="h-16 px-4 flex items-center justify-between bg-background/60 backdrop-blur-xl border-b border-smartmate-teal/20">
        <Link to="/app/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-smartmate-teal via-accent to-smartmate-blue flex items-center justify-center shrink-0 shadow-md relative overflow-hidden border border-smartmate-teal/30">
            <div className="absolute inset-0 bg-gradient-to-br from-smartmate-teal/20 via-transparent to-smartmate-blue/20 animate-spin-slow"></div>
            {/* <span className="text-background font-orbitron font-bold relative z-10">SM</span> */}
            <MascotAvatar size="md" animate={true} className="relative z-10" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-orbitron smartmate-text-gradient glow-effect">
              SMARTMATE
            </span>
            <span className="text-xs text-muted-foreground -mt-1">
              {t("description")}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative group">
                <Bell className="h-5 w-5 group-hover:text-accent transition-colors" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 bg-background/80 backdrop-blur-lg border border-smartmate-teal/20"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="font-medium font-orbitron text-sm">
                  {t("upcoming")}
                </span>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  {t("upcoming")}
                </Button>
              </div>
              <div className="py-2 px-1 max-h-80 overflow-auto">
                <div className="px-2 py-3 hover:bg-accent/5 rounded-md transition-colors">
                  <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-full bg-smartmate-teal/20 flex items-center justify-center shrink-0">
                      <Cpu className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {t("uploadSuccessful")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("lectureSuccessfullySaved")}
                      </p>
                      <p className="text-xs text-accent/80 mt-1">
                        5 {t("upcoming")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-2 py-3 hover:bg-accent/5 rounded-md transition-colors">
                  <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-full bg-smartmate-blue/20 flex items-center justify-center shrink-0">
                      <Bell className="h-4 w-4 text-smartmate-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("deadlines")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("upcomingDeadlines")}
                      </p>
                      <p className="text-xs text-accent/80 mt-1">
                        25 {t("upcoming")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
