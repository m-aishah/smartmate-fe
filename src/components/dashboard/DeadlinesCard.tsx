import { useState } from "react";
import { Calendar, Plus, Edit, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/ui/use-toast";
import { useLanguage } from "@/hooks/store/use-language";
import { Deadline } from "@/constants/dashboard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deadlineService } from "@/services/api/deadline.service";

export function DeadlinesCard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: deadlines = [], isLoading } = useQuery({
    queryKey: ["deadlines"],
    queryFn: () => deadlineService.getAllDeadlines(),
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    date: "",
  });

  // Mutation for adding a new deadline
  const addDeadlineMutation = useMutation({
    mutationFn: (data: Omit<Deadline, "id">) =>
      deadlineService.postDeadline(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
      setIsAddDialogOpen(false);
      setFormData({ title: "", course: "", date: "" });
      toast({
        title: t("deadlineAdded"),
        description: `"${data.title}" ${t("hasBeenAdded")}.`,
      });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("deadlineAddFailed"),
        variant: "destructive",
      });
    },
  });

  // Mutation for updating a deadline
  const updateDeadlineMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Deadline, "id">>;
    }) => deadlineService.putDeadline(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
      setIsEditDialogOpen(false);
      setEditingDeadline(null);
      setFormData({ title: "", course: "", date: "" });
      toast({
        title: t("deadlineUpdated"),
        description: `"${data.title}" ${t("hasBeenUpdated")}.`,
      });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("deadlineUpdateFailed"),
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting a deadline
  const deleteDeadlineMutation = useMutation({
    mutationFn: (id: string) => deadlineService.deleteDeadline(id),
    onSuccess: (_, id) => {
      const deadline = deadlines.find((d) => d.id === id);
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
      if (deadline) {
        toast({
          title: t("deadlineDeleted"),
          description: `"${deadline.title}" ${t("hasBeenRemoved")}.`,
        });
      }
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("deadlineDeleteFailed"),
        variant: "destructive",
      });
    },
  });

  // Format date to "Apr 25" style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddDeadline = () => {
    if (formData.title.trim() && formData.course.trim() && formData.date) {
      addDeadlineMutation.mutate({
        title: formData.title,
        course: formData.course,
        date: formData.date,
      });
    }
  };

  const handleEditDeadline = () => {
    if (
      editingDeadline &&
      formData.title.trim() &&
      formData.course.trim() &&
      formData.date
    ) {
      updateDeadlineMutation.mutate({
        id: editingDeadline.id,
        data: {
          title: formData.title,
          course: formData.course,
          date: formData.date,
        },
      });
    }
  };

  const handleDeleteDeadline = (id: string) => {
    if (window.confirm(t("confirmDelete"))) {
      deleteDeadlineMutation.mutate(id);
    }
  };

  const openEditDialog = (deadline: Deadline) => {
    setEditingDeadline(deadline);
    setFormData({
      title: deadline.title,
      course: deadline.course,
      date: deadline.date,
    });
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="h-full portal-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t("upcomingDeadlines")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              {t("loading")}...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full portal-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{t("upcomingDeadlines")}</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-smartmate-teal hover:bg-smartmate-teal/10 relative z-50 pointer-events-auto"
                aria-label={t("addDeadline")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("addDeadline")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("deadlineTitle")}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder={t("deadlineTitle")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">{t("course")}</Label>
                  <Input
                    id="course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    placeholder={t("courseName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">{t("dueDate")}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={handleAddDeadline}
                    disabled={addDeadlineMutation.isPending}
                    className="bg-smartmate-teal hover:bg-smartmate-teal/90"
                  >
                    {t("add")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {deadlines.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {t("noDeadlinesYet")}
          </div>
        ) : (
          <ul className="space-y-4">
            {deadlines.map((deadline) => {
              const daysRemaining = getDaysRemaining(deadline.date);
              return (
                <li
                  key={deadline.id}
                  className="group flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deadline.course}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{formatDate(deadline.date)}</p>
                    <p
                      className={`text-xs ${
                        daysRemaining <= 3
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {daysRemaining} {t("daysLeft")}
                    </p>
                  </div>
                  {/* <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(deadline)}
                      className="h-8 w-8 p-0 text-smartmate-teal hover:bg-smartmate-teal/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDeadline(deadline.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                      disabled={deleteDeadlineMutation.isPending}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div> */}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("editDeadline")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">{t("deadlineTitle")}</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder={t("deadlineTitle")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-course">{t("course")}</Label>
              <Input
                id="edit-course"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                placeholder={t("courseName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-date">{t("dueDate")}</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleEditDeadline}
                disabled={updateDeadlineMutation.isPending}
                className="bg-smartmate-teal hover:bg-smartmate-teal/90"
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
