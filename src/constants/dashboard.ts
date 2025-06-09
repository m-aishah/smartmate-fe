
export interface Deadline {
  id: string;
  title: string;
  date: string;
  course: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

export interface Lecture {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  duration: string;
}

export interface MockUser {
  name: string;
  progress: number;
  streak: number;
  hoursStudied: number;
}

export const mockDeadlines: Deadline[] = [
  { id: "1", title: "Physics Project", date: "2025-04-25", course: "PHY101" },
  { id: "2", title: "Math Exam", date: "2025-04-30", course: "MAT202" },
  { id: "3", title: "History Essay", date: "2025-05-05", course: "HIS101" }
];

export const mockTasks: Task[] = [
  { id: "1", title: "Complete React assignment", completed: false, priority: "high", dueDate: "2024-01-20" },
  { id: "2", title: "Review JavaScript concepts", completed: true, priority: "medium" },
  { id: "3", title: "Prepare for quiz", completed: false, priority: "high", dueDate: "2024-01-18" },
];

export const mockLectures: Lecture[] = [
  { id: "1", title: "Introduction to Thermodynamics", date: "2025-04-18", duration: "48m" },
  { id: "2", title: "Calculus II: Integration Techniques", date: "2025-04-16", duration: "52m" },
  { id: "3", title: "Modern Literature Analysis", date: "2025-04-15", duration: "45m" },
];

export const mockUser: MockUser = {
  name: "Alex",
  progress: 68,
  streak: 5,
  hoursStudied: 24
};
