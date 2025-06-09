import { useState } from "react";
import { PlusCircle, Rotate3d } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/store/use-language";
import { LectureFilters } from "@/components/lectures/LectureFilters";
import { LectureGrid } from "@/components/lectures/LectureGrid";
import { UploadLectureModal } from "@/components/lectures/UploadLectureModal";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { cn } from "@/lib/utils";
import { useLectures, useUpdateLecture } from "@/hooks/api/use-lectures";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const Lectures = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter states
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  // Fetch lectures from backend
  const { data: lectures = [], isLoading, error } = useLectures();
  const updateLectureMutation = useUpdateLecture();

  const handleToggleFavorite = (lectureId: string) => {
    const lecture = lectures.find((l) => l.id.toString() === lectureId);
    if (lecture) {
      updateLectureMutation.mutate({
        id: lectureId,
        data: {
          isFavourite: lecture.isFavourite === 1 ? 0 : 1,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 pb-4 md:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-orbitron smartmate-text-gradient glow-effect">
            {t("lectures")}
          </h1>
        </div>
        <LoadingSkeleton className="h-20" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 md:space-y-6 pb-4 md:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-orbitron smartmate-text-gradient glow-effect">
            {t("lectures")}
          </h1>
        </div>
        <div className="text-center p-8 text-red-500">
          Error loading lectures: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  console.log("Fetched lectures:", lectures);

  return (
    <div className="space-y-4 md:space-y-6 pb-4 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.h1
          className="text-2xl md:text-3xl font-orbitron smartmate-text-gradient glow-effect"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("lectures")} ({lectures.length})
        </motion.h1>

        {/* 3D rotating atom-like element - hidden on mobile */}
        {!isMobile && (
          <div className="relative h-16 w-16">
            <motion.div
              className="absolute inset-0"
              animate={{
                rotateY: 360,
                rotateZ: 180,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-smartmate-teal/10 flex items-center justify-center">
                  <Rotate3d className="h-6 w-6 text-smartmate-teal/70" />
                </div>
              </div>

              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute inset-0 rounded-full border border-smartmate-teal/30"
                  style={{
                    transformOrigin: "center",
                    transform: `rotateX(${i * 60}deg) rotateY(${i * 60}deg)`,
                  }}
                >
                  <motion.div
                    className="absolute h-2 w-2 rounded-full bg-smartmate-teal"
                    style={{
                      left: "50%",
                      top: 0,
                      marginLeft: "-4px",
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 5 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LectureFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <LectureGrid
          lectures={lectures}
          searchQuery={searchQuery}
          selectedCourse={selectedCourse}
          selectedDateRange={selectedDateRange}
          selectedDuration={selectedDuration}
          onToggleFavorite={handleToggleFavorite}
        />
      </motion.div>

      {/* Upload button - positioned better for mobile */}
      <motion.div
        className={cn(
          "fixed z-50",
          isMobile
            ? "bottom-20 right-4"
            : "bottom-4 left-1/2 transform -translate-x-1/2"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size={isMobile ? "default" : "lg"}
          className={cn(
            "rounded-full glass hover:glass-hover bg-gradient-to-r from-smartmate-teal to-accent relative overflow-hidden group",
            isMobile ? "h-12 w-12 p-0 top-10" : "h-12 px-6"
          )}
          onClick={() => setIsUploadModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/20 via-transparent to-smartmate-blue/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--smartmate-teal)_0%,_transparent_50%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
          <PlusCircle
            className={cn(
              "relative z-10",
              isMobile ? "h-6 w-6" : "mr-2 h-5 w-5"
            )}
          />
          {!isMobile && (
            <span className="relative z-10 font-orbitron">
              {t("uploadLecture")}
            </span>
          )}
        </Button>
      </motion.div>

      <UploadLectureModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  );
};

export default Lectures;
