import type { EnergyRange } from "@/api/summary/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const RANGE_OPTIONS: { value: EnergyRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

type EnergyRangeTabsProps = {
  value: EnergyRange;
  onValueChange: (value: EnergyRange) => void;
  className?: string;
};

function EnergyRangeTabs({
  value,
  onValueChange,
  className,
}: EnergyRangeTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as EnergyRange)}
      className={className}
    >
      <TabsList className="h-10 gap-1 rounded-full border border-white/10 bg-[#161616] p-1">
        {RANGE_OPTIONS.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "h-6 rounded-full px-4 text-sm font-medium text-[#8C929F] transition-all hover:text-[#d7e0dc]",
              "data-active:bg-[#00E676] data-active:text-black data-active:shadow-none hover:text-[#d7e0dc]",
            )}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export { EnergyRangeTabs };
