
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { mockDeadlines } from "@/constants/dashboard";

export function DeadlinesCard() {
  const { t } = useLanguage();
  
  const deadlines = mockDeadlines;

  // Format date to "Apr 25" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="h-full subtle-border card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("upcomingDeadlines")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {deadlines.map((deadline) => {
            const daysRemaining = getDaysRemaining(deadline.date);
            return (
              <li key={deadline.id} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">{deadline.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{formatDate(deadline.date)}</p>
                  <p className={`text-xs ${daysRemaining <= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                    {daysRemaining} days left
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
