
import { useLanguage } from "@/hooks/store/use-language";
import { ChatList } from "@/components/chat/ChatList";
import { BottomNav } from "@/components/chat/BottomNav";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useChats } from "@/hooks/api/use-chats";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { format } from "date-fns";

const Chats = () => {
  const { t } = useLanguage();
  const { data: chats, isLoading, error } = useChats();
  
  // Transform backend data to match ChatList expected format
  const transformedChats = chats?.map(chat => ({
    id: chat.id.toString(), // Convert number to string for routing
    title: chat.title,
    preview: chat.description || t("noDescription"),
    timestamp: format(new Date(chat.createdAt), "MMM d"),
    unread: false // You can implement unread logic based on your backend
  })) || [];

  if (isLoading) {
    return (
      <div className="space-y-6 pb-24">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("chats")}</h1>
          <Button disabled className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("newChat")}
          </Button>
        </div>
        <LoadingSkeleton />
        <BottomNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 pb-24">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("chats")}</h1>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/app/chats/new">
              <Button className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white hover:opacity-90 transition-opacity">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("newChat")}
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <p className="text-red-500">{t("error")}: {error.message}</p>
          <Link to="/app/chats/new">
            <Button className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white hover:opacity-90 transition-opacity">
              {t("startFirstChat")}
            </Button>
          </Link>
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("chats")}</h1>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/app/chats/new">
            <Button className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white hover:opacity-90 transition-opacity">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("newChat")}
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {transformedChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <PlusCircle className="h-8 w-8 text-muted-foreground" />
            </motion.div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{t("noChats")}</h3>
            <p className="text-muted-foreground max-w-md">{t("startNewChat")}</p>
          </div>
          <Link to="/app/chats/new">
            <Button className="mt-4 bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white hover:opacity-90 transition-opacity">
              {t("startFirstChat")}
            </Button>
          </Link>
        </div>
      ) : (
        <ChatList chats={transformedChats} />
      )}
      
      <BottomNav />
    </div>
  );
};

export default Chats;
