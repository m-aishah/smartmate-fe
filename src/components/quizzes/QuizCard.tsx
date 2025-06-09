
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, CheckCircle, Brain } from "lucide-react";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    questions: Array<{ question: string; options: string[]; correct: number }>;
    createdAt: string;
    lecture: string;
  };
  onDownload: () => void;
  onStart: () => void;
  onPractice: () => void;
}

export function QuizCard({ quiz, onDownload, onStart, onPractice }: QuizCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="glass-card border-smartmate-blue/30 hover:border-smartmate-blue/50 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-smartmate-blue/5 to-smartmate-lavender/5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-smartmate-blue/5 to-smartmate-lavender/5"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-5 w-5 text-smartmate-blue" />
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-smartmate-blue to-smartmate-lavender bg-clip-text text-transparent">
                  {quiz.title}
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {quiz.lecture}
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm bg-smartmate-blue/10 border-smartmate-blue/30 text-smartmate-blue">
                  {quiz.questions.length} questions
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {new Date(quiz.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onDownload}
                className="h-10 w-10 p-0 hover:bg-smartmate-blue/10"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          <div className="space-y-4">
            <div className="bg-background/50 rounded-lg p-4 border border-smartmate-blue/20">
              <p className="text-sm font-medium text-smartmate-blue mb-2">
                Sample Question:
              </p>
              <p className="text-sm text-muted-foreground">
                {quiz.questions[0]?.question.substring(0, 80)}
                {quiz.questions[0]?.question.length > 80 ? "..." : ""}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-smartmate-blue hover:bg-smartmate-blue/90 text-white shadow-md hover:shadow-lg transition-all duration-200 h-12"
                onClick={onStart}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-smartmate-blue/30 hover:bg-smartmate-blue/10 text-smartmate-blue h-12 px-6"
                onClick={onPractice}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Practice
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Animated background elements */}
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-smartmate-blue/10"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-5 -left-5 w-12 h-12 rounded-full bg-smartmate-lavender/10"
          animate={{
            scale: isHovered ? 1.3 : 1,
            rotate: isHovered ? -90 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </Card>
    </motion.div>
  );
}
