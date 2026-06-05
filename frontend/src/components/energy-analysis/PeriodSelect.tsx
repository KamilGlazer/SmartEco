import { useEffect, useRef, useState } from "react";

import type { AnalysisPeriod, PeriodOption } from "@/api/energy-analysis/types";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown } from "lucide-react";

type PeriodSelectProps = {
  value: AnalysisPeriod;
  options: PeriodOption[];
  onValueChange: (value: AnalysisPeriod) => void;
};

function PeriodSelect({ value, options, onValueChange }: PeriodSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "Last 30 Days";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative min-w-[180px]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#161616] px-4 text-sm text-white",
          "focus-visible:border-[#00E676]/50 focus-visible:outline-none focus-visible:ring-[#00E676]/20",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Calendar className="size-4 shrink-0 text-[#8C929F]" strokeWidth={1.75} />
        <span className="flex-1 truncate text-left">{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-[#8C929F] transition-transform",
            isOpen && "rotate-180",
          )}
          strokeWidth={1.75}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+0.5rem)] right-0 z-20 min-w-full overflow-hidden rounded-xl border border-white/10 bg-[#161616] py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                onClick={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5",
                  value === option.value ? "text-[#00E676]" : "text-white",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export { PeriodSelect };
