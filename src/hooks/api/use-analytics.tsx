import { useQuery } from "@tanstack/react-query";
// using mock data for analytics while backend is unavailable
// import { analyticsService } from '@/services/api/analytics.service';
import {
  mockOverview,
  mockWeeklyEngagement,
  mockTimeSpent,
  mockLectureBreakdown,
  mockPerformance,
  mockAsync,
} from "@/mocks/analytics";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    // original API call commented out for now:
    // queryFn: () => analyticsService.getOverview(),
    queryFn: () => mockAsync(mockOverview),
  });
}

export function useWeeklyEngagement() {
  return useQuery({
    queryKey: ["analytics", "engagement"],
    // queryFn: () => analyticsService.getWeeklyEngagement(),
    queryFn: () => mockAsync(mockWeeklyEngagement),
  });
}

export function useTimeSpent() {
  return useQuery({
    queryKey: ["analytics", "timeSpent"],
    // queryFn: () => analyticsService.getTimeSpent(),
    queryFn: () => mockAsync(mockTimeSpent),
  });
}

export function useLectureBreakdown() {
  return useQuery({
    queryKey: ["analytics", "lectureBreakdown"],
    // queryFn: () => analyticsService.getLectureBreakdown(),
    queryFn: () => mockAsync(mockLectureBreakdown),
  });
}

export function useSubjectPerformance() {
  return useQuery({
    queryKey: ["analytics", "performance"],
    // queryFn: () => analyticsService.getSubjectPerformance(),
    queryFn: () => mockAsync(mockPerformance),
  });
}
