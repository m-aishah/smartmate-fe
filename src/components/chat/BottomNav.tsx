
import { SendHorizontal, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/store/use-language";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export function BottomNav() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Generate a random chat ID if starting a new chat
      const chatId = Date.now().toString();
      navigate(`/app/chats/${chatId}`);
    } else {
      // If no message, just go to new chat page
      navigate('/app/chats/new');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl md:hidden">
      <div className="relative">        
        {/* Chat Input - Full Width */}
        <div className="relative">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-smartmate-teal/20 via-accent/10 to-smartmate-blue/20 rounded-2xl blur-xl"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: isFocused ? [0.7, 0.9, 0.7] : [0.5, 0.7, 0.5],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <div className="relative glass rounded-2xl border border-border/20 shadow-lg">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end px-6 py-4 gap-4"
            >
              <Bot className="h-6 w-6 text-smartmate-teal flex-shrink-0 mb-1" />
              <Textarea
                placeholder={t("whatDoYouWantToLearn")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground/70 text-base resize-none min-h-[3rem] max-h-[8rem] focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
              />
              <AnimatePresence>
                {message.trim() && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="h-12 w-12 p-0 rounded-full text-accent hover:text-accent/80 bg-accent/10 flex-shrink-0"
                    >
                      <SendHorizontal className="h-6 w-6" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
