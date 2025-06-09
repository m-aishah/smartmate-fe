
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUpdateLecture } from "@/hooks/api/use-lectures";
import { Lecture } from "@/services/types/lecture.types";
import { Loader2 } from "lucide-react";

interface EditLectureModalProps {
  lecture: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLectureModal({ lecture, open, onOpenChange }: EditLectureModalProps) {
  const [formData, setFormData] = useState({
    lectureTitle: "",
    lectureDescription: "",
    isFavourite: 0 as 0 | 1,
    isPinned: 0 as 0 | 1,
    isArchived: 0 as 0 | 1
  });

  const updateLectureMutation = useUpdateLecture();

  // Reset form when lecture changes
  useEffect(() => {
    if (lecture) {
      setFormData({
        lectureTitle: lecture.title || "",
        lectureDescription: lecture.description || "",
        isFavourite: lecture.isFavourite === 1 ? 1 : 0,
        isPinned: 0, // Default to 0 since not in current lecture type
        isArchived: 0 // Default to 0 since not in current lecture type
      });
    }
  }, [lecture]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lecture) return;

    updateLectureMutation.mutate({
      id: lecture.id.toString(),
      data: formData
    }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  const handleInputChange = (field: string, value: string | (0 | 1)) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card z-[60]">
        <DialogHeader>
          <DialogTitle className="smartmate-text-gradient">Edit Lecture</DialogTitle>
          <DialogDescription>
            Update the lecture details below. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.lectureTitle}
              onChange={(e) => handleInputChange("lectureTitle", e.target.value)}
              placeholder="Enter lecture title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.lectureDescription}
              onChange={(e) => handleInputChange("lectureDescription", e.target.value)}
              placeholder="Enter lecture description"
              rows={3}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label htmlFor="favorite">Mark as Favorite</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="favorite"
                  checked={formData.isFavourite === 1}
                  onCheckedChange={(checked) => handleInputChange("isFavourite", checked ? 1 : 0)}
                />
                <span className="text-sm text-muted-foreground">
                  {formData.isFavourite === 1 ? "Favorited" : "Not favorited"}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={updateLectureMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updateLectureMutation.isPending}
              className="bg-smartmate-teal hover:bg-smartmate-teal/90"
            >
              {updateLectureMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
