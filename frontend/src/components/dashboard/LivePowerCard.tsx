import type { EnergySummary } from "@/api/summary/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LivePowerCardProps = {
  summary: EnergySummary | null;
  isLoading?: boolean;
};

function LivePowerCard({ summary, isLoading = false }: LivePowerCardProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="px-8 py-10">
        <p className="text-center text-sm font-medium text-white/90">
          Live Power
        </p>

        <div className="mt-6 flex flex-col items-center">
          {isLoading ? (
            <div className="h-16 w-40 animate-pulse rounded-lg bg-white/10" />
          ) : (
            <>
              <p
                className={cn(
                  "text-6xl font-bold tracking-tight text-[#00E676]",
                  "drop-shadow-[0_0_18px_rgba(0,230,118,0.35)]"
                )}
              >
                {summary?.livePowerKw.toFixed(2) ?? "—"}
              </p>
              <p className="mt-1 text-sm font-medium text-[#8C929F]">KW</p>
            </>
          )}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
          <div className="space-y-2 text-center sm:border-r sm:border-white/10">
            <p className="text-xs font-medium tracking-wider text-[#8C929F] uppercase">
              Consumption
            </p>
            {isLoading ? (
              <div className="mx-auto h-6 w-24 animate-pulse rounded bg-white/10" />
            ) : (
              <p className="text-lg font-semibold text-white">
                {summary?.consumptionKwh.toFixed(1) ?? "—"} kWh
              </p>
            )}
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs font-medium tracking-wider text-[#8C929F] uppercase">
              Saved
            </p>
            {isLoading ? (
              <div className="mx-auto h-6 w-24 animate-pulse rounded bg-white/10" />
            ) : (
              <p className="text-lg font-semibold text-[#00E676]">
                {summary?.savedPln.toFixed(2) ?? "—"} PLN
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { LivePowerCard };
