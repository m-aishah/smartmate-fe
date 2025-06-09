import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/store/use-language";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { DeadlinesCard } from "@/components/dashboard/DeadlinesCard";
import { RecentLecturesCard } from "@/components/dashboard/RecentLecturesCard";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/error/ErrorState";
// TODO: Import dashboard hooks when API is connected
// import { useDashboardData } from "@/hooks/api/use-dashboard-data";

const Dashboard = () => {
  const { t } = useLanguage();

  // TODO: Uncomment when API is ready
  // const { isLoading, error, refetch } = useDashboardData();

  // TODO: Add real error handling when API is connected
  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[400px]">
  //       <ErrorState
  //         variant="server"
  //         title="Failed to load dashboard"
  //         description="Unable to load your dashboard data. Please try again."
  //         onRetry={refetch}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6 pb-10 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-1 md:gap-2">
        <motion.h1
          className="text-2xl md:text-3xl font-orbitron smartmate-text-gradient glow-effect"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
        </motion.h1>
      </div>

      {/* TODO: Add loading skeleton when API is connected */}
      {/* {isLoading ? (
        <div className="space-y-6">
          <LoadingSkeleton variant="card" className="h-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton variant="card" count={3} />
          </div>
        </div>
      ) : ( */}
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WelcomeSection />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <QuoteCard />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <TasksCard />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <DeadlinesCard />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <RecentLecturesCard />
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Dashboard;
