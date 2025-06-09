
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { useQuotes } from "@/hooks/api/use-quotes";
import { mockQuotes, Quote } from "@/constants/quotes";

export function QuoteCard() {
  const { language, t } = useLanguage();
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });

  // Use real quotes API
  const { data: apiQuotes, isLoading } = useQuotes();
  
  useEffect(() => {
    if (apiQuotes && apiQuotes.length > 0) {
      // Use API data when available
      const randomIndex = Math.floor(Math.random() * apiQuotes.length);
      const selectedQuote = apiQuotes[randomIndex];
      setQuote({
        text: selectedQuote.text,
        author: selectedQuote.author
      });
    } else {
      // Fallback to mock data if API fails or no data
      const langQuotes = mockQuotes[language] || mockQuotes.en;
      const randomIndex = Math.floor(Math.random() * langQuotes.length);
      setQuote(langQuotes[randomIndex]);
    }
  }, [apiQuotes, language, isLoading]);

  // Show loading state briefly
  if (isLoading && !quote.text) {
    return (
      <Card className="overflow-hidden subtle-border card-hover">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            {t("quote")}
          </h3>
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-muted rounded w-1/3 ml-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden subtle-border card-hover">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          {t("quote")}
        </h3>
        <blockquote className="italic text-lg">
          "{quote.text}"
        </blockquote>
        <p className="text-right text-sm text-muted-foreground mt-2">
          — {quote.author}
        </p>
      </CardContent>
    </Card>
  );
}
