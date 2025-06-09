
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lecture } from "@/services/types/lecture.types";
import { Calendar, Clock, BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LectureDetailModalProps {
  lecture: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LectureDetailModal({ lecture, open, onOpenChange }: LectureDetailModalProps) {
  if (!lecture) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatKeyPoints = (keyPoints: string | undefined) => {
    if (!keyPoints) return [];
    
    try {
      // Try to parse as JSON array first
      const parsed = JSON.parse(keyPoints);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // If parsing fails, treat as regular string and split by newlines or bullet points
      return keyPoints
        .split(/\n|•|\*|-/)
        .map(point => point.trim())
        .filter(point => point.length > 0);
    }
    
    return [keyPoints];
  };

  const keyPointsList = formatKeyPoints(lecture.keyPoints);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-orbitron smartmate-text-gradient">
            {lecture.title || `Lecture ${lecture.id}`}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Lecture Info */}
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(lecture.createdAt)}</span>
              </div>
              
              {lecture.courseCode && (
                <Badge variant="outline" className="border-smartmate-teal/30 text-smartmate-teal">
                  {lecture.courseCode}
                </Badge>
              )}
              
              {lecture.isFavourite === 1 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-smartmate-teal text-smartmate-teal" />
                  <span className="text-smartmate-teal">Favorite</span>
                </div>
              )}
            </div>

            {/* Description */}
            {lecture.description && (
              <div>
                <h3 className="font-semibold mb-2 font-orbitron">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{lecture.description}</p>
              </div>
            )}

            <Separator />

            {/* Processing Status */}
            {lecture.status !== "completed" && (
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 font-orbitron">Processing Status</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline"
                    className={cn(
                      lecture.status === "processing" ? "border-blue-500 text-blue-500 bg-blue-500/10" :
                      lecture.status === "failed" ? "border-red-500 text-red-500 bg-red-500/10" :
                      "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                    )}
                  >
                    {lecture.status}
                  </Badge>
                </div>
                
                {lecture.status === "processing" && lecture.progress > 0 && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-smartmate-teal h-2 rounded-full transition-all duration-300"
                      style={{ width: `${lecture.progress}%` }}
                    />
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mt-2">
                  {lecture.status === "processing" && "AI is currently processing your lecture content..."}
                  {lecture.status === "pending" && "Your lecture is queued for processing..."}
                  {lecture.status === "failed" && "Processing failed. Please try uploading again."}
                </p>
              </div>
            )}

            {/* Summary Content */}
            {lecture.status === "completed" && (lecture.briefSummary || lecture.detailedSummary || keyPointsList.length > 0) && (
              <>
                <Separator />
                
                {/* Brief Summary */}
                {lecture.briefSummary && (
                  <div>
                    <h3 className="font-semibold mb-3 font-orbitron flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-smartmate-teal" />
                      Brief Summary
                    </h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-muted-foreground leading-relaxed">{lecture.briefSummary}</p>
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {keyPointsList.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 font-orbitron">Key Points</h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <ul className="space-y-2">
                        {keyPointsList.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-smartmate-teal mt-1.5">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Detailed Summary */}
                {lecture.detailedSummary && (
                  <div>
                    <h3 className="font-semibold mb-3 font-orbitron">Detailed Summary</h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {lecture.detailedSummary}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
