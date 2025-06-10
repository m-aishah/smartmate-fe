import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Send,
  BookOpen,
  Mic,
  Paperclip,
  Brain,
  Sparkles,
  Bot,
  BookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/store/use-language";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { motion } from "framer-motion";
import { MascotAvatar } from "@/components/ui/mascot-avatar";
import { AttachmentSelector } from "@/components/chat/AttachmentSelector";
import { useSendMessage } from "@/hooks/api/use-chats";
import { useToast } from "@/hooks/ui/use-toast";

const NewChat = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialMessage = searchParams.get("message") || "";
  const isMobile = useIsMobile();

  const [message, setMessage] = useState(initialMessage);
  const [isThinking, setIsThinking] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [floatingOrbs, setFloatingOrbs] = useState(Array.from({ length: 5 }));

  const sendMessageMutation = useSendMessage();

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleItemSelect = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleAttachmentsChange = (attachments: string[]) => {
    setSelectedAttachments(attachments);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    // Collapse attachments when typing
    if (e.target.value && showAttachments) {
      setShowAttachments(false);
    }
  };

  const handleInputFocus = () => {
    // Collapse attachments when focusing input
    if (showAttachments) {
      setShowAttachments(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsThinking(true);

    try {
      // Extract document URL and summary from selected attachments
      let documentURL = null;
      let selectedSummary = null;

      selectedAttachments.forEach((attachmentId) => {
        if (attachmentId.startsWith("placeholder-pdf-")) {
          // This is a document
          documentURL =
            "https://smartmate-lecture-recordings.s3.eu-north-1.amazonaws.com/rag-documents/1.pdf";
        } else if (attachmentId.startsWith("summary-")) {
          // This is a summary
          selectedSummary = attachmentId.replace("summary-", "");
        }
      });

      // Prepare message data for backend - no chatId means new chat
      const messageData = {
        chatTitle: "New Chat", // Auto-generate title for new chats
        messages: [{ role: "user" as const, content: message }],
        systemPromptId: 1, // Default system prompt
        documentURL: documentURL,
        selectedSummary: selectedSummary,
      };

      console.log("Creating new chat with message:", messageData);

      // Send message to backend to create new chat
      const response = await sendMessageMutation.mutateAsync(messageData);

      console.log("Backend response:", response);

      // Navigate to the new chat
      if (response.id) {
        navigate(`/app/chats/${response.id}`);
      } else {
        throw new Error("No chat ID returned from server");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      toast({
        title: "Error",
        description: "Failed to create new chat. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsThinking(false);
    }
  };

  const suggestions = [
    {
      title: t("summarizeLecture"),
      message: "Can you summarize my thermodynamics lecture?",
      icon: BookText,
    },
    {
      title: t("keyConcepts"),
      message: "What are the key concepts from today's lecture?",
      icon: Brain,
    },
    {
      title: "Generate Practice Questions",
      message: "Generate practice questions from my latest lecture",
      icon: Sparkles,
    },
    {
      title: "Explain Complex Concept",
      message: "Explain quantum computing in simple terms",
      icon: Bot,
    },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] relative">
      {/* Enhanced 3D background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating 3D objects */}
        {floatingOrbs.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full backdrop-blur-3xl",
              index % 2 === 0 ? "bg-smartmate-teal/10" : "bg-smartmate-blue/10"
            )}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}%`,
              height: `${20 + Math.random() * 30}%`,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Digital circuit lines with animations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`h-line-${index}`}
              className="absolute h-[1px] w-full"
              style={{
                top: `${15 + index * 20}%`,
                background:
                  index % 2 === 0
                    ? "var(--smartmate-teal)"
                    : "var(--smartmate-blue)",
              }}
              initial={{ scaleX: 0, opacity: 0.3, x: "-100%" }}
              animate={{ scaleX: 1, opacity: 0.7, x: "0%" }}
              transition={{
                duration: 2,
                delay: index * 0.3,
                ease: "easeOut",
              }}
            />
          ))}

          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={`v-line-${index}`}
              className="absolute w-[1px] h-full"
              style={{
                left: `${25 + index * 25}%`,
                background:
                  index % 2 === 0
                    ? "var(--smartmate-blue)"
                    : "var(--smartmate-teal)",
              }}
              initial={{ scaleY: 0, opacity: 0.3, y: "-100%" }}
              animate={{ scaleY: 1, opacity: 0.7, y: "0%" }}
              transition={{
                duration: 2,
                delay: 1 + index * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="flex flex-col items-center max-w-xl w-full text-center space-y-8">
          {/* Replace 3D Robot avatar with mascot */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/30 via-smartmate-cyan/30 to-smartmate-blue/30 rounded-full blur-xl animate-pulse-slow"></div>
            <MascotAvatar size="xl" animate={true} className="relative z-10" />
          </motion.div>

          {/* Title with animated reveal */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold font-orbitron mb-2 smartmate-text-gradient glow-effect">
              {t("askSmartMate")}
            </h1>

            <p className="text-muted-foreground max-w-md">
              {t("newChatDescription")}
            </p>
          </motion.div>

          {/* Enhanced chat input */}
          <motion.div
            className="w-full max-w-md flex flex-col gap-6 mt-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/20 via-accent/10 to-smartmate-blue/20 rounded-2xl blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <div className="relative bg-secondary/30 backdrop-blur-xl rounded-2xl border border-smartmate-teal/30 shadow-lg group hover:border-smartmate-teal/50 transition-all duration-300">
                <div className="flex items-center h-16 px-6">
                  <Input
                    ref={inputRef}
                    placeholder={t("askAboutLectures")}
                    value={message}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="flex-1 bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground/70 text-sm h-full"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="mr-2 p-2"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isThinking}
                    className={cn(
                      "h-10 w-10 p-0 rounded-full shrink-0",
                      message.trim()
                        ? "bg-gradient-to-r from-smartmate-teal to-smartmate-cyan text-white hover:opacity-90"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isThinking ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Attachments selector */}
            {showAttachments && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <AttachmentSelector
                  selectedItems={selectedItems}
                  onItemSelect={handleItemSelect}
                  onAttachmentsChange={handleAttachmentsChange}
                />
              </motion.div>
            )}

            {/* Suggestion chips with staggered animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => setMessage(suggestion.message)}
                  className="text-sm bg-background/50 backdrop-blur-md border border-smartmate-teal/20 rounded-xl p-4 flex items-center gap-3 hover:bg-background/70 hover:border-smartmate-teal/40 transition-all duration-300 group text-left"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <motion.div
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-blue/20 flex items-center justify-center shrink-0"
                    whileHover={{ rotate: 5 }}
                  >
                    <suggestion.icon className="h-5 w-5 text-smartmate-teal group-hover:text-smartmate-cyan transition-colors duration-300" />
                  </motion.div>
                  <span className="font-medium">{suggestion.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Feature badges with staggered animation */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {[
                { icon: BookOpen, text: "Lecture Summarization" },
                { icon: Mic, text: "Audio Transcription" },
                { icon: Paperclip, text: "File Analysis" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="px-3 py-1 rounded-full bg-background/50 border border-smartmate-teal/20 text-xs flex items-center gap-1.5"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <badge.icon className="h-3 w-3 text-accent" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
