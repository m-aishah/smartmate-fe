
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { summaryService } from "@/services";
import { useToast } from "@/hooks/ui/use-toast";
import { UpdateSummaryRequest, Summary } from "@/services/types/summary.types";

export function useSummaries() {
  return useQuery({
    queryKey: ["summaries"],
    queryFn: () => summaryService.getAllSummaries(),
  });
}

export function useSummary(id: string) {
  return useQuery({
    queryKey: ["summaries", id],
    queryFn: () => summaryService.getSummaryById(id),
    enabled: !!id,
  });
}

export function useUpdateSummary() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSummaryRequest }) => 
      summaryService.updateSummary(id, data),
    onSuccess: (updatedSummary: Summary) => {
      queryClient.invalidateQueries({ queryKey: ["summaries"] });
      queryClient.setQueryData(["summaries", updatedSummary.id], updatedSummary);
      toast({
        title: "Success",
        description: "Summary updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update summary",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteSummary() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => summaryService.deleteSummary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summaries"] });
      toast({
        title: "Success",
        description: "Summary deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete summary",
        variant: "destructive",
      });
    },
  });
}
