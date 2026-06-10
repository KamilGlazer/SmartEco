import type { AutomationNodeCategory } from "@/api/automations/types";
import { getNodeMeta } from "@/components/automations/nodeMeta";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type NodePickerOption = {
  category: AutomationNodeCategory;
  title: string;
  subtitle: string;
};

type NodePickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  options: NodePickerOption[];
  isLoading?: boolean;
  onSelect: (option: NodePickerOption) => void;
};

function NodePickerDialog({
  open,
  onOpenChange,
  title,
  description,
  options,
  isLoading = false,
  onSelect,
}: NodePickerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-[#1A1A1A] text-white ring-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-[#8C929F]">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-white/5"
                />
              ))
            : options.map((option) => {
                const meta = getNodeMeta(option.category);
                const Icon = meta.icon;

                return (
                  <button
                    key={`${option.category}-${option.title}`}
                    type="button"
                    onClick={() => {
                      onSelect(option);
                      onOpenChange(false);
                    }}
                    className="flex w-full cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-[#151515] p-3 text-left transition-colors hover:border-[#00E676]/40 hover:bg-[#101810]"
                  >
                    <Icon
                      className={cn("mt-0.5 size-4 shrink-0", meta.accentClassName)}
                      strokeWidth={1.75}
                    />
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "text-[10px] font-bold tracking-[0.14em] uppercase",
                          meta.accentClassName,
                        )}
                      >
                        {meta.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-white">
                        {option.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#8C929F]">
                        {option.subtitle}
                      </span>
                    </span>
                  </button>
                );
              })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { NodePickerDialog };
export type { NodePickerOption };
