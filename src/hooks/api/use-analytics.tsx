
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/api/analytics.service';

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: () => analyticsService.getOverview(),
  });
}

export function useWeeklyEngagement() {
  return useQuery({
    queryKey: ['analytics', 'engagement'],
    queryFn: () => analyticsService.getWeeklyEngagement(),
  });
}

export function useTimeSpent() {
  return useQuery({
    queryKey: ['analytics', 'timeSpent'],
    queryFn: () => analyticsService.getTimeSpent(),
  });
}

export function useLectureBreakdown() {
  return useQuery({
    queryKey: ['analytics', 'lectureBreakdown'],
    queryFn: () => analyticsService.getLectureBreakdown(),
  });
}

export function useSubjectPerformance() {
  return useQuery({
    queryKey: ['analytics', 'performance'],
    queryFn: () => analyticsService.getSubjectPerformance(),
  });
}
