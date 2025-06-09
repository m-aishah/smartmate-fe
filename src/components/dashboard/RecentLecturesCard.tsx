
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { useQuery } from "@tanstack/react-query";
import { lectureService } from "@/services";
import { mockLectures, Lecture } from "@/constants/dashboard";

export function RecentLecturesCard() {
  const { t } = useLanguage();
  
  // TODO: Uncomment when API is ready and remove mock lectures below
  // const { data: allLectures, isLoading } = useQuery({
  //   queryKey: ['lectures'],
  //   queryFn: () => lectureService.getAllLectures(),
  // });

  // TODO: Replace with API data processing when connected
  // const lectures = allLectures
  //   ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  //   ?.slice(0, 3)
  //   ?.map(lecture => ({
  //     id: lecture.id,
  //     title: lecture.title,
  //     date: lecture.createdAt,
  //     duration: lecture.duration ? `${lecture.duration}m` : 'N/A'
  //   })) || [];

  const lectures = mockLectures; // TODO: Replace with processed API data

  // Format date to "Apr 18" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <Card className="h-full subtle-border card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t("recentLectures")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Add loading state when API is connected */}
        {/* {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4">
                <div className="h-12 w-12 bg-muted rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : ( */}
        <ul className="space-y-4">
          {lectures.map((lecture) => (
            <li key={lecture.id} className="group flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-muted">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                <span className="text-xs text-primary">{lecture.duration}</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-none group-hover:text-primary transition-colors">
                  {lecture.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(lecture.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/* )} */}
      </CardContent>
    </Card>
  );
}
