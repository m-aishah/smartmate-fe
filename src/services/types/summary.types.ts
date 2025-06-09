
export interface Summary {
  id: number;
  courseId: number;
  createdBy: number;
  title: string;
  description: string;
  brief: string;
  detailed: string;
  keyPoints: string;
  taskId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSummaryRequest {
  summaryTitle?: string;
  summaryDescription?: string;
  briefSummary?: string;
  detailedSummary?: string;
  keyPoints?: string;
}

export interface SummariesResponse {
  summaries: Summary[];
}

export interface SummaryResponse {
  summary: Summary;
}
