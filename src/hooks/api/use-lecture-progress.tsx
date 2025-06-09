
import { useQuery } from "@tanstack/react-query";
import { lectureService } from "@/services";
import { LectureProgressResponse } from "@/services/types/lecture.types";

export function useLectureProgress(taskId: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: ["lecture-progress", taskId],
    queryFn: () => lectureService.checkLectureProgress(taskId!),
    enabled: !!taskId && enabled,
    refetchInterval: (query) => {
      // Stop polling if task is completed or failed
      if (query.state.data?.status === "completed" || query.state.data?.status === "failed") {
        return false;
      }
      // Poll every 3 seconds while processing
      return 3000;
    },
    retry: (failureCount, error: any) => {
      // Don't retry if it's a 404 (task not found)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

export function usePollingLectureProgress(taskId: string | null) {
  const { data, isLoading, error, isError } = useLectureProgress(taskId);
  
  const isPolling = data?.status === "pending" || data?.status === "processing";
  const isCompleted = data?.status === "completed";
  const hasFailed = data?.status === "failed";
  
  return {
    progress: data,
    isLoading,
    error,
    isError,
    isPolling,
    isCompleted,
    hasFailed,
    status: data?.status,
    message: data?.message,
    progressPercentage: data?.progress || 0,
  };
}
