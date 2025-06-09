
import { apiClient } from '@/lib/api-client';
import { analytics } from '@/constants/endpoints';

export interface AnalyticsOverview {
  totalLectures: number;
  avgScore: number;
  totalTimeHours: number;
  activeDays: number;
  weeklyGrowth: {
    lectures: string;
    score: string;
    time: string;
    days: string;
  };
}

export interface WeeklyEngagement {
  day: string;
  study: number;
  quiz: number;
  lecture: number;
}

export interface TimeSpentData {
  subject: string;
  hours: number;
}

export interface LectureBreakdown {
  name: string;
  value: number;
}

export interface SubjectPerformance {
  subject: string;
  score: number;
  status: "excellent" | "good" | "average" | "needs-improvement";
  trend: "up" | "down" | "stable";
  lectures: number;
  quizzes: number;
}

export interface AnalyticsOverviewResponse {
  data: AnalyticsOverview;
}

export interface WeeklyEngagementResponse {
  data: WeeklyEngagement[];
}

export interface TimeSpentResponse {
  data: TimeSpentData[];
}

export interface LectureBreakdownResponse {
  data: LectureBreakdown[];
}

export interface PerformanceResponse {
  data: SubjectPerformance[];
}

class AnalyticsService {
  async getOverview(): Promise<AnalyticsOverview> {
    const response = await apiClient.get<AnalyticsOverviewResponse>(analytics.overview());
    return response.data.data;
  }

  async getWeeklyEngagement(): Promise<WeeklyEngagement[]> {
    const response = await apiClient.get<WeeklyEngagementResponse>(analytics.engagement());
    return response.data.data;
  }

  async getTimeSpent(): Promise<TimeSpentData[]> {
    const response = await apiClient.get<TimeSpentResponse>(analytics.timeSpent());
    return response.data.data;
  }

  async getLectureBreakdown(): Promise<LectureBreakdown[]> {
    const response = await apiClient.get<LectureBreakdownResponse>(analytics.performance());
    return response.data.data;
  }

  async getSubjectPerformance(): Promise<SubjectPerformance[]> {
    const response = await apiClient.get<PerformanceResponse>(analytics.performance());
    return response.data.data;
  }
}

export const analyticsService = new AnalyticsService();
