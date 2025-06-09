
export interface FilterOption {
  value: string;
  label: string;
}

export const courseOptions: FilterOption[] = [
  { value: "", label: "All Courses" },
  { value: "physics", label: "Physics" },
  { value: "math", label: "Mathematics" },
  { value: "literature", label: "Literature" },
  { value: "chemistry", label: "Chemistry" },
  { value: "computer", label: "Computer Science" },
];

export const dateRangeOptions: FilterOption[] = [
  { value: "", label: "All Time" },
  { value: "last-week", label: "Last Week" },
  { value: "last-month", label: "Last Month" },
  { value: "last-3-months", label: "Last 3 Months" },
];

export const durationOptions: FilterOption[] = [
  { value: "", label: "Any Duration" },
  { value: "short", label: "Short (< 30 min)" },
  { value: "medium", label: "Medium (30-60 min)" },
  { value: "long", label: "Long (> 60 min)" },
];
