import type { AutomationSummary } from "@/api/automations/types";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Workflow } from "lucide-react";

type AutomationsListProps = {
  automations: AutomationSummary[];
  isLoading?: boolean;
  onSelect: (id: string) => void;
};

function AutomationsList({
  automations,
  isLoading = false,
  onSelect,
}: AutomationsListProps) {
  return (
    <Card className="border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="px-6 py-6">
        <div className="mb-4 flex items-center gap-2">
          <Workflow className="size-5 text-[#00E676]" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold text-white">Saved Automations</h2>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : automations.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-[#8C929F]">
            No automations yet. Create your first flow to get started.
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {automations.map((automation) => (
              <button
                key={automation.id}
                type="button"
                onClick={() => onSelect(automation.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-base font-semibold text-white">
                    {automation.name}
                  </p>
                  <p className="text-xs text-[#8C929F]">
                    {automation.triggerCount}{" "}
                    {automation.triggerCount === 1 ? "trigger" : "triggers"} ·{" "}
                    {automation.actionCount}{" "}
                    {automation.actionCount === 1 ? "action" : "actions"}
                  </p>
                </div>
                <ChevronRight
                  className="size-4 shrink-0 text-[#8C929F]"
                  strokeWidth={1.75}
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { AutomationsList };
