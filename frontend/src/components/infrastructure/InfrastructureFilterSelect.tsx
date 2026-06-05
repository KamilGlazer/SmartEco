import { useEffect, useRef, useState } from "react";

import type { InfrastructureFilterOption } from "@/api/infrastructure/types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type InfrastructureFilterSelectProps = {
  value: string;
  placeholder: string;
  options: InfrastructureFilterOption[];
  onValueChange: (value: string) => void;
};

function InfrastructureFilterSelect({
  value,
  placeholder,
  options,
  onValueChange,
}: InfrastructureFilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

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

  function handleOptionClick(optionValue: string) {
    onValueChange(value === optionValue ? "" : optionValue);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative min-w-[160px]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-[#161616] px-4 text-sm",
          "focus-visible:border-[#00E676]/50 focus-visible:outline-none focus-visible:ring-[#00E676]/20",
          value ? "text-white" : "text-[#8C929F]",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedLabel}</span>
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
          className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 overflow-hidden rounded-xl border border-white/10 bg-[#161616] py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5",
                  value === option.value
                    ? "text-[#00E676]"
                    : "text-white",
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

export { InfrastructureFilterSelect };
