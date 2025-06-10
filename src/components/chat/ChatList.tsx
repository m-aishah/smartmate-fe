
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/store/use-language";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatItem {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
}

interface ChatListProps {
  chats: ChatItem[];
}

export function ChatList({ chats }: ChatListProps) {
  const { t } = useLanguage();

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 animate-pulse-slow">
          <MessageSquare className="h-8 w-8 text-accent/70" />
        </div>
        <p className="text-foreground font-medium mb-2">
          {t("noChatsYet")}
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          {t("startNewChatMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chats.map((chat, index) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link
            to={`/app/chats/${chat.id}`}
            className="block h-full"
          >
            <div className="h-full glass-card overflow-hidden backdrop-blur-md border-border/30 rounded-xl p-5 flex flex-col hover:shadow-lg transition-all duration-300 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-smartmate-blue/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-smartmate-teal/80" />
                </div>
                {chat.unread && (
                  <span className="h-3 w-3 rounded-full bg-smartmate-teal animate-pulse"></span>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2 font-orbitron">{chat.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                {chat.preview}
              </p>
              
              <div className="mt-4 text-xs text-muted-foreground font-medium">
                {chat.timestamp}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
