import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/store/use-language";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";

export function WelcomeSection() {
  const { t } = useLanguage();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => userService.getProfile(),
  });

  return (
    <Card className="overflow-hidden subtle-border">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/40"></div>
      <CardContent className="-mt-12 p-6">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="mb-6 flex items-end gap-4">
              <div className="h-20 w-20 rounded-full bg-muted"></div>
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-40"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-muted rounded"></div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-end gap-4">
              <div className="h-20 w-20 rounded-full border-4 border-background bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {user?.firstName?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {t("welcome")}, {user?.firstName ?? "User"}!
                </h2>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString()} | {user?.streak ?? 0} day
                  streak
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t("yourProgress")}</span>
                  <span>{user?.progress ?? 0}%</span>
                </div>
                <Progress value={user?.progress ?? 0} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">
                    {user?.hoursStudied ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Hours Studied</p>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-2xl font-bold">{user?.streak ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
