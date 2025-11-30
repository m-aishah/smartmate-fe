import { apiClient } from "@/lib/api-client";
import { deadlines } from "@/constants/endpoints";
import { Deadline } from "@/constants/dashboard";

class DeadlineService {
  async getAllDeadlines(): Promise<Deadline[]> {
    const response = await apiClient.get<any>(deadlines.getAll());
    const resData = response.data;
    // Handle possible wrappers: either an array, or { data: [...] }
    if (Array.isArray(resData)) return resData as Deadline[];
    if (resData && Array.isArray(resData.data)) return resData.data as Deadline[];
    if (resData && Array.isArray(resData.items)) return resData.items as Deadline[];
    console.warn('Unexpected deadlines response shape, returning empty array', resData);
    return [];
  }

  async postDeadline(data: Omit<Deadline, "id">): Promise<Deadline> {
    const response = await apiClient.post<any>(
      deadlines.postDeadlines(),
      data
    );
    const resData = response.data;
    if (resData && resData.data) return resData.data as Deadline;
    return resData as Deadline;
  }

  async putDeadline(
    id: string,
    data: Partial<Omit<Deadline, "id">>
  ): Promise<Deadline> {
    const response = await apiClient.put<any>(
      deadlines.putDeadlines(id),
      data
    );
    const resData = response.data;
    if (resData && resData.data) return resData.data as Deadline;
    return resData as Deadline;
  }
  async deleteDeadline(id: string): Promise<void> {
    await apiClient.delete<void>(deadlines.deleteDeadlines(id));
  }
}

export const deadlineService = new DeadlineService();
