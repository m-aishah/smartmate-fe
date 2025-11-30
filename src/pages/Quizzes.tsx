import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { motion } from "framer-motion";
import PageHeader from "@/components/layout/PageHeader";
import { Plus, BookOpen, Zap, Loader2 } from "lucide-react";
import { CreateQuizModal } from "@/components/quizzes/CreateQuizModal";
import { FlashcardFan } from "@/components/quizzes/FlashcardFan";
import { QuizCard } from "@/components/quizzes/QuizCard";
import { FlashcardStudyModal } from "@/components/quizzes/FlashcardStudyModal";
import { QuizTakeModal } from "@/components/quizzes/QuizTakeModal";
import { useQuizzes, useFlashcards } from "@/hooks/use-quiz-data";
import { Quiz, Flashcard } from "@/services/QuizService";

const Quizzes = () => {
  const { t } = useLanguage();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  
  // API integration
  const { data: quizzes = [], isLoading: quizzesLoading, error: quizzesError } = useQuizzes();
  const { data: flashcards = [], isLoading: flashcardsLoading, error: flashcardsError } = useFlashcards();

  const ErrorMessage = ({ message = "An error occurred, try again later" }: { message?: string }) => (
    <div className="flex items-center justify-center py-12 text-center">
      <div className="space-y-2">
        <p className="text-destructive text-sm font-medium">{message}</p>
        <p className="text-muted-foreground text-xs">Please refresh the page or try again later</p>
      </div>
    </div>
  );

  const handleDownloadFlashcard = (flashcard: Flashcard) => {
    console.log("Downloading flashcard:", flashcard.title);
    const content = flashcard.cards.map(card => 
      `Q: ${card.question}\nA: ${card.answer}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${flashcard.title}-flashcards.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadQuiz = (quiz: Quiz) => {
    console.log("Downloading quiz:", quiz.title);
    const content = quiz.questions.map((q, i) => 
      `${i + 1}. ${q.question}\n${q.options.map((opt, j) => `${String.fromCharCode(97 + j)}) ${opt}`).join('\n')}\nCorrect: ${String.fromCharCode(97 + q.correct)}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quiz.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStudyFlashcard = (flashcard: Flashcard) => {
    console.log("Starting flashcard study:", flashcard.title);
    setSelectedFlashcard(flashcard);
    setStudyModalOpen(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    console.log("Starting quiz:", quiz.title);
    setSelectedQuiz(quiz);
    setIsPracticeMode(false);
    setQuizModalOpen(true);
  };

  const handlePracticeQuiz = (quiz: Quiz) => {
    console.log("Starting quiz practice:", quiz.title);
    setSelectedQuiz(quiz);
    setIsPracticeMode(true);
    setQuizModalOpen(true);
  };

  const isLoading = quizzesLoading || flashcardsLoading;

  return (
    <>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 bg-gradient-to-r from-smartmate-teal/10 via-smartmate-blue/10 to-smartmate-lavender/10 rounded-2xl border border-smartmate-teal/20">
          <div className="flex-1">
            <PageHeader title={t("studyTools")} subtitle={t("studyToolsDescription")} />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              onClick={() => setCreateModalOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t("createNew")}
            </Button>
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-smartmate-teal" />
            <span className="ml-2 text-muted-foreground">{t("loadingStudyMaterials")}</span>
          </div>
        )}

        {/* Error State */}
        {(quizzesError || flashcardsError) && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
            <p className="text-destructive">{t("failedToLoadStudyMaterials")}</p>
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Flashcards Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="portal-card border-smartmate-teal/30 bg-gradient-to-br from-smartmate-teal/10 to-smartmate-cyan/10 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl smartmate-text-gradient">
                    <div className="p-3 rounded-full bg-smartmate-teal/20">
                      <Zap className="h-7 w-7 text-smartmate-teal" />
                    </div>
                    {t("flashcards")}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {t("flashcardsDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  {flashcardsError ? (
                    <ErrorMessage message="Failed to load flashcards" />
                  ) : flashcards.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>{t("noFlashcardsYet")}</p>
                    </div>
                  ) : (
                    flashcards.map((flashcard, index) => (
                      <motion.div
                        key={flashcard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-background/80 to-smartmate-teal/5 border border-smartmate-teal/20"
                      >
                        <FlashcardFan 
                          flashcard={flashcard}
                          onDownload={() => handleDownloadFlashcard(flashcard)}
                          onStudy={() => handleStudyFlashcard(flashcard)}
                        />
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quizzes Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-8"
            >
              <Card className="portal-card border-smartmate-blue/30 bg-gradient-to-br from-smartmate-blue/10 to-smartmate-lavender/10 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl smartmate-text-gradient">
                    <div className="p-3 rounded-full bg-smartmate-blue/20">
                      <BookOpen className="h-7 w-7 text-smartmate-blue" />
                    </div>
                    {t("quizzes")}
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {t("quizzesDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 p-6">
                  {quizzesError ? (
                    <ErrorMessage message="Failed to load quizzes" />
                  ) : quizzes.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>{t("noQuizzesYet")}</p>
                    </div>
                  ) : (
                    quizzes.map((quiz, index) => (
                      <motion.div
                        key={quiz.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.7, duration: 0.4 }}
                        className="p-6 rounded-xl bg-gradient-to-br from-background/80 to-smartmate-blue/5 border border-smartmate-blue/20"
                      >
                        <QuizCard 
                          quiz={quiz}
                          onDownload={() => handleDownloadQuiz(quiz)}
                          onStart={() => handleStartQuiz(quiz)}
                          onPractice={() => handlePracticeQuiz(quiz)}
                        />
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>

      {/* Modals - render outside the scrollable container */}
      <CreateQuizModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {selectedFlashcard && (
        <FlashcardStudyModal
          open={studyModalOpen}
          onOpenChange={(open) => {
            setStudyModalOpen(open);
            if (!open) {
              setSelectedFlashcard(null);
            }
          }}
          flashcard={selectedFlashcard}
        />
      )}

      {selectedQuiz && (
        <QuizTakeModal
          open={quizModalOpen}
          onOpenChange={(open) => {
            setQuizModalOpen(open);
            if (!open) {
              setSelectedQuiz(null);
            }
          }}
          quiz={selectedQuiz}
          isPracticeMode={isPracticeMode}
        />
      )}
    </>
  );
};

export default Quizzes;
