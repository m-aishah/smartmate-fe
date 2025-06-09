
import { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
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

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  studyMode: "normal" | "focused" | "exam";
  setStudyMode: (mode: "normal" | "focused" | "exam") => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [studyMode, setStudyMode] = useState<"normal" | "focused" | "exam">("normal");

  // Add a message to the chat
  const addMessage = (messageData: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };
  
  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    messages,
    addMessage,
    clearMessages,
    isTyping,
    setIsTyping,
    studyMode,
    setStudyMode,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  
  return context;
}
