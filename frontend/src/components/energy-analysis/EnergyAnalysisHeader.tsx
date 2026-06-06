import type { AnalysisPeriod, PeriodOption } from "@/api/energy-analysis/types";
import { PeriodSelect } from "@/components/energy-analysis/PeriodSelect";

type EnergyAnalysisHeaderProps = {
  period: AnalysisPeriod;
  periodOptions: PeriodOption[];
  onPeriodChange: (period: AnalysisPeriod) => void;
};

function EnergyAnalysisHeader({
  period,
  periodOptions,
  onPeriodChange,
}: EnergyAnalysisHeaderProps) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Energy Analysis
        </h1>
        <p className="text-sm text-[#8C929F]">
          Real-time consumption telemetry and financial impact.
        </p>
      </div>

      <PeriodSelect
        value={period}
        options={periodOptions}
        onValueChange={onPeriodChange}
      />
    </header>
  );
}

export { EnergyAnalysisHeader };
