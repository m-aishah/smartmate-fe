import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuizService, { Quiz, Flashcard } from "@/services/QuizService";
import { useToast } from "@/hooks/ui/use-toast";

const quizService = new QuizService();

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: () => quizService.getAllQuizzes(),
  });
}

export function useFlashcards() {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: () => quizService.getAllFlashcards(),
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => quizService.createQuiz(quiz),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast({
        title: "Success",
        description: "Quiz created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create quiz",
        variant: "destructive",
      });
    },
  });
}

export function useCreateFlashcard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (flashcard: Omit<Flashcard, 'id' | 'createdAt'>) => quizService.createFlashcard(flashcard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      toast({
        title: "Success",
        description: "Flashcard created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create flashcard",
        variant: "destructive",
      });
    },
  });
}
