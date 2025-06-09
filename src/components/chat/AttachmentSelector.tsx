
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLectures } from "@/hooks/api/use-lectures";
import { useSummaries } from "@/hooks/api/use-summaries";
import { 
  BookOpen, 
  FileText, 
  University, 
  ExternalLink,
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachmentSelectorProps {
  selectedItems: Set<string>;
  onItemSelect: (itemId: string, checked: boolean) => void;
  onAttachmentsChange: (attachments: string[]) => void;
}

export function AttachmentSelector({ 
  selectedItems, 
  onItemSelect, 
  onAttachmentsChange 
}: AttachmentSelectorProps) {
  const { data: lectures = [] } = useLectures();
  const { data: summaries = [] } = useSummaries();

  // Placeholder PDF file
  const placeholderFiles = [
    {
      id: "placeholder-pdf-1",
      title: "Lecture 1 Introduction to Digital Image Processing",
      type: "pdf",
      url: "https://smartmate-lecture-recordings.s3.eu-north-1.amazonaws.com/rag-documents/1.pdf",
      description: "Course material for digital image processing fundamentals"
    }
  ];

  const handleItemToggle = (itemId: string, checked: boolean) => {
    onItemSelect(itemId, checked);
    
    // Update attachments array
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    onAttachmentsChange(Array.from(newSelected));
  };

  return (
    <div className="bg-muted/30 rounded-lg border border-border/30 shadow-sm p-4 animate-fade-in">
      <Tabs defaultValue="files">
        <TabsList className="mb-4 grid grid-cols-4 bg-background/70 backdrop-blur-sm">
          <TabsTrigger value="files">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Files</span>
          </TabsTrigger>
          <TabsTrigger value="summaries">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Summaries</span>
          </TabsTrigger>
          <TabsTrigger value="courses">
            <University className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-2">
          <ScrollArea className="h-[300px] pr-3">
            <div className="space-y-2">
              {placeholderFiles.map((file) => (
                <Card key={file.id} className="bg-background/70 backdrop-blur-sm border hover:border-accent hover:shadow-md cursor-pointer transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-3 items-start">
                      <Checkbox
                        checked={selectedItems.has(file.id)}
                        onCheckedChange={(checked) => handleItemToggle(file.id, checked as boolean)}
                        className="mt-1"
                      />
                      <FileText className="h-5 w-5 text-smartmate-teal mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{file.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {file.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {file.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 mt-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, '_blank');
                          }}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="summaries" className="space-y-2">
          <ScrollArea className="h-[300px] pr-3">
            <div className="space-y-2">
              {summaries.length > 0 ? (
                summaries.map((summary) => (
                  <Card key={summary.id} className="bg-background/70 backdrop-blur-sm border hover:border-accent hover:shadow-md cursor-pointer transition-all">
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-start">
                        <Checkbox
                          checked={selectedItems.has(`summary-${summary.id}`)}
                          onCheckedChange={(checked) => handleItemToggle(`summary-${summary.id}`, checked as boolean)}
                          className="mt-1"
                        />
                        <BookOpen className="h-5 w-5 text-smartmate-blue mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium line-clamp-1">{summary.title}</span>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {summary.description || summary.brief}
                          </p>
                          <Badge variant="outline" className="text-xs mt-2">
                            Summary
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No summaries available</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="courses" className="space-y-2">
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="font-medium">Connect Your Moodle Account</p>
            <p className="text-sm mt-1">Course data will be available after connecting to Moodle</p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              Connect Moodle
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-2">
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <p className="font-medium">Connect Your Moodle Account</p>
            <p className="text-sm mt-1">Assignment data will be available after connecting to Moodle</p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              Connect Moodle
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedItems.size > 0 && (
        <div className="mt-4 p-3 bg-background/50 rounded-lg border border-smartmate-teal/20">
          <p className="text-sm font-medium text-smartmate-teal">
            {selectedItems.size} attachment{selectedItems.size > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
}
