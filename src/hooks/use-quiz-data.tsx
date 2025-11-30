import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuizService, { Quiz, Flashcard } from "@/services/QuizService";
import { useToast } from "@/hooks/ui/use-toast";
// Use mock data for listing quizzes/flashcards while backend is not used
import { mockQuizzes, mockFlashcards, mockAsync } from '@/mocks/study';

// const quizService = new QuizService();

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    // original API call commented out for now:
    // queryFn: () => quizService.getAllQuizzes(),
    queryFn: () => mockAsync(mockQuizzes),
  });
}

export function useFlashcards() {
  return useQuery({
    queryKey: ["flashcards"],
    // queryFn: () => quizService.getAllFlashcards(),
    queryFn: () => mockAsync(mockFlashcards),
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
