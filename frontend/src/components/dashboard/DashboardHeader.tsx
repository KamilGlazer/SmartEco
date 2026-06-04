import type { EnergyRange } from "@/api/summary/types";
import { EnergyRangeTabs } from "@/components/dashboard/EnergyRangeTabs";

type DashboardHeaderProps = {
  range: EnergyRange;
  onRangeChange: (range: EnergyRange) => void;
};

function DashboardHeader({ range, onRangeChange }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-sm text-[#8C929F]">
          System operational. Efficiency optimal.
        </p>
      </div>

      <EnergyRangeTabs value={range} onValueChange={onRangeChange} />
    </header>
  );
}

export { DashboardHeader };
