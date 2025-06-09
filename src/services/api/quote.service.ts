
import { apiClient } from '@/lib/api-client';
import { quotes } from '@/constants/endpoints';

export interface Quote {
  id: string;
  text: string;
  author: string;
  category?: string;
}

class QuoteService {
  async getAllQuotes(): Promise<Quote[]> {
    const response = await apiClient.get<Quote[]>(quotes.getAll());
    return response.data;
  }
}

export const quoteService = new QuoteService();
