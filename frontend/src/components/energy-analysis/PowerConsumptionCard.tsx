import type { PowerConsumption } from "@/api/energy-analysis/types";
import { PowerConsumptionChart } from "@/components/energy-analysis/PowerConsumptionChart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

type PowerConsumptionCardProps = {
  data: PowerConsumption | null;
  isLoading?: boolean;
};

function PowerConsumptionCard({
  data,
  isLoading = false,
}: PowerConsumptionCardProps) {
  return (
    <Card className="border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="px-6 py-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">
              Power Consumption
            </h2>
            <p className="text-sm text-[#8C929F]">
              {data?.subtitle ?? "Last 30 Days (kWh)"}
            </p>
          </div>

          {!isLoading && data ? (
            <Badge
              variant="secondary"
              className="rounded-md border border-[#00E676]/30 bg-[#00E676]/10 px-2.5 py-1 text-xs font-medium text-[#00E676]"
            >
              <TrendingDown className="size-3" strokeWidth={2} />
              {data.trendLabel}
            </Badge>
          ) : null}
        </div>

        {isLoading ? (
          <div className="h-44 animate-pulse rounded-lg bg-white/5" />
        ) : data ? (
          <>
            <PowerConsumptionChart
              dataPoints={data.dataPoints}
              highlightIndex={data.highlightIndex}
            />
            <div className="mt-4 flex justify-between text-xs text-[#8C929F]">
              {data.dataPoints.map((point) => (
                <span key={point.label}>{point.label}</span>
              ))}
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { PowerConsumptionCard };
