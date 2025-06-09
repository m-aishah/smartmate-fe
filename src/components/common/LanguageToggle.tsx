
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/store/use-language";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-accent/10 group">
          <Globe className="h-5 w-5 group-hover:text-accent transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-lg border-smartmate-teal/20">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")} 
          className={language === "en" ? "bg-accent/10 text-accent" : ""}
        >
          <span className="w-5 mr-2 inline-block">🇺🇸</span> {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("tr")}
          className={language === "tr" ? "bg-accent/10 text-accent" : ""}
        >
          <span className="w-5 mr-2 inline-block">🇹🇷</span> {t("turkish")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")}
          className={language === "ar" ? "bg-accent/10 text-accent" : ""}
        >
          <span className="w-5 mr-2 inline-block">🇸🇦</span> {t("arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
