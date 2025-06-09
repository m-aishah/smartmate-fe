
import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { MobileNav } from "./navigation/MobileNav";
import { useLayoutStore } from "@/hooks/store/use-layout-store";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { useAuth } from "@/hooks/api/use-auth";
import { cn } from "@/lib/utils";
import { CircleDot } from "lucide-react";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useLayoutStore();
  const isMobile = useIsMobile();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Check if current route is a chat page
  const isChatPage = location.pathname.startsWith('/app/chats/');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile, setSidebarOpen]);

  // Show loading or redirect while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-smartmate-teal"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden circuit-bg">
      {/* Background elements for visual appeal */}
      <div className="absolute inset-0 opacity-30 md:opacity-50 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-smartmate-teal/20 blur-[100px]"></div>
        <div className="absolute top-[60%] left-[5%] w-[30%] h-[40%] rounded-full bg-smartmate-blue/20 blur-[100px]"></div>
        <div className="absolute top-[20%] left-[20%] w-[20%] h-[30%] rounded-full bg-smartmate-cyan/20 blur-[100px]"></div>
      </div>
      
      {/* Circuit decorations - hidden on mobile for cleaner look */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-[10%] flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-teal/70"></div>
            <div className="h-px w-20 bg-smartmate-teal/30"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-teal/70"></div>
            <div className="h-px w-40 bg-smartmate-teal/30"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-teal/70"></div>
          </div>
          
          <div className="absolute top-40 right-[15%] flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-blue/70"></div>
            <div className="h-px w-32 bg-smartmate-blue/30"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-blue/70"></div>
          </div>
          
          <div className="absolute bottom-20 left-[20%] flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-cyan/70"></div>
            <div className="h-px w-24 bg-smartmate-cyan/30"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-cyan/70"></div>
            <div className="h-px w-16 bg-smartmate-cyan/30"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-smartmate-cyan/70"></div>
          </div>
          
          {/* Digital artifacts */}
          <div className="absolute top-1/4 right-[5%] animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
            <CircleDot className="h-4 w-4 text-smartmate-teal/50" />
          </div>
          
          <div className="absolute bottom-1/4 right-[25%] animate-pulse-slow" style={{ animationDelay: '1.2s' }}>
            <CircleDot className="h-3 w-3 text-smartmate-blue/50" />
          </div>
          
          <div className="absolute top-2/3 left-[15%] animate-pulse-slow" style={{ animationDelay: '0.8s' }}>
            <CircleDot className="h-5 w-5 text-smartmate-cyan/50" />
          </div>
        </div>
      )}
      
      {!isMobile && <AppSidebar />}
      
      <div className="flex-1 flex flex-col w-full">
        <TopBar />
        <main className={cn(
          "flex-1 overflow-x-hidden transition-all duration-300 relative z-10",
          isChatPage 
            ? isMobile 
              ? "p-0 pb-20" // No padding for chat on mobile, just bottom space for nav
              : "p-2 pb-6" // Minimal padding for chat on desktop
            : "p-3 sm:p-4 md:p-6", // Normal padding for other pages
          isMobile ? "pb-20" : "pb-6", // Extra bottom padding for mobile nav
          !isMobile && sidebarOpen ? "md:ml-64" : !isMobile ? "md:ml-16" : ""
        )}>
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Overlay for closing sidebar on mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-15"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
