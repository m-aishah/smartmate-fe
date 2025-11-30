
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, RotateCcw, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardFanProps {
  flashcard: {
    id: string;
    title: string;
    cards: Array<{ question: string; answer: string }>;
    createdAt: string;
    lecture: string;
  };
  onDownload: () => void;
  onStudy: () => void;
}

export function FlashcardFan({ flashcard, onDownload, onStudy }: FlashcardFanProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorVariants = [
    "from-smartmate-teal/20 to-smartmate-cyan/20 border-smartmate-teal/30",
    "from-smartmate-blue/20 to-smartmate-lavender/20 border-smartmate-blue/30", 
    "from-smartmate-lavender/20 to-smartmate-pink/20 border-smartmate-lavender/30",
    "from-smartmate-pink/20 to-smartmate-peach/20 border-smartmate-pink/30",
    "from-smartmate-peach/20 to-smartmate-teal/20 border-smartmate-peach/30"
  ];

  return (
    <motion.div
      className="relative min-h-[280px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4 min-h-[60px]">
        <div className="flex-1 mr-4">
          <h3 className="font-semibold text-base bg-gradient-to-r from-smartmate-teal to-smartmate-blue bg-clip-text text-transparent mb-2 leading-tight">
            {flashcard.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{flashcard.lecture}</p>
          <p className="text-xs text-muted-foreground mt-1">{flashcard.cards.length} cards</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="h-8 w-8 p-0 hover:bg-smartmate-teal/10"
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="relative h-52 cursor-pointer" onClick={onStudy}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full"
          >
            {flashcard.cards.slice(0, 5).map((_, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                style={{
                  zIndex: 5 - index,
                }}
                animate={{
                  rotate: isHovered ? index * 12 - 12 : index * 6 - 6,
                  x: isHovered ? index * 6 : index * 3,
                  y: isHovered ? index * 3 : index * 1.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className={cn(
                  "h-full portal-card hover:shadow-xl transition-all duration-300",
                  `bg-gradient-to-br ${colorVariants[index % colorVariants.length]}`
                )}>
                  <CardContent className="h-full flex items-center justify-center p-4">
                    <div className="text-center">
                      {index === 0 ? (
                        <>
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-smartmate-teal to-smartmate-blue flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {flashcard.cards.length}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium mb-3">
                            Click to study
                          </p>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStudy();
                            }}
                            className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white text-xs h-7"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Study
                          </Button>
                        </>
                      ) : (
                        <div className="w-8 h-8 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-muted-foreground font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Floating elements for extra visual appeal */}
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-smartmate-teal to-smartmate-blue opacity-20"
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-br from-smartmate-lavender to-smartmate-pink opacity-20"
              animate={{
                scale: isHovered ? [1, 1.3, 1] : 1,
                rotate: isHovered ? -360 : 0,
              }}
              transition={{ duration: 3, repeat: isHovered ? Infinity : 0, delay: 0.5 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
