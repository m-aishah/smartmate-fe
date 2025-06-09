
import { Link, useLocation } from "react-router-dom";
import { BookOpen, MessageSquare, User, BarChart3, Zap, ChevronUp, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/store/use-language";
import { motion, AnimatePresence } from "framer-motion";
import { useLayoutStore } from "@/hooks/store/use-layout-store";

export function MobileNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const { sidebarOpen: navExpanded, toggleSidebar: toggleNav } = useLayoutStore();
  
  const routes = [
    { path: "/app/lectures", icon: BookOpen, label: t("lectures") },
    { path: "/app/quizzes", icon: Zap, label: "Quizzes" },
    { path: "/app/chats", icon: MessageSquare, label: t("chats") },
    { path: "/app/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/app/profile", icon: User, label: t("profile") },
  ];

  return (
    <>
      {/* Floating toggle button */}
      <motion.div 
        className="fixed bottom-24 right-6 z-30 md:hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleNav}
          className="h-14 w-14 rounded-full bg-background/80 backdrop-blur-xl border border-smartmate-teal/20 shadow-lg hover:bg-smartmate-teal/10 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: navExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {navExpanded ? (
              <ChevronUp className="h-6 w-6 text-smartmate-teal" />
            ) : (
              <Menu className="h-6 w-6 text-smartmate-teal" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Expanded navigation panel */}
      <AnimatePresence>
        {navExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-40 right-6 z-20 md:hidden"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-smartmate-teal/20 rounded-2xl p-3 shadow-xl">
              <div className="flex flex-col gap-2">
                {routes.map((route) => {
                  const isActive = location.pathname === route.path;
                  return (
                    <Link key={route.path} to={route.path}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={cn(
                          "flex items-center gap-3 h-12 w-full justify-start px-4 rounded-xl transition-all relative",
                          isActive 
                            ? "text-smartmate-teal bg-smartmate-teal/10" 
                            : "text-muted-foreground hover:text-smartmate-teal hover:bg-smartmate-teal/5"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/20 via-accent/10 to-smartmate-blue/20 rounded-xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <route.icon className={cn(
                          "h-5 w-5 relative z-10",
                          isActive && "text-smartmate-teal"
                        )} />
                        <span className={cn(
                          "text-sm font-medium relative z-10",
                          isActive && "text-smartmate-teal"
                        )}>
                          {route.label}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
