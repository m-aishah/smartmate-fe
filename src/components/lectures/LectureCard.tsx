import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LectureCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  isFavorite?: boolean;
  thumbnail?: string;
}

export function LectureCard({
  id,
  title,
  description,
  date,
  isFavorite = false,
  thumbnail,
}: LectureCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  // Format date to "Apr 18" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <Card className="h-full overflow-hidden backdrop-blur-md glass-card card-hover border-border/30">
      <div className="relative">
        <div className="aspect-video bg-muted/30 flex items-center justify-center overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-background">
              <BookOpen className="h-12 w-12 text-accent/50" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link to={`/app/lectures/${id}`}>
          <h3 className="font-semibold line-clamp-1 hover:text-accent transition-colors font-orbitron">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{formatDate(date)}</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-background/80"
            onClick={toggleFavorite}
          >
            <Star
              className={cn(
                "h-4 w-4 transition-all duration-300",
                favorite
                  ? "fill-yellow-500 text-yellow-500 scale-110"
                  : "text-muted-foreground hover:text-yellow-400"
              )}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
