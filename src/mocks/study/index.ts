// Mock quizzes and flashcards derived from analytics mock subjects
import { mockPerformance, mockAsync } from '@/mocks/analytics';

function idify(prefix: string, name: string) {
  return `${prefix}-${name.toLowerCase().replace(/\s+/g, '-')}`;
}

export const mockQuizzes = mockPerformance.map((p, idx) => ({
  id: idify('quiz', p.subject),
  title: `${p.subject} Practice Quiz`,
  questions: Array.from({ length: 5 }).map((_, qi) => ({
    question: `Sample question ${qi + 1} for ${p.subject}?`,
    options: [
      `Option A for ${p.subject}`,
      `Option B for ${p.subject}`,
      `Option C for ${p.subject}`,
      `Option D for ${p.subject}`,
    ],
    correct: qi % 4,
  })),
  createdAt: new Date(Date.now() - (idx * 86400000)).toISOString(),
  lecture: p.subject,
}));

export const mockFlashcards = mockPerformance.map((p, idx) => ({
  id: idify('flash', p.subject),
  title: `${p.subject} Flashcards`,
  cards: Array.from({ length: 6 }).map((_, ci) => ({
    question: `${p.subject} concept ${ci + 1}`,
    answer: `Short answer ${ci + 1} for ${p.subject}`,
  })),
  createdAt: new Date(Date.now() - (idx * 43200000)).toISOString(),
  lecture: p.subject,
}));

export default {
  mockQuizzes,
  mockFlashcards,
  mockAsync,
};

// re-export mockAsync as a named export for direct imports
export { mockAsync };
