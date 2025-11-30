// Mock analytics data for local development and testing

import type {
  AnalyticsOverview,
  WeeklyEngagement,
  TimeSpentData,
  LectureBreakdown,
  SubjectPerformance,
} from "@/services/api/analytics.service";

export const mockOverview: AnalyticsOverview = {
  totalLectures: 42,
  avgScore: 78,
  totalTimeHours: 134,
  activeDays: 18,
  weeklyGrowth: {
    lectures: "+3",
    score: "+1%",
    time: "+6h",
    days: "+2",
  },
};

export const mockWeeklyEngagement: WeeklyEngagement[] = [
  { day: "Mon", study: 30, quiz: 10, lecture: 20 },
  { day: "Tue", study: 25, quiz: 15, lecture: 18 },
  { day: "Wed", study: 40, quiz: 8, lecture: 22 },
  { day: "Thu", study: 35, quiz: 12, lecture: 20 },
  { day: "Fri", study: 20, quiz: 5, lecture: 10 },
  { day: "Sat", study: 10, quiz: 2, lecture: 5 },
  { day: "Sun", study: 5, quiz: 0, lecture: 2 },
];

export const mockTimeSpent: TimeSpentData[] = [
  { subject: "Math", hours: 40 },
  { subject: "Physics", hours: 30 },
  { subject: "Chemistry", hours: 20 },
  { subject: "History", hours: 10 },
  { subject: "Language", hours: 34 },
];

export const mockLectureBreakdown: LectureBreakdown[] = [
  { name: "Recorded", value: 24 },
  { name: "Live", value: 12 },
  { name: "Imported", value: 6 },
];

export const mockPerformance: SubjectPerformance[] = [
  {
    subject: "Math",
    score: 85,
    status: "excellent",
    trend: "up",
    lectures: 12,
    quizzes: 6,
  },
  {
    subject: "Physics",
    score: 76,
    status: "good",
    trend: "stable",
    lectures: 10,
    quizzes: 4,
  },
  {
    subject: "Chemistry",
    score: 68,
    status: "average",
    trend: "down",
    lectures: 8,
    quizzes: 5,
  },
  {
    subject: "History",
    score: 72,
    status: "good",
    trend: "up",
    lectures: 6,
    quizzes: 2,
  },
];

// small helper to mimic async calls
export function mockAsync<T>(data: T, delay = 200) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(data), delay));
}

export default {
  mockOverview,
  mockWeeklyEngagement,
  mockTimeSpent,
  mockLectureBreakdown,
  mockPerformance,
  mockAsync,
};
