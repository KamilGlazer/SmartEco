import { Plus } from "lucide-react";

type AddNodeButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function AddNodeButton({ label, onClick, disabled = false }: AddNodeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#3B3E45] px-4 py-3 text-xs font-bold tracking-[0.14em] text-[#8C929F] uppercase transition-colors hover:border-[#00E676]/50 hover:text-[#00E676] disabled:pointer-events-none disabled:opacity-50"
    >
      <Plus className="size-4" strokeWidth={2} />
      {label}
    </button>
  );
}

export { AddNodeButton };
