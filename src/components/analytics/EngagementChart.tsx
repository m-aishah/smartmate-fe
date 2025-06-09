
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/ui/use-mobile";

interface EngagementData {
  day: string;
  study: number;
  quiz: number;
  lecture: number;
}

interface EngagementChartProps {
  data?: EngagementData[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();

  // If no data provided, don't render anything
  if (!data || data.length === 0) {
    return null;
  }

  // Colors that work well in both light and dark themes
  const colors = {
    study: isDark ? "#33d2ff" : "#0ea5e9",
    quiz: isDark ? "#f97ca6" : "#d946ef",
    lecture: isDark ? "#a5b4fc" : "#8b5cf6",
    grid: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    text: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis 
          dataKey="day" 
          tick={{ fill: colors.text, fontSize: isMobile ? 10 : 12 }}
          tickMargin={isMobile ? 5 : 10}
        />
        <YAxis 
          tick={{ fill: colors.text, fontSize: isMobile ? 10 : 12 }}
          width={isMobile ? 25 : 35}
          label={!isMobile ? { 
            value: 'Hours', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fill: colors.text, fontSize: 12 }
          } : undefined}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDark ? "#1A1F2C" : "#fff", 
            borderColor: colors.grid,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
          itemStyle={{ fontSize: isMobile ? 10 : 12 }}
          labelStyle={{ fontSize: isMobile ? 12 : 14, fontWeight: 600 }}
        />
        <Legend 
          align="center" 
          verticalAlign="bottom" 
          height={isMobile ? 25 : 36}
          wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
          iconSize={isMobile ? 8 : 10}
        />
        <Line
          type="monotone"
          dataKey="study"
          name="Study Time"
          stroke={colors.study}
          activeDot={{ r: isMobile ? 4 : 6 }}
          strokeWidth={2}
          dot={{ fill: colors.study, strokeWidth: 0, r: isMobile ? 3 : 4 }}
        />
        <Line
          type="monotone"
          dataKey="quiz"
          name="Quiz Time"
          stroke={colors.quiz}
          activeDot={{ r: isMobile ? 4 : 6 }}
          strokeWidth={2}
          dot={{ fill: colors.quiz, strokeWidth: 0, r: isMobile ? 3 : 4 }}
        />
        <Line
          type="monotone"
          dataKey="lecture"
          name="Lecture Time"
          stroke={colors.lecture}
          activeDot={{ r: isMobile ? 4 : 6 }}
          strokeWidth={2}
          dot={{ fill: colors.lecture, strokeWidth: 0, r: isMobile ? 3 : 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
