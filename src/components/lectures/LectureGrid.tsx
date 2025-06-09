import { motion } from "framer-motion";
import { Search, Star, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { TechCard, TechCardContent, TechCardDescription, TechCardFooter, TechCardHeader, TechCardIcon, TechCardTitle } from "../ui/tech-card";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { useLanguage } from "@/hooks/store/use-language";
import { LectureDetailModal } from "./LectureDetailModal";
import { EditLectureModal } from "./EditLectureModal";
import { DeleteLectureDialog } from "./DeleteLectureDialog";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Lecture } from "@/services/types/lecture.types";
import { useUpdateLecture } from "@/hooks/api/use-lectures";
import { useToast } from "@/hooks/ui/use-toast";

interface LectureGridProps {
  lectures: Lecture[];
  searchQuery: string;
  selectedCourse?: string;
  selectedDateRange?: string;
  selectedDuration?: string;
  onToggleFavorite?: (lectureId: string) => void;
}

export function LectureGrid({ 
  lectures, 
  searchQuery, 
  selectedCourse, 
  selectedDateRange, 
  selectedDuration,
  onToggleFavorite 
}: LectureGridProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lectureToEdit, setLectureToEdit] = useState<Lecture | null>(null);
  const [lectureToDelete, setLectureToDelete] = useState<Lecture | null>(null);
  
  const updateLectureMutation = useUpdateLecture();
  
  // Filter lectures based on search query and filters
  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lecture.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = !selectedCourse || selectedCourse === "" || 
                         lecture.title.toLowerCase().includes(selectedCourse.toLowerCase());
    
    const matchesDateRange = !selectedDateRange || selectedDateRange === "" || (() => {
      const lectureDate = new Date(lecture.createdAt);
      const now = new Date();
      
      switch (selectedDateRange) {
        case "last-week":
          return lectureDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case "last-month":
          return lectureDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case "last-3-months":
          return lectureDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        default:
          return true;
      }
    })();
    
    const matchesDuration = !selectedDuration || selectedDuration === "" || (() => {
      const progress = lecture.progress || 0;
      switch (selectedDuration) {
        case "short":
          return progress < 30;
        case "medium":
          return progress >= 30 && progress <= 70;
        case "long":
          return progress > 70;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesCourse && matchesDateRange && matchesDuration;
  });
  
  const getProcessingStatus = (lecture: Lecture) => {
    if (lecture.status === "completed") {
      return { status: "completed", message: "Processing complete", color: "green" };
    } else if (lecture.status === "processing") {
      return { status: "processing", message: "AI is processing...", color: "blue" };
    } else if (lecture.status === "failed") {
      return { status: "failed", message: "Processing failed", color: "red" };
    } else if (lecture.status === "pending") {
      return { status: "pending", message: "Queued for processing", color: "yellow" };
    }
    return null;
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setModalOpen(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent, lectureId: string) => {
    e.stopPropagation();
    const lecture = lectures.find(l => l.id.toString() === lectureId);
    if (lecture) {
      updateLectureMutation.mutate({
        id: lectureId,
        data: {
          isFavourite: lecture.isFavourite === 1 ? 0 : 1
        }
      });
    }
  };

  const handleEditLecture = (e: React.MouseEvent, lecture: Lecture) => {
    e.stopPropagation();
    setLectureToEdit(lecture);
    setEditModalOpen(true);
  };

  const handleDeleteLecture = (e: React.MouseEvent, lecture: Lecture) => {
    e.stopPropagation();
    setLectureToDelete(lecture);
    setDeleteDialogOpen(true);
  };

  if (filteredLectures.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center glass-card bg-background/30 backdrop-blur-md rounded-xl p-8 md:p-12 text-center shadow-sm border border-smartmate-teal/20"
      >
        <motion.div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-smartmate-teal/10 flex items-center justify-center mb-6"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Search className="h-8 w-8 md:h-10 md:w-10 text-smartmate-teal/50" />
        </motion.div>
        <h3 className="text-xl md:text-2xl font-semibold font-orbitron mb-3 smartmate-text-gradient glow-effect">
          {t("noLecturesFound")}
        </h3>
        <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
          {searchQuery 
            ? "No lectures match your search criteria. Try adjusting your filters." 
            : "Upload your first lecture to get started with AI-powered summaries!"}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {filteredLectures.map((lecture, index) => {
          const processingStatus = getProcessingStatus(lecture);
          const hasSummary = lecture.summaryId && (lecture.briefSummary || lecture.detailedSummary);
          
          return (
            <motion.div
              key={lecture.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(lecture.id.toString())}
              onHoverEnd={() => setHoveredCard(null)}
              className="h-full"
            >
              <TechCard 
                variant="gradient" 
                animate={false}
                onClick={() => handleLectureClick(lecture)}
                className="h-full flex flex-col transition-all duration-300 cursor-pointer glass-card hover:shadow-lg hover:-translate-y-1 min-h-[280px] relative"
              >
                <TechCardHeader className="pb-4 flex-shrink-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {lecture.courseCode && (
                        <Badge variant="outline" className="text-xs px-2 py-1 border-smartmate-teal/30 text-smartmate-teal bg-smartmate-teal/5">
                          {lecture.courseCode}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 relative z-20">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-background/80 flex-shrink-0 relative z-30"
                        onClick={(e) => handleToggleFavorite(e, lecture.id.toString())}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4 transition-colors",
                            lecture.isFavourite === 1
                              ? "fill-smartmate-teal text-smartmate-teal" 
                              : "text-muted-foreground hover:text-smartmate-teal"
                          )}
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-blue-500/10 flex-shrink-0 relative z-30"
                        onClick={(e) => handleEditLecture(e, lecture)}
                      >
                        <Edit className="h-4 w-4 text-muted-foreground hover:text-blue-500" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-red-500/10 flex-shrink-0 relative z-30"
                        onClick={(e) => handleDeleteLecture(e, lecture)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {processingStatus && (
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs px-2 py-1",
                          processingStatus.color === "green" ? "border-green-500 text-green-500 bg-green-500/10" :
                          processingStatus.color === "blue" ? "border-smartmate-blue text-smartmate-blue bg-smartmate-blue/10" :
                          processingStatus.color === "red" ? "border-red-500 text-red-500 bg-red-500/10" :
                          "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                        )}
                      >
                        {processingStatus.status}
                      </Badge>
                    )}
                  </div>
                </TechCardHeader>
                
                <TechCardContent className="pb-4 flex-grow flex flex-col">
                  <TechCardTitle className="mb-3 smartmate-text-gradient line-clamp-2 text-base md:text-lg leading-tight">
                    {lecture.title || `Lecture ${lecture.id}`}
                  </TechCardTitle>
                  <TechCardDescription className="line-clamp-3 mb-4 text-sm leading-relaxed flex-grow">
                    {lecture.description || 
                     (processingStatus?.message || "Processing lecture content...")
                    }
                  </TechCardDescription>
                  
                  {lecture.progress > 0 && lecture.status === "processing" && (
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-smartmate-teal h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lecture.progress}%` }}
                      />
                    </div>
                  )}
                </TechCardContent>
                
                <TechCardFooter className="text-sm text-muted-foreground pt-4 border-t border-border/20 flex-shrink-0">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs">
                      {new Date(lecture.createdAt).toLocaleDateString()}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-3 text-xs rounded-full hover:bg-smartmate-teal/10 hover:text-smartmate-teal relative z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLectureClick(lecture);
                      }}
                    >
                      {hasSummary ? "View Summary" : "View Details"}
                    </Button>
                  </div>
                </TechCardFooter>
              </TechCard>
            </motion.div>
          );
        })}
      </div>

      <LectureDetailModal
        lecture={selectedLecture}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      
      <EditLectureModal
        lecture={lectureToEdit}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
      
      <DeleteLectureDialog
        lecture={lectureToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </>
  );
}
