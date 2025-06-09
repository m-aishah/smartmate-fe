
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { lectureService } from "@/services";
import { useToast } from "@/hooks/ui/use-toast";
import { CreateLectureRequest, UpdateLectureRequest, Lecture } from "@/services/types/lecture.types";

export function useLectures() {
  return useQuery({
    queryKey: ["lectures"],
    queryFn: () => lectureService.getAllLectures(),
  });
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
    mutationFn: (data: CreateLectureRequest) => lectureService.createLecture(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast({
        title: "Success",
        description: "Lecture uploaded successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to upload lecture",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLecture() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLectureRequest }) => 
      lectureService.updateLecture(id, data),
    onSuccess: (updatedLecture: Lecture) => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      queryClient.setQueryData(["lectures", updatedLecture.id], updatedLecture);
      toast({
        title: "Success",
        description: "Lecture updated successfully!",
      });
    },
    onError: (error: any) => {
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
    mutationFn: (id: string) => lectureService.deleteLecture(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast({
        title: "Success",
        description: "Lecture deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete lecture",
        variant: "destructive",
      });
    },
  });
}
