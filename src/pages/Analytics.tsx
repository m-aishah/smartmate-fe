
import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  LineChart,
  PieChart, 
  Activity,
  Users,
  Clock,
  BookOpen
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { StatCard } from "@/components/analytics/StatCard";
import { EngagementChart } from "@/components/analytics/EngagementChart";
import { TimeSpentChart } from "@/components/analytics/TimeSpentChart";
import { LectureBreakdownChart } from "@/components/analytics/LectureBreakdownChart";
import { PerformanceTable } from "@/components/analytics/PerformanceTable";
import { useScrollAnimation } from "@/hooks/ui/use-scroll-animation";
import { TechCard } from "@/components/ui/tech-card";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import PageHeader from "@/components/layout/PageHeader";
import { 
  useAnalyticsOverview, 
  useWeeklyEngagement, 
  useTimeSpent, 
  useLectureBreakdown, 
  useSubjectPerformance 
} from "@/hooks/api/use-analytics";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Analytics() {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>();
  const isMobile = useIsMobile();

  // API data hooks
  const { data: overview, isLoading: overviewLoading, error: overviewError } = useAnalyticsOverview();
  const { data: engagement, isLoading: engagementLoading, error: engagementError } = useWeeklyEngagement();
  const { data: timeSpent, isLoading: timeSpentLoading, error: timeSpentError } = useTimeSpent();
  const { data: lectureBreakdown, isLoading: lectureBreakdownLoading, error: lectureBreakdownError } = useLectureBreakdown();
  const { data: performance, isLoading: performanceLoading, error: performanceError } = useSubjectPerformance();

  useEffect(() => {
    document.title = "Analytics | SmartMate";
  }, []);

  const ErrorMessage = ({ message = "An error occurred, try again later" }: { message?: string }) => (
    <div className="flex items-center justify-center h-full min-h-[200px] text-center">
      <div className="space-y-2">
        <p className="text-destructive text-sm font-medium">{message}</p>
        <p className="text-muted-foreground text-xs">Please refresh the page or try again later</p>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-4 md:space-y-6 pb-4 md:pb-8">
      {/* Page Header */}
      <PageHeader title={t("analytics")} subtitle={t("analyticsDescription")} />
      
      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {overviewLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : overviewError ? (
          <div className="col-span-full">
            <Card className="p-4">
              <ErrorMessage message="Failed to load overview data" />
            </Card>
          </div>
        ) : (
          <>
            <StatCard 
              title={t("totalLectures")}
              value={overview?.totalLectures.toString() || "0"}
              change={overview?.weeklyGrowth.lectures || "+0"}
              trend="up"
              icon={BookOpen}
              color="teal"
              delay={0.1}
            />
            <StatCard 
              title={t("avgScore")}
              value={`${overview?.avgScore || 0}%`}
              change={overview?.weeklyGrowth.score || "+0%"}
              trend="up"
              icon={Activity}
              color="blue"
              delay={0.2}
            />
            <StatCard 
              title={t("totalTime")}
              value={`${overview?.totalTimeHours || 0}h`}
              change={overview?.weeklyGrowth.time || "+0h"}
              trend="up"
              icon={Clock}
              color="cyan"
              delay={0.3}
            />
            <StatCard 
              title={t("activeDays")}
              value={`${overview?.activeDays || 0}/30`}
              change={overview?.weeklyGrowth.days || "+0"}
              trend="up"
              icon={Users}
              color="purple" 
              delay={0.4}
            />
          </>
        )}
      </motion.div>
      
      {/* Engagement Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TechCard variant="gradient" className="relative glass-card">
          <CardHeader className="pb-3 md:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg font-orbitron smartmate-text-gradient">
                {t("weeklyEngagement")}
              </CardTitle>
              <LineChart className="h-4 w-4 md:h-5 md:w-5 text-smartmate-teal" />
            </div>
          </CardHeader>
          <CardContent className="pb-3 md:pb-4">
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              {t("weeklyEngagementDescription")}
            </p>
            <div className="h-[200px] md:h-[300px]">
              {engagementLoading ? (
                <LoadingSkeleton className="h-full w-full" />
              ) : engagementError ? (
                <ErrorMessage />
              ) : (
                <EngagementChart data={engagement} />
              )}
            </div>
          </CardContent>
          {!engagementError && (
            <CardFooter className="pt-2">
              <p className="text-xs md:text-sm text-smartmate-teal">
                <span className="font-medium">+12%</span> {t("fromLastWeek")}
              </p>
            </CardFooter>
          )}
        </TechCard>
      </motion.div>
      
      {/* Row with 2 charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Time Spent Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <TechCard variant="circuit" className="h-full glass-card">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base md:text-lg font-orbitron smartmate-text-gradient">
                  {t("timeSpent")}
                </CardTitle>
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-smartmate-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                {t("timeSpentDescription")}
              </p>
              <div className="h-[180px] md:h-[240px]">
                {timeSpentLoading ? (
                  <LoadingSkeleton className="h-full w-full" />
                ) : timeSpentError ? (
                  <ErrorMessage />
                ) : (
                  <TimeSpentChart data={timeSpent} />
                )}
              </div>
            </CardContent>
          </TechCard>
        </motion.div>
        
        {/* Lecture Type Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TechCard variant="glow" className="h-full glass-card">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base md:text-lg font-orbitron smartmate-text-gradient">
                  {t("lectureBreakdown")}
                </CardTitle>
                <PieChart className="h-4 w-4 md:h-5 md:w-5 text-smartmate-cyan" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                {t("lectureBreakdownDescription")}
              </p>
              <div className="flex justify-center items-center h-[180px] md:h-[240px]">
                {lectureBreakdownLoading ? (
                  <LoadingSkeleton className="h-full w-full" />
                ) : lectureBreakdownError ? (
                  <ErrorMessage />
                ) : (
                  <LectureBreakdownChart data={lectureBreakdown} />
                )}
              </div>
            </CardContent>
          </TechCard>
        </motion.div>
      </div>
      
      {/* Performance Table */}
      <div 
        ref={elementRef}
        className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <TechCard variant="default" className="relative overflow-hidden glass-card">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg font-orbitron smartmate-text-gradient">
              {t("performanceBySubject")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 md:px-6">
            <div className="overflow-x-auto -mx-1 md:mx-0">
              {performanceLoading ? (
                <LoadingSkeleton className="h-64 w-full" />
              ) : performanceError ? (
                <ErrorMessage />
              ) : (
                <PerformanceTable data={performance} />
              )}
            </div>
          </CardContent>
        </TechCard>
      </div>
    </div>
  );
}
