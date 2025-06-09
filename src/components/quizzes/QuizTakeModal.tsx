
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, X, Brain, Trophy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: {
    id: string;
    title: string;
    questions: Array<{ question: string; options: string[]; correct: number }>;
    createdAt: string;
    lecture: string;
  };
  isPracticeMode: boolean;
}

export function QuizTakeModal({ open, onOpenChange, quiz, isPracticeMode }: QuizTakeModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isPracticeMode ? null : 30 * quiz.questions.length);
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isPracticeMode && timeLeft !== null && timeLeft > 0 && !isFinished && open) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 1) {
            setIsFinished(true);
            setShowResults(true);
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isFinished, isPracticeMode, open]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isFinished) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (isPracticeMode) {
      setShowResults(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowResults(false);
    } else {
      setIsFinished(true);
      setShowResults(true);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setIsFinished(false);
    setShowResults(false);
    setTimeLeft(isPracticeMode ? null : 30 * quiz.questions.length);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quiz.questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-background/90 backdrop-blur-xl border-b border-smartmate-blue/20 p-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-smartmate-blue/20">
                  <Brain className="h-5 w-5 text-smartmate-blue" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg bg-gradient-to-r from-smartmate-blue to-smartmate-lavender bg-clip-text text-transparent">
                    {quiz.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{quiz.lecture}</p>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      isPracticeMode ? "bg-smartmate-teal/10 border-smartmate-teal/30 text-smartmate-teal" : "bg-smartmate-blue/10 border-smartmate-blue/30 text-smartmate-blue"
                    )}>
                      {isPracticeMode ? "Practice Mode" : "Quiz Mode"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isPracticeMode && timeLeft !== null && (
                  <div className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full border-2 text-sm",
                    timeLeft < 60 ? "bg-red-500/10 border-red-500/40 text-red-500" : "bg-smartmate-blue/10 border-smartmate-blue/40 text-smartmate-blue"
                  )}>
                    <Clock className="h-4 w-4" />
                    <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="hover:bg-smartmate-blue/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                {isFinished && (
                  <span className="text-muted-foreground">
                    Score: {score}/{quiz.questions.length} ({percentage}%)
                  </span>
                )}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            {!isFinished ? (
              <motion.div className="w-full max-w-2xl">
                <Card className="border-smartmate-blue/40 bg-gradient-to-br from-background/95 to-smartmate-blue/10 shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 leading-relaxed">
                        {quiz.questions[currentQuestion].question}
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {quiz.questions[currentQuestion].options.map((option, index) => {
                        const isSelected = selectedAnswers[currentQuestion] === index;
                        const isCorrect = index === quiz.questions[currentQuestion].correct;
                        const showFeedback = isPracticeMode && showResults && selectedAnswers[currentQuestion] !== null;
                        
                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={cn(
                              "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                              isSelected && !showFeedback && "border-smartmate-blue bg-smartmate-blue/15",
                              showFeedback && isCorrect && "border-green-500 bg-green-500/15 text-green-700",
                              showFeedback && !isCorrect && isSelected && "border-red-500 bg-red-500/15 text-red-700",
                              !isSelected && !showFeedback && "border-border hover:border-smartmate-blue/50 hover:bg-smartmate-blue/5"
                            )}
                            whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={showFeedback}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold",
                                isSelected && !showFeedback && "border-smartmate-blue bg-smartmate-blue text-white",
                                showFeedback && isCorrect && "border-green-500 bg-green-500 text-white",
                                showFeedback && !isCorrect && isSelected && "border-red-500 bg-red-500 text-white",
                                !isSelected && !showFeedback && "border-muted-foreground/30"
                              )}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span className="text-sm">{option}</span>
                              {showFeedback && isCorrect && (
                                <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {isPracticeMode && showResults && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-lg bg-muted/50 border-2 border-muted-foreground/20"
                      >
                        <p className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> The correct answer is{" "}
                          <strong>{quiz.questions[currentQuestion].options[quiz.questions[currentQuestion].correct]}</strong>
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Card className="border-smartmate-blue/40 bg-gradient-to-br from-background/95 to-smartmate-blue/10 shadow-xl p-8">
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center shadow-lg",
                        percentage >= 70 ? "bg-green-500/20 text-green-500 border-2 border-green-500/40" : 
                        percentage >= 50 ? "bg-yellow-500/20 text-yellow-500 border-2 border-yellow-500/40" : 
                        "bg-red-500/20 text-red-500 border-2 border-red-500/40"
                      )}>
                        <Trophy className="h-8 w-8" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Quiz Complete!</h3>
                      <p className="text-lg text-muted-foreground mb-3">
                        You scored <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong> questions
                      </p>
                      <p className="text-3xl font-bold mt-3 bg-gradient-to-r from-smartmate-blue to-smartmate-lavender bg-clip-text text-transparent">
                        {percentage}%
                      </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2 border-smartmate-blue/40 hover:bg-smartmate-blue/10">
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                      </Button>
                      <Button onClick={() => onOpenChange(false)} className="bg-gradient-to-r from-smartmate-blue to-smartmate-lavender">
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Navigation Controls */}
          {!isFinished && (
            <div className="bg-background/90 backdrop-blur-xl border-t border-smartmate-blue/20 p-4 shrink-0">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="border-smartmate-blue/30 hover:bg-smartmate-blue/10"
                >
                  Previous
                </Button>

                <div className="text-sm text-muted-foreground">
                  {selectedAnswers[currentQuestion] !== null ? "Answer selected" : "Select an answer"}
                </div>

                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={finishQuiz}
                    disabled={!isPracticeMode && selectedAnswers[currentQuestion] === null}
                    className="bg-gradient-to-r from-smartmate-blue to-smartmate-lavender"
                  >
                    Finish Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    disabled={(!isPracticeMode && selectedAnswers[currentQuestion] === null) || (isPracticeMode && !showResults)}
                    className="bg-gradient-to-r from-smartmate-blue to-smartmate-lavender"
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
