import { useTheme } from "next-themes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { useIsMobile } from "@/hooks/ui/use-mobile";

interface SubjectPerformance {
  subject: string;
  score: number;
  status: "excellent" | "good" | "average" | "needs-improvement";
  trend: "up" | "down" | "stable";
  lectures: number;
  quizzes: number;
}

interface PerformanceTableProps {
  data?: SubjectPerformance[];
}

const defaultData: SubjectPerformance[] = [
  { 
    subject: "Physics 101", 
    score: 92, 
    status: "excellent", 
    trend: "up", 
    lectures: 12,
    quizzes: 8
  },
  { 
    subject: "Calculus II", 
    score: 87, 
    status: "good", 
    trend: "stable",
    lectures: 10,
    quizzes: 6
  },
];

export function PerformanceTable({ data }: PerformanceTableProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();

  // If no data provided, don't render anything
  if (!data || data.length === 0) {
    return null;
  }
  
  const getScoreColor = (score: number, status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500/20 text-green-500";
      case "good":
        return "bg-blue-500/20 text-blue-500";
      case "average":
        return "bg-yellow-500/20 text-yellow-500";
      case "needs-improvement":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };
  
  const getTrendIcon = (trend: string) => {
    return (
      <span className="flex items-center justify-center">
        {trend === "up" && (
          <span className="text-green-500">↑</span>
        )}
        {trend === "down" && (
          <span className="text-red-500">↓</span>
        )}
        {trend === "stable" && (
          <span className="text-yellow-500">→</span>
        )}
      </span>
    );
  };

  return (
    <div className="w-full min-w-[600px] sm:min-w-full px-2 sm:px-0">
      <Table className="border border-smartmate-teal/10 rounded-lg overflow-hidden">
        <TableHeader className="bg-smartmate-teal/5">
          <TableRow>
            <TableHead className="font-orbitron text-xs md:text-sm">Subject</TableHead>
            <TableHead className="font-orbitron text-xs md:text-sm">Score</TableHead>
            <TableHead className="font-orbitron text-center text-xs md:text-sm">Status</TableHead>
            <TableHead className="font-orbitron text-center text-xs md:text-sm">Trend</TableHead>
            <TableHead className="font-orbitron text-center text-xs md:text-sm">Lectures</TableHead>
            <TableHead className="font-orbitron text-center text-xs md:text-sm">Quizzes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <motion.tr
              key={item.subject}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }}
              className="hover:bg-smartmate-teal/5 cursor-pointer"
            >
              <TableCell className="font-medium text-xs md:text-sm">{item.subject}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-smartmate-teal/20 to-transparent flex items-center justify-center">
                    <Activity className="h-3 w-3 md:h-4 md:w-4 text-smartmate-teal" />
                  </div>
                  <span className="font-mono font-bold text-xs md:text-sm">{item.score}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className={`${getScoreColor(item.score, item.status)} text-xs px-1 md:px-2`}>
                  {isMobile ? item.status.substring(0, 3) : item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center text-base md:text-lg font-bold">
                {getTrendIcon(item.trend)}
              </TableCell>
              <TableCell className="text-center text-xs md:text-sm">{item.lectures}</TableCell>
              <TableCell className="text-center text-xs md:text-sm">{item.quizzes}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
