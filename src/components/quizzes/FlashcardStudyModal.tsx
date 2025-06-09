
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, ChevronLeft, ChevronRight, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardStudyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flashcard: {
    id: string;
    title: string;
    cards: Array<{ question: string; answer: string }>;
    createdAt: string;
    lecture: string;
  };
}

export function FlashcardStudyModal({ open, onOpenChange, flashcard }: FlashcardStudyModalProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const nextCard = () => {
    if (showAnswer) {
      setCompletedCards(prev => new Set([...prev, currentCard]));
    }
    setCurrentCard((prev) => (prev + 1) % flashcard.cards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcard.cards.length) % flashcard.cards.length);
    setShowAnswer(false);
  };

  const resetStudy = () => {
    setCurrentCard(0);
    setShowAnswer(false);
    setCompletedCards(new Set());
  };

  const progress = (completedCards.size / flashcard.cards.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-background/90 backdrop-blur-xl border-b border-smartmate-teal/20 p-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-smartmate-teal/20">
                  <BookOpen className="h-5 w-5 text-smartmate-teal" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg bg-gradient-to-r from-smartmate-teal to-smartmate-blue bg-clip-text text-transparent">
                    {flashcard.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">{flashcard.lecture}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={resetStudy} className="hover:bg-smartmate-teal/10">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="hover:bg-smartmate-teal/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Card {currentCard + 1} of {flashcard.cards.length}
                </span>
                <span className="text-muted-foreground">
                  Progress: {completedCards.size}/{flashcard.cards.length} completed
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Main Card Area */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
            <motion.div
              className="w-full max-w-2xl cursor-pointer"
              onClick={handleCardClick}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-smartmate-teal/40 hover:border-smartmate-teal/60 transition-all duration-300 bg-gradient-to-br from-background/95 to-smartmate-teal/10 shadow-xl min-h-[300px]">
                <CardContent className="flex flex-col justify-center items-center p-6 text-center min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentCard}-${showAnswer ? 'answer' : 'question'}`}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full space-y-6"
                    >
                      <div className="mb-4">
                        <span className={cn(
                          "text-sm font-medium px-4 py-2 rounded-full border-2",
                          showAnswer 
                            ? "bg-smartmate-blue/20 text-smartmate-blue border-smartmate-blue/40" 
                            : "bg-smartmate-teal/20 text-smartmate-teal border-smartmate-teal/40"
                        )}>
                          {showAnswer ? "Answer" : "Question"}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-lg leading-relaxed font-medium">
                          {showAnswer 
                            ? flashcard.cards[currentCard].answer 
                            : flashcard.cards[currentCard].question
                          }
                        </p>
                        
                        {!showAnswer && (
                          <motion.p 
                            className="text-sm text-muted-foreground"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Click to reveal answer
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-background/90 backdrop-blur-xl border-t border-smartmate-teal/20 p-4 shrink-0">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevCard}
                disabled={flashcard.cards.length <= 1}
                className="flex items-center gap-2 border-smartmate-teal/30 hover:bg-smartmate-teal/10"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                {flashcard.cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentCard(index);
                      setShowAnswer(false);
                    }}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-200",
                      index === currentCard
                        ? "bg-smartmate-teal scale-125 shadow-lg"
                        : completedCards.has(index)
                          ? "bg-smartmate-blue shadow-md"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextCard}
                disabled={flashcard.cards.length <= 1}
                className="flex items-center gap-2 border-smartmate-teal/30 hover:bg-smartmate-teal/10"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
