
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteLecture } from "@/hooks/api/use-lectures";
import { Lecture } from "@/services/types/lecture.types";
import { Trash2 } from "lucide-react";

interface DeleteLectureDialogProps {
  lecture: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLectureDialog({ lecture, open, onOpenChange }: DeleteLectureDialogProps) {
  const deleteLectureMutation = useDeleteLecture();

  const handleDelete = () => {
    if (!lecture) return;
    
    deleteLectureMutation.mutate(lecture.id.toString(), {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-card border-red-500/20">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-red-600 dark:text-red-400">
                Delete Lecture
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Are you sure you want to delete this lecture?
          </p>
          <div className="bg-muted/30 rounded-lg p-3 border border-border/20">
            <p className="font-medium text-sm">{lecture?.title}</p>
            {lecture?.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {lecture.description}
              </p>
            )}
          </div>
          <p className="text-xs text-red-600 dark:text-red-400 mt-3">
            This will permanently delete the lecture and all associated summaries.
          </p>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteLectureMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteLectureMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteLectureMutation.isPending ? "Deleting..." : "Delete Lecture"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
