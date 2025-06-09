
import { apiClient } from '@/lib/api-client';
import { quizzes, flashcards } from '@/constants/endpoints';

export interface Quiz {
  id: string;
  title: string;
  questions: Array<{ question: string; options: string[]; correct: number }>;
  createdAt: string;
  lecture: string;
  userId?: string;
}

export interface Flashcard {
  id: string;
  title: string;
  cards: Array<{ question: string; answer: string }>;
  createdAt: string;
  lecture: string;
  userId?: string;
}

export interface CreateQuizRequest {
  title: string;
  lecture: string;
  questions: Array<{ question: string; options: string[]; correct: number }>;
}

export interface CreateFlashcardRequest {
  title: string;
  lecture: string;
  cards: Array<{ question: string; answer: string }>;
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: number[];
  timeSpent: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: Array<{
    questionIndex: number;
    userAnswer: number;
    correctAnswer: number;
  }>;
  timeSpent: number;
}

export interface QuizzesResponse {
  data: Quiz[];
}

export interface FlashcardsResponse {
  data: Flashcard[];
}

export interface QuizResultResponse {
  data: QuizResult;
}

export interface CreateQuizResponse {
  data: Quiz;
}

export interface CreateFlashcardResponse {
  data: Flashcard;
}

class QuizService {
  async getAllQuizzes(): Promise<Quiz[]> {
    const response = await apiClient.get<QuizzesResponse>(quizzes.getAll());
    return response.data.data;
  }

  async getQuizById(id: string): Promise<Quiz> {
    const response = await apiClient.get<{ data: Quiz }>(quizzes.getById(id));
    return response.data.data;
  }

  async createQuiz(quiz: CreateQuizRequest): Promise<Quiz> {
    const response = await apiClient.post<CreateQuizResponse>(quizzes.create(), quiz);
    return response.data.data;
  }

  async updateQuiz(id: string, quiz: Partial<CreateQuizRequest>): Promise<Quiz> {
    const response = await apiClient.put<{ data: Quiz }>(quizzes.update(id), quiz);
    return response.data.data;
  }

  async deleteQuiz(id: string): Promise<void> {
    await apiClient.delete(quizzes.delete(id));
  }

  async submitQuiz(submission: SubmitQuizRequest): Promise<QuizResult> {
    const response = await apiClient.post<QuizResultResponse>(`${quizzes.getById(submission.quizId)}/submit`, submission);
    return response.data.data;
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    const response = await apiClient.get<FlashcardsResponse>(flashcards.getAll());
    return response.data.data;
  }

  async getFlashcardById(id: string): Promise<Flashcard> {
    const response = await apiClient.get<{ data: Flashcard }>(flashcards.getById(id));
    return response.data.data;
  }

  async createFlashcard(flashcard: CreateFlashcardRequest): Promise<Flashcard> {
    const response = await apiClient.post<CreateFlashcardResponse>(flashcards.create(), flashcard);
    return response.data.data;
  }

  async updateFlashcard(id: string, flashcard: Partial<CreateFlashcardRequest>): Promise<Flashcard> {
    const response = await apiClient.put<{ data: Flashcard }>(flashcards.update(id), flashcard);
    return response.data.data;
  }

  async deleteFlashcard(id: string): Promise<void> {
    await apiClient.delete(flashcards.delete(id));
  }
}

export default QuizService;
