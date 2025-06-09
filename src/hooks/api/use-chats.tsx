
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatService } from "@/services";
import { useToast } from "@/hooks/ui/use-toast";
import { Chat, ChatWithMessages, CreateChatRequest } from "@/services/types/chat.types";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => chatService.getAllChats(),
    staleTime: 30000,
  });
}

export function useChat(id: string) {
  return useQuery({
    queryKey: ["chats", id],
    queryFn: () => chatService.getChatById(id),
    enabled: !!id,
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateChatRequest) => {
      console.log("Creating chat with data:", data);
      return chatService.createChat(data);
    },
    onSuccess: (newChat: Chat) => {
      console.log("Chat created successfully:", newChat);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.setQueryData(["chats", newChat.id.toString()], newChat); // Convert number to string
      toast({
        title: "Success",
        description: "New chat created successfully!",
      });
    },
    onError: (error: any) => {
      console.error("Chat creation error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create chat",
        variant: "destructive",
      });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: {
      chatId?: number;
      chatTitle?: string;
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      systemPromptId?: number;
      attachments?: string[];
      documentURL?: string | null;
      selectedSummary?: string | null;
    }) => {
      console.log("Sending message with data:", data);
      return chatService.sendMessage(data);
    },
    onSuccess: (response, variables) => {
      console.log("Message sent successfully:", response);
      // Update the chat cache with new messages
      if (response.id) {
        queryClient.invalidateQueries({ queryKey: ["chats", response.id.toString()] });
      }
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error: any) => {
      console.error("Message sending error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });
}

export function useSystemPrompt(id: string) {
  return useQuery({
    queryKey: ["systemPrompt", id],
    queryFn: () => chatService.getSystemPrompt(id),
    enabled: !!id,
  });
}
