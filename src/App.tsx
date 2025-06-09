import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/hooks/store/use-language";
import { AuthProvider } from "@/hooks/api/use-auth";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

// Layout
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Lectures from "./pages/Lectures";
import Chats from "./pages/Chats";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NewChat from "./pages/NewChat";
import UploadLecture from "./pages/UploadLecture";
import RecordLecture from "./pages/RecordLecture";
import ConnectTeamsLecture from "./pages/ConnectTeamsLecture";
import Analytics from "./pages/Analytics";
import ChatDetail from "./pages/ChatDetail";
import Quizzes from "./pages/Quizzes";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: STALE_TIME,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Landing Page */}
                  <Route path="/" element={<Index />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Main App Routes */}
                  <Route path="/app" element={<AppLayout />}>
                    <Route
                      index
                      element={<Navigate replace to="/app/dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="lectures" element={<Lectures />} />
                    <Route
                      path="lectures/new/upload"
                      element={<UploadLecture />}
                    />
                    <Route
                      path="lectures/new/record"
                      element={<RecordLecture />}
                    />
                    <Route
                      path="lectures/new/teams"
                      element={<ConnectTeamsLecture />}
                    />
                    <Route path="quizzes" element={<Quizzes />} />
                    <Route path="chats" element={<Chats />} />
                    <Route path="chats/new" element={<NewChat />} />
                    <Route path="chats/:chatId" element={<ChatDetail />} />
                    <Route path="help" element={<Help />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="analytics" element={<Analytics />} />
                  </Route>

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </HelmetProvider>
);

export default App;
