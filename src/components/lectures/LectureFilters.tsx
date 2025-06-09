
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/store/use-language";
import { courseOptions, dateRangeOptions, durationOptions } from "@/constants/filters";

interface LectureFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
}

export function LectureFilters({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedCourse,
  setSelectedCourse,
  selectedDateRange,
  setSelectedDateRange,
  selectedDuration,
  setSelectedDuration,
}: LectureFiltersProps) {
  const { t } = useLanguage();

  const handleReset = () => {
    setSelectedCourse("");
    setSelectedDateRange("");
    setSelectedDuration("");
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("lectures").toLowerCase()}...`}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {showFilters && (
        <div className="rounded-md border border-border bg-card p-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courseOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
