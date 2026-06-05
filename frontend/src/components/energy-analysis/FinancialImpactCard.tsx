import type { FinancialImpact } from "@/api/energy-analysis/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FinancialImpactCardProps = {
  data: FinancialImpact | null;
  isLoading?: boolean;
};

function FinancialImpactCard({
  data,
  isLoading = false,
}: FinancialImpactCardProps) {
  return (
    <Card className="border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="flex h-full flex-col px-6 py-6">
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold text-white">Financial Impact</h2>
          <p className="text-sm text-[#8C929F]">Current Billing Cycle</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 animate-pulse rounded-lg bg-white/5" />
            <div className="h-3 animate-pulse rounded-full bg-white/5" />
            <div className="space-y-3 pt-4">
              <div className="h-8 animate-pulse rounded-lg bg-white/5" />
              <div className="h-8 animate-pulse rounded-lg bg-white/5" />
            </div>
          </div>
        ) : data ? (
          <>
            <p className="text-4xl font-bold tracking-tight text-white">
              {data.totalPln.toFixed(2)} PLN
            </p>

            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8C929F]">Budget Utilization</span>
                <span className="font-medium text-[#00E676]">
                  {data.budgetUtilizationPercent}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#2a2a2a]">
                <div
                  className="h-full rounded-full bg-[#00E676]"
                  style={{ width: `${data.budgetUtilizationPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#8C929F]">
                Target: {data.budgetTargetPln} PLN
              </p>
            </div>

            <div className="mt-auto space-y-4 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#FF9800]" />
                  <span className="text-sm text-[#8C929F]">Peak Hours</span>
                </div>
                <span className="text-sm font-medium text-white">
                  {data.peakHoursPln.toFixed(2)} PLN
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00E676]" />
                  <span className="text-sm text-[#8C929F]">Off-Peak</span>
                </div>
                <span
                  className={cn("text-sm font-medium text-[#00E676]")}
                >
                  {data.offPeakPln.toFixed(2)} PLN
                </span>
              </div>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

export { FinancialImpactCard };
