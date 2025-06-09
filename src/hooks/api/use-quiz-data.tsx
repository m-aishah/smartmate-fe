
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QuizService, { Quiz, Flashcard, SubmitQuizRequest, QuizResult } from "@/services/QuizService";
import { useToast } from "@/hooks/ui/use-toast";

const quizService = new QuizService();

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: () => quizService.getAllQuizzes(),
    retry: 2,
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => quizService.getQuizById(id),
    enabled: !!id,
    retry: 2,
  });
}

export function useFlashcards() {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: () => quizService.getAllFlashcards(),
    retry: 2,
  });
}

export function useFlashcard(id: string) {
  return useQuery({
    queryKey: ["flashcard", id],
    queryFn: () => quizService.getFlashcardById(id),
    enabled: !!id,
    retry: 2,
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

export function useUpdateQuiz() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, quiz }: { id: string; quiz: Partial<Omit<Quiz, 'id' | 'createdAt'>> }) => 
      quizService.updateQuiz(id, quiz),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", data.id] });
      toast({
        title: "Success",
        description: "Quiz updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update quiz",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => quizService.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast({
        title: "Success",
        description: "Quiz deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete quiz",
        variant: "destructive",
      });
    },
  });
}

export function useSubmitQuiz() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (submission: SubmitQuizRequest) => quizService.submitQuiz(submission),
    onSuccess: (result: QuizResult) => {
      toast({
        title: "Quiz Completed!",
        description: `You scored ${result.score}% (${result.correctAnswers}/${result.totalQuestions} correct)`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit quiz",
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

export function useUpdateFlashcard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, flashcard }: { id: string; flashcard: Partial<Omit<Flashcard, 'id' | 'createdAt'>> }) => 
      quizService.updateFlashcard(id, flashcard),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      queryClient.invalidateQueries({ queryKey: ["flashcard", data.id] });
      toast({
        title: "Success",
        description: "Flashcard updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update flashcard",
        variant: "destructive",
      });
    },
  });
}

export function useDeleteFlashcard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => quizService.deleteFlashcard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      toast({
        title: "Success",
        description: "Flashcard deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete flashcard",
        variant: "destructive",
      });
    },
  });
}
