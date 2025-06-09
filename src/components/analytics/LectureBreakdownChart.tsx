
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/ui/use-mobile";

interface LectureBreakdownData {
  name: string;
  value: number;
}

interface LectureBreakdownChartProps {
  data?: LectureBreakdownData[];
}

export function LectureBreakdownChart({ data }: LectureBreakdownChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();

  // If no data provided, don't render anything
  if (!data || data.length === 0) {
    return null;
  }

  const COLORS = [
    isDark ? "#33d2ff" : "#0ea5e9",
    isDark ? "#a5b4fc" : "#8b5cf6",
    isDark ? "#f97ca6" : "#d946ef",
    isDark ? "#84cc16" : "#65a30d",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        fontWeight="bold"
        fontSize={isMobile ? 10 : 12}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={isMobile ? 60 : 80}
          innerRadius={isMobile ? 25 : 30}
          fill="#8884d8"
          dataKey="value"
          stroke={isDark ? "#1A1F2C" : "#fff"}
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconSize={isMobile ? 8 : 10}
          wrapperStyle={{
            fontSize: isMobile ? 10 : 12,
            paddingTop: isMobile ? 10 : 20
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
