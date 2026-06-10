import { Bluetooth, List } from "lucide-react";

type AddDeviceMethod = "bluetooth" | "manual";

type AddDeviceMethodSelectProps = {
  onSelect: (method: AddDeviceMethod) => void;
};

const METHODS = [
  {
    id: "bluetooth" as const,
    title: "Search via Bluetooth",
    description: "Find nearby smart devices automatically.",
    icon: Bluetooth,
  },
  {
    id: "manual" as const,
    title: "Manual Selection",
    description: "Select your device from a categorized list.",
    icon: List,
  },
];

function AddDeviceMethodSelect({ onSelect }: AddDeviceMethodSelectProps) {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {METHODS.map(({ id, title, description, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-white/10 bg-[#161616] px-6 py-8 text-center transition-colors hover:border-[#00E676]/40 hover:bg-[#101810]"
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/10 text-[#8C929F]">
            <Icon className="size-6" strokeWidth={1.75} />
          </span>
          <span className="space-y-2">
            <span className="block text-base font-semibold text-white">
              {title}
            </span>
            <span className="block text-sm text-[#8C929F]">{description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export { AddDeviceMethodSelect };
export type { AddDeviceMethod };
