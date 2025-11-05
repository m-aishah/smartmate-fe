import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Plus,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/ui/use-toast";
import { useLanguage } from "@/hooks/store/use-language";
import { Task } from "@/constants/dashboard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/api/task.service";

export function TasksCard() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => taskService.getAllTasks(),
  });

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Mutation for toggling task completion
  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      taskService.putTask(id, { completed }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast({
      //   title: data.completed ? t("taskCompleted") : t("taskReopened"),
      //   description: `"${data.title}" ${
      //     data.completed ? t("hasBeenCompleted") : t("hasBeenReopened")
      //   }.`,
      // });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("taskUpdateFailed"),
        variant: "destructive",
      });
    },
  });

  // Mutation for adding a new task
  const addTaskMutation = useMutation({
    mutationFn: (taskData: Omit<Task, "id">) => taskService.postTask(taskData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setNewTask("");
      toast({
        title: t("taskAdded"),
        description: `"${data.title}" ${t("hasBeenAddedToTasks")}.`,
      });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("taskAddFailed"),
        variant: "destructive",
      });
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: (_, id) => {
      const task = tasks.find((t) => t.id === id);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (task) {
        toast({
          title: t("taskDeleted"),
          description: `"${task.title}" ${t("hasBeenRemoved")}.`,
        });
      }
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("taskDeleteFailed"),
        variant: "destructive",
      });
    },
  });

  // Mutation for updating a task
  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Task, "id">>;
    }) => taskService.putTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditingTask(null);
      setEditValue("");
      toast({
        title: t("taskUpdated"),
        description: t("taskHasBeenUpdated"),
      });
    },
    onError: () => {
      toast({
        title: t("error"),
        description: t("taskUpdateFailed"),
        variant: "destructive",
      });
    },
  });

  const toggleTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      toggleTaskMutation.mutate({ id, completed: !task.completed });
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      const taskData: Omit<Task, "id"> = {
        title: newTask,
        completed: false,
        priority: "medium",
      };
      addTaskMutation.mutate(taskData);
    }
  };

  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const startEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditValue(task.title);
  };

  const saveEdit = () => {
    if (editValue.trim() && editingTask) {
      updateTaskMutation.mutate({
        id: editingTask,
        data: { title: editValue },
      });
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditValue("");
  };

  const downloadTasks = () => {
    const content = tasks
      .map(
        (task) =>
          `${task.completed ? "✓" : "○"} ${task.title} ${
            task.priority ? `[${task.priority.toUpperCase()}]` : ""
          } ${task.dueDate ? `(Due: ${task.dueDate})` : ""}`
      )
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-tasks.txt";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: t("tasksDownloaded"),
      description: t("tasksDownloadedDescription"),
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card border-smartmate-teal/20 hover:border-smartmate-teal/40 transition-all duration-300 relative z-20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t("tasks")}</CardTitle>
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
    <Card className="glass-card border-smartmate-teal/20 hover:border-smartmate-teal/40 transition-all duration-300 relative z-20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{t("tasks")}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadTasks}
            className="text-smartmate-teal hover:bg-smartmate-teal/10 relative z-30"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 relative z-30">
        <div className="flex gap-2">
          <Input
            placeholder={t("addNewTask")}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
            className="text-sm relative z-40"
            disabled={addTaskMutation.isPending}
          />
          <Button
            size="sm"
            onClick={addTask}
            className="bg-smartmate-teal hover:bg-smartmate-teal/90 text-white shrink-0 relative z-40"
            disabled={addTaskMutation.isPending}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="group relative z-40"
            >
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-smartmate-teal/5 transition-colors relative z-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTask(task.id)}
                  className="p-0 h-5 w-5 shrink-0 relative z-60"
                  disabled={toggleTaskMutation.isPending}
                >
                  {task.completed ? (
                    <CheckCircle className="h-4 w-4 text-smartmate-teal" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  {editingTask === task.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            saveEdit();
                          }
                          if (e.key === "Escape") {
                            e.preventDefault();
                            cancelEdit();
                          }
                        }}
                        className="h-6 text-sm relative z-60"
                        autoFocus
                        disabled={updateTaskMutation.isPending}
                      />
                      <Button
                        size="sm"
                        onClick={saveEdit}
                        className="h-6 px-2 text-xs bg-smartmate-teal hover:bg-smartmate-teal/90 text-white relative z-60"
                        disabled={updateTaskMutation.isPending}
                      >
                        {t("save")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                        className="h-6 px-2 text-xs relative z-60"
                        disabled={updateTaskMutation.isPending}
                      >
                        {t("cancel")}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      {/* {task.priority && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </Badge>
                      )} */}
                    </div>
                  )}
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      {t("due")}: {task.dueDate}
                    </p>
                  )}
                </div>

                {editingTask !== task.id && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 relative z-60">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(task)}
                      className="h-6 w-6 p-0 text-smartmate-teal hover:bg-smartmate-teal/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                      disabled={deleteTaskMutation.isPending}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {t("noTasksYet")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
