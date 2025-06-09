
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BookOpen, Plus, Loader2 } from "lucide-react";
import { useCreateQuiz, useCreateFlashcard } from "@/hooks/use-quiz-data";

interface CreateQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateQuizModal({ open, onOpenChange }: CreateQuizModalProps) {
  const [title, setTitle] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeTab, setActiveTab] = useState("flashcards");

  const createQuizMutation = useCreateQuiz();
  const createFlashcardMutation = useCreateFlashcard();

  // TODO: Replace with actual lectures from API
  const lectures = [
    "Introduction to React",
    "JavaScript Fundamentals", 
    "Advanced CSS",
    "Node.js Basics",
    "Database Design"
  ];

  const handleCreate = async () => {
    if (!selectedLecture) return;

    try {
      if (activeTab === "flashcards") {
        // TODO: This will create a real flashcard when backend is ready
        const newFlashcard = {
          title: title || `${selectedLecture} Flashcards`,
          cards: [
            { question: "Sample Question 1", answer: "Sample Answer 1" },
            { question: "Sample Question 2", answer: "Sample Answer 2" }
          ],
          lecture: selectedLecture
        };
        
        await createFlashcardMutation.mutateAsync(newFlashcard);
      } else {
        // TODO: This will create a real quiz when backend is ready
        const newQuiz = {
          title: title || `${selectedLecture} Quiz`,
          questions: [
            {
              question: "Sample quiz question?",
              options: ["Option A", "Option B", "Option C", "Option D"],
              correct: 0
            }
          ],
          lecture: selectedLecture
        };
        
        await createQuizMutation.mutateAsync(newQuiz);
      }
      
      // Reset form and close modal
      setTitle("");
      setSelectedLecture("");
      setCustomPrompt("");
      onOpenChange(false);
    } catch (error) {
      // Error is handled by the mutation hooks
      console.error("Failed to create:", error);
    }
  };

  const isLoading = createQuizMutation.isPending || createFlashcardMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-smartmate-teal to-smartmate-blue bg-clip-text text-transparent glow-effect">
            Create Study Material
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="flashcards" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-4">
            <Card className="border-smartmate-teal/20 bg-gradient-to-br from-smartmate-teal/5 to-smartmate-cyan/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-smartmate-teal" />
                  Generate Flashcards
                </CardTitle>
                <CardDescription>
                  Create interactive flashcards from your lecture content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="flashcard-title">Title (Optional)</Label>
                  <Input
                    id="flashcard-title"
                    placeholder="e.g., React Hooks Flashcards"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lecture-select">Select Lecture</Label>
                  <Select value={selectedLecture} onValueChange={setSelectedLecture}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a lecture" />
                    </SelectTrigger>
                    <SelectContent>
                      {lectures.map((lecture) => (
                        <SelectItem key={lecture} value={lecture}>
                          {lecture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-prompt">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="custom-prompt"
                    placeholder="e.g., Focus on definitions and key concepts..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            <Card className="border-smartmate-blue/20 bg-gradient-to-br from-smartmate-blue/5 to-smartmate-lavender/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-smartmate-blue" />
                  Generate Quiz
                </CardTitle>
                <CardDescription>
                  Create multiple-choice questions from your notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Title (Optional)</Label>
                  <Input
                    id="quiz-title"
                    placeholder="e.g., JavaScript Fundamentals Quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lecture-select-quiz">Select Lecture</Label>
                  <Select value={selectedLecture} onValueChange={setSelectedLecture}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a lecture" />
                    </SelectTrigger>
                    <SelectContent>
                      {lectures.map((lecture) => (
                        <SelectItem key={lecture} value={lecture}>
                          {lecture}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-prompt-quiz">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="custom-prompt-quiz"
                    placeholder="e.g., Focus on practical applications and code examples..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t border-smartmate-teal/20">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!selectedLecture || isLoading}
            className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create {activeTab === "flashcards" ? "Flashcards" : "Quiz"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
