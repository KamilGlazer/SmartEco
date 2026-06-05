import { useEffect, useState } from "react";

import { fetchEnergyAnalysis } from "@/api/energy-analysis/energyAnalysisApi";
import { defaultPeriodOptions } from "@/api/energy-analysis/mock";
import type {
  AnalysisPeriod,
  EnergyAnalysisData,
} from "@/api/energy-analysis/types";
import { EnergyAnalysisHeader } from "@/components/energy-analysis/EnergyAnalysisHeader";
import { FinancialImpactCard } from "@/components/energy-analysis/FinancialImpactCard";
import { PowerConsumptionCard } from "@/components/energy-analysis/PowerConsumptionCard";
import { TopConsumersSection } from "@/components/energy-analysis/TopConsumersSection";

const EnergyAnalysis = () => {
  const [period, setPeriod] = useState<AnalysisPeriod>("last-30-days");
  const [analysis, setAnalysis] = useState<EnergyAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);

    fetchEnergyAnalysis(period)
      .then((data) => {
        if (!cancelled) setAnalysis(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [period]);

  return (
    <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
      <EnergyAnalysisHeader
        period={period}
        periodOptions={analysis?.periodOptions ?? defaultPeriodOptions}
        onPeriodChange={setPeriod}
      />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <PowerConsumptionCard
          data={analysis?.powerConsumption ?? null}
          isLoading={isLoading}
        />
        <FinancialImpactCard
          data={analysis?.financialImpact ?? null}
          isLoading={isLoading}
        />
      </div>

      <TopConsumersSection
        consumers={analysis?.topConsumers ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export { EnergyAnalysis };
