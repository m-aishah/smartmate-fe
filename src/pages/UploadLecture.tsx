import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileAudio, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/store/use-language";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/hooks/ui/use-toast";
import { useCreateLecture } from "@/hooks/api/use-lectures";
import { UploadProgressModal } from "@/components/lectures/UploadProgressModal";
import { CreateLectureRequest } from "@/services/types/lecture.types";

const UploadLecture = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const createLectureMutation = useCreateLecture();

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [lectureType, setLectureType] = useState<"audio" | "text">("audio");
  const [textContent, setTextContent] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  // Progress modal state
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "uploading" | "processing" | "completed"
  >("uploading");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is audio
      if (!selectedFile.type.startsWith("audio/")) {
        toast({
          variant: "destructive",
          title: t("invalidFileType"),
          description: t("pleaseSelectAudio"),
        });
        return;
      }

      // Check file size (warn if over 100MB)
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > 100) {
        toast({
          title: "Large File Detected",
          description: `File size: ${fileSizeMB.toFixed(
            1
          )}MB. Upload may take several minutes. Please be patient.`,
        });
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!courseCode.trim() || !semester.trim() || !yearOfStudy.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (lectureType === "audio" && !file) {
      toast({
        variant: "destructive",
        title: "Missing File",
        description: "Please select an audio file",
      });
      return;
    }

    if (lectureType === "text" && !textContent.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Content",
        description: "Please enter lecture text content",
      });
      return;
    }

    // For text content, show progress modal and process with feedback
    if (lectureType === "text") {
      setShowProgressModal(true);
      setUploadProgress(0);
      setUploadStatus("uploading");

      // Simulate upload progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      try {
        const lectureData: CreateLectureRequest = {
          courseCode,
          semester,
          yearOfStudy,
          lectureType,
          lecture: textContent,
        };

        const response = await createLectureMutation.mutateAsync(lectureData);

        clearInterval(progressInterval);
        setUploadProgress(100);
        setUploadStatus("processing");

        // Show processing state briefly, then complete
        setTimeout(() => {
          setUploadStatus("completed");
          setTimeout(() => {
            setShowProgressModal(false);
            navigate("/app/lectures");
            toast({
              title: "Text Lecture Processed",
              description: "Your text lecture has been processed successfully!",
            });
          }, 2000);
        }, 1000);
      } catch (error) {
        clearInterval(progressInterval);
        setShowProgressModal(false);
        console.error("Upload failed:", error);
        // Error is already handled by the mutation's onError
      }
    } else {
      // For audio files, upload and navigate immediately with background processing
      try {
        const lectureData: CreateLectureRequest = {
          courseCode,
          semester,
          yearOfStudy,
          lectureType,
          lecture: file!,
        };

        await createLectureMutation.mutateAsync(lectureData);

        // Navigate immediately for audio uploads
        navigate("/app/lectures");
        toast({
          title: "Audio Upload Started",
          description:
            "Your audio lecture is uploading and will be processed in the background. You can navigate away - we'll process it automatically.",
        });
      } catch (error) {
        console.error("Upload failed:", error);
        // Error is already handled by the mutation's onError
      }
    }
  };

  const handleCancel = () => {
    navigate("/app/lectures");
  };

  return (
    <>
      <div className="max-w-2xl mx-auto pb-24">
        <div className="flex items-center justify-between mb-6">
          <PageHeader title={t("uploadLecture")} />
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lecture Type Selection */}
          <div>
            <Label htmlFor="lectureType">Lecture Type</Label>
            <Select
              value={lectureType}
              onValueChange={(value: "audio" | "text") => setLectureType(value)}
            >
              <SelectTrigger className="bg-secondary/20">
                <SelectValue placeholder="Select lecture type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audio">Audio File</SelectItem>
                <SelectItem value="text">Text Content</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Course Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="courseCode">Course Code *</Label>
              <Input
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g., CS101"
                className="bg-secondary/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="semester">Semester *</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="bg-secondary/20">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="yearOfStudy">Year of Study *</Label>
              <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
                <SelectTrigger className="bg-secondary/20">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content Input Based on Type */}
          {lectureType === "audio" ? (
            <div className="p-8 border border-dashed border-border/50 rounded-lg bg-secondary/10 backdrop-blur-sm flex flex-col items-center justify-center">
              {!file ? (
                <>
                  <FileAudio className="h-16 w-16 text-accent/50 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    {t("dragAndDropAudio")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Supported: MP3, WAV, M4A, OGG (Max 10 minutes recommended)
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t("or")}
                  </p>
                  <Label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 rounded-md">
                      {t("browseFiles")}
                    </div>
                    <Input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileAudio className="h-8 w-8 text-accent mr-3" />
                      <div>
                        <span className="font-medium">{file.name}</span>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="bg-accent h-full w-full rounded-full" />
                  </div>
                  {file.size > 50 * 1024 * 1024 && (
                    <p className="text-sm text-amber-600 mt-2">
                      ⚠️ Large file detected. Upload may take several minutes.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="textContent">Lecture Text Content *</Label>
              <Textarea
                id="textContent"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter or paste your lecture text content here..."
                className="bg-secondary/20 min-h-[200px]"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                createLectureMutation.isPending ||
                !courseCode.trim() ||
                !semester.trim() ||
                !yearOfStudy.trim() ||
                (lectureType === "audio" && !file) ||
                (lectureType === "text" && !textContent.trim())
              }
            >
              {createLectureMutation.isPending ? t("uploading") : t("upload")}
            </Button>
          </div>
        </form>
      </div>

      <UploadProgressModal
        open={showProgressModal}
        onOpenChange={setShowProgressModal}
        fileName={lectureType === "text" ? "Text Content" : file?.name || ""}
        progress={uploadProgress}
        status={uploadStatus}
        lectureType={lectureType}
        message={
          uploadStatus === "uploading"
            ? "Processing your text lecture..."
            : uploadStatus === "processing"
            ? "Generating AI summary..."
            : "Processing completed successfully!"
        }
      />
    </>
  );
};

export default UploadLecture;
