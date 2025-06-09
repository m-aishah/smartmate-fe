import { useQuery } from "@tanstack/react-query";
import { lectureService, userService, summaryService } from "@/services";

export function useDashboardData() {
  const userQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => userService.getProfile(),
  });

  const lecturesQuery = useQuery({
    queryKey: ["lectures"],
    queryFn: () => lectureService.getAllLectures(),
  });

  const summariesQuery = useQuery({
    queryKey: ["summaries"],
    queryFn: () => summaryService.getAllSummaries(),
  });

  // TODO: Add more dashboard-specific queries when endpoints are available:
  // - User statistics (study time, streak, etc.)
  // - Recent activity
  // - Upcoming deadlines
  // - Notifications

  return {
    user: userQuery.data,
    lectures: lecturesQuery.data,
    summaries: summariesQuery.data,
    isLoading: userQuery.isLoading || lecturesQuery.isLoading || summariesQuery.isLoading,
    error: userQuery.error || lecturesQuery.error || summariesQuery.error,
  };
}

export function useRecentLectures(limit: number = 3) {
  return useQuery({
    queryKey: ["lectures", "recent", limit],
    queryFn: async () => {
      const lectures = await lectureService.getAllLectures();
      return lectures
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    },
  });
}
