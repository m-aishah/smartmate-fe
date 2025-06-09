
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services";
import { useToast } from "@/hooks/ui/use-toast";
import { UpdateUserRequest, User } from "@/services/types/user.types";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => userService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => userService.updateProfile(data),
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(["user-profile"], updatedUser);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
}
