
import { apiClient } from '@/lib/api-client';
import { summaries } from '@/constants/endpoints';
import { 
  Summary, 
  UpdateSummaryRequest,
  SummariesResponse,
  SummaryResponse
} from '../types/summary.types';

class SummaryService {
  async getAllSummaries(): Promise<Summary[]> {
    const response = await apiClient.get<SummariesResponse>(summaries.getAll());
    return response.data.summaries;
  }

  async getSummaryById(id: string): Promise<Summary> {
    const response = await apiClient.get<SummaryResponse>(summaries.getById(id));
    return response.data.summary;
  }

  async updateSummary(id: string, data: UpdateSummaryRequest): Promise<Summary> {
    const response = await apiClient.put<{ success: boolean; message: string; summary: Summary }>(
      summaries.update(id), 
      data
    );
    return response.data.summary;
  }

  async deleteSummary(id: string): Promise<void> {
    await apiClient.delete(summaries.delete(id));
  }
}

export const summaryService = new SummaryService();
