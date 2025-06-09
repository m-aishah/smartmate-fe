import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  StopCircle,
  X,
  Activity,
  Save,
  Upload,
} from "lucide-react";
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
import { useLanguage } from "@/hooks/store/use-language";
import { useToast } from "@/hooks/ui/use-toast";
import { useCreateLecture } from "@/hooks/api/use-lectures";

const RecordLecture = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const createLectureMutation = useCreateLecture();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // Create MediaRecorder with specific options for WAV format
      const options = {
        mimeType: "audio/webm;codecs=opus", // Most widely supported format
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setRecordedAudio(audioBlob);

        // Create URL for playback
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);

        audioChunksRef.current = [];

        // Clean up audio context
        if (
          audioContextRef.current &&
          audioContextRef.current.state !== "closed"
        ) {
          audioContextRef.current.close();
        }
      };

      // Set up audio visualization
      if (canvasRef.current) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const microphone =
          audioContextRef.current.createMediaStreamSource(stream);
        microphone.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;

        const renderFrame = () => {
          if (!isRecording || !analyserRef.current || !canvasRef.current)
            return;

          animationFrameRef.current = requestAnimationFrame(renderFrame);

          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserRef.current.getByteFrequencyData(dataArray);

          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = 3;
            const barGap = 2;
            const barCount = Math.floor(canvas.width / (barWidth + barGap));
            const barHeightMultiplier = canvas.height / 255;

            ctx.fillStyle = "#14b8a6"; // smartmate-teal color

            for (let i = 0; i < barCount; i++) {
              const dataIndex = Math.floor((i * bufferLength) / barCount);
              const barHeight = dataArray[dataIndex] * barHeightMultiplier;

              ctx.fillRect(
                i * (barWidth + barGap),
                canvas.height - barHeight,
                barWidth,
                barHeight
              );
            }
          }
        };

        renderFrame();
      }

      audioChunksRef.current = [];
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);

      // Start timer
      const startTime = Date.now() - recordedTime * 1000;
      timerRef.current = window.setInterval(() => {
        setRecordedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Recording your lecture audio...",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setIsRecording(false);

      toast({
        title: "Recording Complete",
        description: `Recorded ${formatTime(recordedTime)} of audio`,
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !recordedAudio ||
      !courseCode.trim() ||
      !semester.trim() ||
      !yearOfStudy.trim()
    ) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please record audio and fill in all required fields.",
      });
      return;
    }

    // Convert blob to File object with proper name and type
    const audioFile = new File([recordedAudio], `lecture_${Date.now()}.webm`, {
      type: "audio/webm",
      lastModified: Date.now(),
    });

    console.log("Submitting audio file:", {
      name: audioFile.name,
      size: audioFile.size,
      type: audioFile.type,
    });

    try {
      await createLectureMutation.mutateAsync({
        courseCode,
        semester,
        yearOfStudy,
        lecture: audioFile,
        lectureType: "audio",
      });

      // Clean up
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }

      navigate("/app/lectures");
    } catch (error) {
      console.error("Failed to upload recorded lecture:", error);
    }
  };

  const handleCancel = () => {
    if (isRecording) {
      handleStopRecording();
    }

    // Clean up audio URL
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    navigate("/app/lectures");
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Stop recording if active when unmounting
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream
            .getTracks()
            .forEach((track) => track.stop());
        }
      }

      // Close audio context
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }

      // Clean up audio URL
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [isRecording, audioURL]);

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-orbitron smartmate-text-gradient">
          Record Lecture
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="rounded-full hover:bg-destructive/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Recording Interface */}
        <div className="p-8 border border-smartmate-teal/30 rounded-lg bg-background/40 backdrop-blur-lg flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background circuit patterns */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-[15%] left-0 w-full h-[1px] bg-smartmate-teal"></div>
            <div className="absolute top-[35%] left-0 w-full h-[1px] bg-smartmate-blue"></div>
            <div className="absolute top-[65%] left-0 w-full h-[1px] bg-smartmate-cyan"></div>
            <div className="absolute top-0 left-[25%] w-[1px] h-full bg-smartmate-teal"></div>
            <div className="absolute top-0 left-[65%] w-[1px] h-full bg-smartmate-blue"></div>
            <div className="absolute bottom-0 right-0 h-20 w-20 border-2 rounded-full border-smartmate-teal/20 -mr-10 -mb-10"></div>
            <div className="absolute top-0 left-0 h-32 w-32 border-2 rounded-full border-smartmate-blue/20 -ml-16 -mt-16"></div>
          </div>

          <div className="mb-6 relative z-10">
            <div className="mb-4 flex flex-col items-center">
              {/* Timer display */}
              <div className="text-6xl font-semibold text-center mb-6 font-orbitron smartmate-text-gradient glow-effect">
                {formatTime(recordedTime)}
              </div>

              {/* Audio visualization */}
              <div className="w-full max-w-md h-20 mb-4">
                {isRecording ? (
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={80}
                    className="w-full h-full rounded-lg bg-background/30 border border-smartmate-teal/20"
                  />
                ) : recordedAudio ? (
                  <div className="w-full">
                    <audio
                      ref={audioRef}
                      src={audioURL || undefined}
                      controls
                      className="w-full h-12 mt-4"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-lg bg-background/30 border border-smartmate-teal/20 flex items-center justify-center">
                    <Activity className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Recording status */}
              {isRecording ? (
                <div className="animate-pulse flex items-center justify-center gap-2 text-accent">
                  <Mic className="h-5 w-5" />
                  <span className="font-orbitron">Recording...</span>
                </div>
              ) : (
                recordedAudio && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <StopCircle className="h-4 w-4" />
                    <span>Recording Complete</span>
                  </div>
                )
              )}
            </div>

            <div className="flex gap-4 justify-center">
              {!isRecording ? (
                <Button
                  type="button"
                  onClick={handleStartRecording}
                  disabled={isRecording}
                  className="bg-gradient-to-r from-smartmate-teal to-smartmate-cyan hover:from-smartmate-teal/90 hover:to-smartmate-cyan/90 text-white flex items-center gap-2 rounded-full px-6"
                >
                  <Mic className="h-5 w-5" />
                  <span className="font-orbitron">Start Recording</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleStopRecording}
                  variant="destructive"
                  className="flex items-center gap-2 rounded-full px-6"
                >
                  <StopCircle className="h-5 w-5" />
                  <span className="font-orbitron">Stop Recording</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Lecture Details Form */}
        <div className="space-y-6">
          <div className="bg-background/40 backdrop-blur-lg rounded-lg border border-smartmate-teal/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="courseCode"
                  className="text-sm font-medium mb-1.5 block font-orbitron"
                >
                  Course Code *
                </Label>
                <Input
                  id="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g., CS101"
                  className="bg-background/60 border-smartmate-teal/20 focus-visible:ring-smartmate-teal h-12 font-medium"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="semester"
                  className="text-sm font-medium mb-1.5 block font-orbitron"
                >
                  Semester *
                </Label>
                <Select value={semester} onValueChange={setSemester} required>
                  <SelectTrigger className="bg-background/60 border-smartmate-teal/20 focus:ring-smartmate-teal h-12">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                    <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                    <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="yearOfStudy"
                  className="text-sm font-medium mb-1.5 block font-orbitron"
                >
                  Year of Study *
                </Label>
                <Select
                  value={yearOfStudy}
                  onValueChange={setYearOfStudy}
                  required
                >
                  <SelectTrigger className="bg-background/60 border-smartmate-teal/20 focus:ring-smartmate-teal h-12">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              type="button"
              className="rounded-full border-smartmate-teal/20 hover:border-smartmate-teal/40 hover:bg-background"
            >
              <span className="font-orbitron">Cancel</span>
            </Button>
            <Button
              type="submit"
              disabled={
                createLectureMutation.isPending ||
                isRecording ||
                !recordedAudio ||
                !courseCode.trim() ||
                !semester.trim() ||
                !yearOfStudy.trim()
              }
              className="bg-gradient-to-r from-smartmate-teal to-smartmate-cyan hover:from-smartmate-teal/90 hover:to-smartmate-cyan/90 text-white rounded-full flex items-center gap-2 px-6"
            >
              {createLectureMutation.isPending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="font-orbitron">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span className="font-orbitron">Upload Lecture</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecordLecture;
