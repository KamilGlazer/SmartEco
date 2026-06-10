import { useEffect, useRef, useState } from "react";

import type { AutomationNodeCategory } from "@/api/automations/types";
import { getNodeMeta } from "@/components/automations/nodeMeta";
import { cn } from "@/lib/utils";
import { Ellipsis, Trash2 } from "lucide-react";

type AutomationNodeCardProps = {
  category: AutomationNodeCategory;
  title: string;
  subtitle: string;
  side: "trigger" | "action";
  highlighted?: boolean;
  isDeleting?: boolean;
  isConnecting?: boolean;
  isConnectionTarget?: boolean;
  onDelete: () => void;
  onDotClick?: () => void;
  dotRef?: React.Ref<HTMLButtonElement>;
};

function AutomationNodeCard({
  category,
  title,
  subtitle,
  side,
  highlighted = false,
  isDeleting = false,
  isConnecting = false,
  isConnectionTarget = false,
  onDelete,
  onDotClick,
  dotRef,
}: AutomationNodeCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const meta = getNodeMeta(category);
  const Icon = meta.icon;
  const isActive = highlighted || isConnecting || isConnectionTarget;

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 transition-opacity",
        isActive
          ? "border-[#00E676]/60 bg-gradient-to-br from-[#00E676]/15 to-[#101810] shadow-[0_0_18px_rgba(0,230,118,0.12)]"
          : "border-white/10 bg-[#1A1A1A]",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          className={cn("size-4", meta.accentClassName)}
          strokeWidth={1.75}
        />
        <span
          className={cn(
            "text-[11px] font-bold tracking-[0.14em] uppercase",
            meta.accentClassName,
          )}
        >
          {meta.label}
        </span>
      </div>

      <p className="mt-2 text-lg font-semibold text-white">{title}</p>
      <p className="mt-0.5 text-xs text-[#8C929F]">{subtitle}</p>

      <div ref={menuRef} className="absolute top-3 right-3">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex size-7 cursor-pointer items-center justify-center rounded-md text-[#8C929F] transition-colors hover:bg-white/5 hover:text-white"
          aria-label={`Open menu for ${title}`}
        >
          <Ellipsis className="size-4" strokeWidth={1.75} />
        </button>

        {isMenuOpen ? (
          <div className="absolute right-0 z-20 mt-1 w-32 rounded-lg border border-white/10 bg-[#1F1F1F] p-1 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onDelete();
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-400/10"
            >
              <Trash2 className="size-3.5" strokeWidth={1.75} />
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <button
        ref={dotRef}
        type="button"
        onClick={onDotClick}
        aria-label={
          side === "trigger"
            ? `Connect ${title} to an action`
            : `Connect triggers to ${title}`
        }
        className={cn(
          "absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 transition-transform hover:scale-125",
          side === "trigger" ? "-right-1.5" : "-left-1.5",
          isActive
            ? "border-[#00E676] bg-[#0B0F0C] shadow-[0_0_8px_rgba(0,230,118,0.6)]"
            : "border-[#3B3E45] bg-[#1A1A1A]",
          isConnecting && "ring-2 ring-[#00E676]/40",
          isConnectionTarget && "ring-2 ring-[#00E676]/60",
        )}
      />
    </div>
  );
}

export { AutomationNodeCard };
