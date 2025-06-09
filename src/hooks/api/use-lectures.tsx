
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lectureService } from "@/services";
import { useToast } from "@/hooks/ui/use-toast";
import { CreateLectureRequest, UpdateLectureRequest, Lecture } from "@/services/types/lecture.types";
import { useEffect, useRef } from "react";

export function useLectures() {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const query = useQuery({
    queryKey: ["lectures"],
    queryFn: async () => {
      console.log('useLectures: Fetching lectures...');
      const lectures = await lectureService.getAllLectures();
      console.log('useLectures: Received lectures:', lectures);
      return lectures;
    },
    staleTime: 30000, // Cache for 30 seconds
    retry: (failureCount, error: any) => {
      console.log('useLectures: Retry attempt', failureCount, 'Error:', error.message);
      
      // Don't retry on 401/403 errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      // Don't retry on 204 No Content - it's a valid response
      if (error?.response?.status === 204) {
        return false;
      }
      // Don't retry on HTML responses (ngrok warning page)
      if (error.message?.includes('Network configuration issue')) {
        return false;
      }
      
      return failureCount < 5; // Increased retry attempts for better reliability
    },
  });

  // Smart polling based on lecture statuses
  useEffect(() => {
    if (!query.data) return;

    const hasProcessingLectures = query.data.some(
      lecture => lecture.status === "processing" || lecture.status === "pending"
    );

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (hasProcessingLectures) {
      // Poll every 10 seconds when there are processing lectures
      console.log('Starting smart polling for processing lectures...');
      intervalRef.current = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ["lectures"] });
      }, 10000);
    } else {
      // Poll every 60 seconds when all lectures are completed (for any new uploads)
      intervalRef.current = setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ["lectures"] });
      }, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [query.data, queryClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return query;
}

export function useLecture(id: string) {
  return useQuery({
    queryKey: ["lectures", id],
    queryFn: () => lectureService.getLectureById(id),
    enabled: !!id,
  });
}

export function useCreateLecture() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateLectureRequest) => {
      console.log("useCreateLecture: Creating lecture with data:", data);
      console.log("File details:", data.lectureType === 'audio' && data.lecture instanceof File ? {
        name: data.lecture.name,
        size: data.lecture.size,
        type: data.lecture.type
      } : 'Text content');
      
      return lectureService.createLecture(data);
    },
    onSuccess: (response) => {
      console.log("useCreateLecture: Upload successful:", response);
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      
      // Show different messages based on upload type
      const isAudio = response.taskId; // Audio uploads return taskId for processing
      toast({
        title: "Success",
        description: isAudio 
          ? "Audio lecture uploaded successfully! Processing will begin shortly. You can navigate away - we'll process it in the background."
          : "Lecture uploaded successfully!",
      });
    },
    onError: (error: any) => {
      console.error("useCreateLecture: Upload failed:", error);
      
      let errorMessage = "Failed to upload lecture";
      if (error.code === 'ECONNABORTED' || error.message?.includes('timed out')) {
        errorMessage = "Upload timed out. This usually happens with large audio files. Please try again or use a smaller file.";
      } else if (error.message?.includes('Network configuration issue')) {
        errorMessage = "Network configuration issue. Please refresh the page and try again.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLecture() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLectureRequest }) => {
      console.log("Updating lecture:", id, data);
      return lectureService.updateLecture(id, data);
    },
    onSuccess: (updatedLecture: Lecture) => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.setQueryData(["lectures", updatedLecture.id], updatedLecture);
      toast({
        title: "Success",
        description: "Lecture updated successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Lecture update error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update lecture",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteLecture() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => {
      console.log("Deleting lecture:", id);
      return lectureService.deleteLecture(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast({
        title: "Success",
        description: "Lecture deleted successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Lecture delete error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete lecture",
        variant: "destructive",
      });
    },
  });
}

// Re-export progress hooks
export * from './use-lecture-progress';
