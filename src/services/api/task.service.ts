import { apiClient } from "@/lib/api-client";
import { tasks } from "@/constants/endpoints";
import { Task } from "../types/task.types";

class TaskService {
  async getAllTasks(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(tasks.getAll());
    return response.data;
  }

  async postTask(data: Omit<Task, "id">): Promise<Task> {
    const response = await apiClient.post<Task>(tasks.postTasks(), data);
    return response.data;
  }

  async putTask(id: string, data: Partial<Omit<Task, "id">>): Promise<Task> {
    const response = await apiClient.put<Task>(tasks.putTasks(id), data);
    return response.data;
  }
  async deleteTask(id: string): Promise<void> {
    await apiClient.delete<void>(tasks.deleteTasks(id));
  }
}

export const taskService = new TaskService();
