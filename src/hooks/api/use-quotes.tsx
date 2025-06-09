import { useQuery } from "@tanstack/react-query";
import { quoteService } from "@/services";
import { Quote } from "@/services/api/quote.service";

export function useQuotes() {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: () => quoteService.getAllQuotes(),
  });
}

export function useRandomQuote() {
  const { data: quotes, isLoading, error } = useQuotes();

  const getRandomQuote = (): Quote | null => {
    if (!quotes || quotes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  return {
    quote: getRandomQuote(),
    isLoading,
    error,
    refetch: () => getRandomQuote(),
  };
}
