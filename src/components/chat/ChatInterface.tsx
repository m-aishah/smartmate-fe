
import { useRef, useEffect, useState } from "react";
import { SendHorizontal, Bot, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "./ChatMessage";
import { useLanguage } from "@/hooks/store/use-language";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/ui/use-toast";
import { useLayoutStore } from "@/hooks/store/use-layout-store";
import { useSendMessage, useChat } from "@/hooks/api/use-chats";
import { useNavigate } from "react-router-dom";
import type { ChatMessage as BackendChatMessage } from "@/services/types/chat.types";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  isError?: boolean;
  subject?: string;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

interface ChatInterfaceProps {
  chatId?: string;
  selectedAttachments?: string[];
  onTypingStarted?: () => void;
}

// Type guard to ensure proper role mapping
const mapRoleToSender = (role: string): "user" | "assistant" => {
  return role === 'user' ? 'user' : 'assistant';
};

export function ChatInterface({ chatId, selectedAttachments = [], onTypingStarted }: ChatInterfaceProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { sidebarOpen: navExpanded } = useLayoutStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Use real chat data if chatId exists
  const { data: chatData, refetch: refetchChat } = useChat(chatId || "");
  const sendMessageMutation = useSendMessage();
  
  // Load chat messages when chatData is available
  useEffect(() => {
    if (chatData?.messages && chatData.messages.length > 0) {
      console.log("Loading chat messages from database:", chatData.messages);
      const formattedMessages: Message[] = chatData.messages.map((msg: BackendChatMessage, index: number) => {
        const isError = msg.content.startsWith('🚫') || (msg as any).error;
        return {
          id: msg.id || `msg-${index}-${Date.now()}`, // Generate ID if missing
          content: msg.content,
          sender: mapRoleToSender(msg.role),
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(chatData.createdAt), // Use chat creation date as fallback
          subject: msg.subject,
          isError: isError
        };
      });
      setMessages(formattedMessages);
    } else if (!chatId && messages.length === 0) {
      // Only show welcome message for new chats (no chatId)
      const welcomeMessages = [
        "Hello! I'm your SmartMate academic assistant. How can I help with your studies today?",
        "Welcome to SmartMate! I can help with homework, exam prep, or understanding difficult concepts.",
        "Hi there! Need help with your coursework or research? I'm here to assist you."
      ];
      
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      
      addMessage({
        content: randomWelcome,
        sender: "assistant",
        subject: "Introduction"
      });
    }
  }, [chatData, chatId]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);
  
  const addMessage = (messageData: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Call onTypingStarted when user starts typing
    if (e.target.value && onTypingStarted) {
      onTypingStarted();
    }
  };

  const handleInputFocus = () => {
    // Also collapse when user focuses on input
    if (onTypingStarted) {
      onTypingStarted();
    }
  };

  const handleRetryMessage = async (messageIndex: number) => {
    // Find the user message that led to this error
    let userMessageContent = "";
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages[i].sender === "user") {
        userMessageContent = messages[i].content;
        break;
      }
    }

    if (!userMessageContent) return;

    console.log("Retrying message:", userMessageContent);
    
    setIsTyping(true);
    
    try {
      // Extract document URL and summary from selected attachments
      let documentURL = null;
      let selectedSummary = null;
      
      selectedAttachments.forEach(attachmentId => {
        if (attachmentId.startsWith('placeholder-pdf-')) {
          documentURL = "https://smartmate-lecture-recordings.s3.eu-north-1.amazonaws.com/rag-documents/1.pdf";
        } else if (attachmentId.startsWith('summary-')) {
          selectedSummary = attachmentId.replace('summary-', '');
        }
      });

      // Prepare message data for backend
      const messageData = {
        chatId: chatId ? parseInt(chatId) : undefined,
        chatTitle: chatId ? undefined : t("newChat"),
        messages: [
          { role: 'user' as const, content: userMessageContent }
        ],
        systemPromptId: 1,
        attachments: selectedAttachments,
        documentURL: documentURL,
        selectedSummary: selectedSummary
      };

      // Send message to backend
      const response = await sendMessageMutation.mutateAsync(messageData);
      
      console.log("Retry response:", response);
      
      // Refresh the chat data to get updated messages
      if (chatId) {
        refetchChat();
      }
      
    } catch (error) {
      console.error("Error retrying message:", error);
      toast({
        title: t("error"),
        description: t("somethingWentWrong"),
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input;
    
    // Add user message immediately to UI
    addMessage({
      content: userMessage,
      sender: "user",
    });
    
    console.log("Sending message to chat:", chatId, "with attachments:", selectedAttachments);
    
    setInput("");
    setIsTyping(true);
    
    try {
      // Extract document URL and summary from selected attachments
      let documentURL = null;
      let selectedSummary = null;
      
      selectedAttachments.forEach(attachmentId => {
        if (attachmentId.startsWith('placeholder-pdf-')) {
          documentURL = "https://smartmate-lecture-recordings.s3.eu-north-1.amazonaws.com/rag-documents/1.pdf";
        } else if (attachmentId.startsWith('summary-')) {
          selectedSummary = attachmentId.replace('summary-', '');
        }
      });

      // Prepare message data for backend
      const messageData = {
        chatId: chatId ? parseInt(chatId) : undefined,
        chatTitle: chatId ? undefined : t("newChat"),
        messages: [
          { role: 'user' as const, content: userMessage }
        ],
        systemPromptId: 1,
        attachments: selectedAttachments,
        documentURL: documentURL,
        selectedSummary: selectedSummary
      };

      // Send message to backend
      const response = await sendMessageMutation.mutateAsync(messageData);
      
      console.log("Backend response:", response);
      
      // If this was for an existing chat, refetch the chat data to get updated messages
      if (chatId) {
        refetchChat();
      } else {
        // Add AI response to messages for new chats
        if (response.aiReply) {
          addMessage({
            content: response.aiReply.content,
            sender: "assistant",
            subject: "AI Assistant",
            isError: response.aiReply.content.startsWith('🚫')
          });
        }
        
        // If this was a new chat, navigate to the chat detail page
        if (response.id) {
          navigate(`/app/chats/${response.id}`);
        }
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({
        content: t("somethingWentWrong"),
        sender: "assistant",
        isError: true
      });
      
      toast({
        title: t("error"),
        description: t("somethingWentWrong"),
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[15%] right-[25%] w-[20%] h-[20%] rounded-full bg-smartmate-teal/5 blur-[60px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-[25%] left-[15%] w-[18%] h-[25%] rounded-full bg-smartmate-blue/4 blur-[60px]"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 15, 
            delay: 2,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      {/* Messages Container */}
      <div className={cn(
        "flex-1 overflow-y-auto relative z-10",
        "px-4 py-4 pb-32"
      )}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Bot className="h-12 w-12 mx-auto mb-4 text-smartmate-teal/40" />
              <p>{t("startConversation")}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div 
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatMessage 
                    message={message} 
                    onRetry={message.isError ? () => handleRetryMessage(index) : undefined}
                  />
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-2 items-start"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-blue/20 flex items-center justify-center border border-smartmate-teal/30">
                    <div className="h-3 w-3 rounded-full bg-smartmate-teal/60 animate-pulse"></div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm border border-border/20 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-smartmate-teal/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-smartmate-teal/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-smartmate-teal/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Floating message input */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Glowing background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/20 via-accent/10 to-smartmate-blue/20 rounded-2xl blur-xl"
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            {/* Message input container */}
            <div className="relative bg-background/95 backdrop-blur-sm border border-border/30 rounded-2xl shadow-2xl">
              <form onSubmit={handleSendMessage} className="flex items-end p-4 gap-3">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={t("typeAMessage")}
                    className="resize-none border-0 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/70 text-base min-h-[48px] max-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-hide"
                    rows={1}
                  />
                </div>
                <AnimatePresence>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: input.trim() ? 1 : 0.9, 
                      opacity: input.trim() ? 1 : 0.6 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!input.trim() || isTyping || sendMessageMutation.isPending}
                      className="h-12 w-12 rounded-xl bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex-shrink-0"
                    >
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
