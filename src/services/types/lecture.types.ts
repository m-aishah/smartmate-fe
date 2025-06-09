
export interface Lecture {
  id: number;
  courseId: number;
  createdBy: number;
  title: string;
  description: string;
  summaryId?: number;
  summaryTitle?: string;
  summaryDescription?: string;
  briefSummary?: string;
  detailedSummary?: string;
  keyPoints?: string;
  recordingId?: number;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  isFavourite: 0 | 1;
  isArchived: 0 | 1;
  isPinned: 0 | 1;
  createdAt: string;
  updatedAt: string;
  // Additional fields for compatibility and display
  courseCode?: string;
  semester?: string;
  yearOfStudy?: string;
  lectureType?: "audio" | "text";
  taskId?: string;
  taskStatus?: string;
  taskMessage?: string;
  taskStatusUrl?: string;
  // Computed properties for UI
  duration?: string;
  date?: string;
}

export interface CreateLectureRequest {
  courseCode: string;
  semester: string;
  yearOfStudy: string;
  lecture: File | string; // File for audio, string for text
  lectureType: "audio" | "text";
}

export interface UpdateLectureRequest {
  lectureTitle?: string;
  lectureDescription?: string;
  isFavourite?: 0 | 1;
  isArchived?: 0 | 1;
  isPinned?: 0 | 1;
}

export interface LectureUploadResponse {
  id: number;
  taskId: string;
  taskStatus: string;
  taskMessage: string;
  taskStatusUrl: string;
}

export interface LectureProgressResponse {
  id: string;
  taskType: string;
  status: "pending" | "processing" | "completed" | "failed";
  message: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface LecturesResponse {
  lectures: Lecture[];
}

export interface LectureResponse {
  lecture: Lecture;
}
