
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/store/use-language";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { AttachmentSelector } from "@/components/chat/AttachmentSelector";
import { useChat } from "@/hooks/api/use-chats";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

const ChatDetail = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  
  // Use the real chat hook
  const { data: chat, isLoading, error } = useChat(chatId || "");

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

  // Function to collapse attachments (will be passed to ChatInterface)
  const handleTypingStarted = () => {
    if (attachmentOpen) {
      setAttachmentOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full p-6">
        <Helmet>
          <title>SmartMate | {t("loading")}</title>
        </Helmet>
        <LoadingSkeleton className="h-8 w-64 mb-4" />
        <LoadingSkeleton className="h-32 w-full mb-4" />
        <div className="flex-1">
          <LoadingSkeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  if (error || !chat) {
    return (
      <div className="flex flex-col h-full">
        <Helmet>
          <title>SmartMate | {t("error")}</title>
        </Helmet>
        
        <div className="flex items-center p-3 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/app/chats')}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">{t("error")}</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">{t("error")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("somethingWentWrong")}
            </p>
            <Button onClick={() => navigate('/app/chats')}>
              {t("back")}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <Helmet>
        <title>{`SmartMate | ${chat.title || t("chat")}`}</title>
        <meta name="description" content="Smart academic assistant for university students" />
      </Helmet>
      
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/app/chats')}
            className="mr-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold line-clamp-1">{chat.title || t("chat")}</h1>
            <p className="text-xs text-muted-foreground">
              {new Date(chat.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
            onClick={() => setAttachmentOpen(!attachmentOpen)}
          >
            <Paperclip className="h-4 w-4" />
            <span>{t("attachments")}</span>
            {selectedItems.size > 0 && (
              <Badge variant="secondary" className="ml-1">{selectedItems.size}</Badge>
            )}
          </Button>
          
          <Button
            variant="outline" 
            size="icon"
            className="md:hidden"
            onClick={() => setAttachmentOpen(!attachmentOpen)}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {attachmentOpen && (
        <div className="mx-3 mt-3">
          <AttachmentSelector
            selectedItems={selectedItems}
            onItemSelect={handleItemSelect}
            onAttachmentsChange={handleAttachmentsChange}
          />
        </div>
      )}
      
      <div className="flex-1 min-h-0">
        <ChatInterface 
          chatId={chatId}
          selectedAttachments={selectedAttachments}
          onTypingStarted={handleTypingStarted}
        />
      </div>
    </div>
  );
};

export default ChatDetail;
