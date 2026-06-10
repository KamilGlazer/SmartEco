import { Plus } from "lucide-react";

type AddDeviceCardProps = {
  onClick: () => void;
};

function AddDeviceCard({ onClick }: AddDeviceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-white/15 bg-transparent p-5 text-white transition-colors hover:border-[#00E676]/40 hover:bg-white/[0.02]"
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-white/15 text-[#8C929F]">
        <Plus className="size-6" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-medium text-white">Add device</span>
    </button>
  );
}

export { AddDeviceCard };
