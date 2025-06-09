
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/ui/use-mobile";

interface TimeSpentData {
  subject: string;
  hours: number;
}

interface TimeSpentChartProps {
  data?: TimeSpentData[];
}

export function TimeSpentChart({ data }: TimeSpentChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();

  // If no data provided, don't render anything
  if (!data || data.length === 0) {
    return null;
  }

  const getBarColor = (index: number) => {
    const colors = [
      isDark ? "#33d2ff" : "#0ea5e9",
      isDark ? "#a5b4fc" : "#8b5cf6",
      isDark ? "#f97ca6" : "#d946ef",
      isDark ? "#84cc16" : "#65a30d",
      isDark ? "#f59e0b" : "#d97706",
    ];
    return colors[index % colors.length];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: isMobile ? 10 : 20,
          left: isMobile ? 0 : 10,
          bottom: isMobile ? 15 : 25,
        }}
        barSize={isMobile ? 20 : 30}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} 
        />
        <XAxis 
          dataKey="subject" 
          tick={{ fill: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)", fontSize: isMobile ? 10 : 12 }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 5, right: 5 }}
        />
        <YAxis 
          tick={{ fill: isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)", fontSize: isMobile ? 10 : 12 }}
          axisLine={false}
          tickLine={false}
          tickCount={5}
          width={isMobile ? 25 : 35}
        />
        <Tooltip
          cursor={{ fill: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{ 
            backgroundColor: isDark ? "#1A1F2C" : "#fff", 
            borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
          formatter={(value) => [`${value} hours`, 'Time Spent']}
          labelStyle={{ fontSize: isMobile ? 12 : 14, fontWeight: 600 }}
        />
        <Bar 
          dataKey="hours" 
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
