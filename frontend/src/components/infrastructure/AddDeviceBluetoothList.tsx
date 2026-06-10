import type { DiscoveredBluetoothDevice } from "@/api/infrastructure/types";
import { getInfrastructureDeviceIcon } from "@/components/infrastructure/deviceMeta";
import { cn } from "@/lib/utils";
import { Bluetooth } from "lucide-react";

type AddDeviceBluetoothListProps = {
  devices: DiscoveredBluetoothDevice[];
  isLoading?: boolean;
  addingDeviceId?: string | null;
  onSelectDevice: (deviceId: string) => void;
};

function AddDeviceBluetoothList({
  devices,
  isLoading = false,
  addingDeviceId = null,
  onSelectDevice,
}: AddDeviceBluetoothListProps) {
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <div className="mb-2 flex items-center gap-2 text-sm text-[#8C929F]">
        <Bluetooth className="size-4 text-[#00E676]" strokeWidth={1.75} />
        Found {devices.length} nearby devices
      </div>

      {devices.map((device) => {
        const Icon = getInfrastructureDeviceIcon(device.id);
        const isAdding = addingDeviceId === device.id;

        return (
          <button
            key={device.id}
            type="button"
            onClick={() => onSelectDevice(device.id)}
            disabled={Boolean(addingDeviceId)}
            className={cn(
              "flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-[#161616] px-4 py-4 text-left transition-colors hover:border-[#00E676]/40 hover:bg-[#101810] disabled:pointer-events-none disabled:opacity-50",
              isAdding && "border-[#00E676]/40",
            )}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1f1f1f] text-[#00E676]">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-white">
                {device.name}
              </span>
              <span className="mt-0.5 block text-xs text-[#8C929F]">
                {device.room} · {device.signalLabel}
              </span>
            </span>
            <span className="text-xs font-medium text-[#00E676]">
              {isAdding ? "Adding..." : "Add"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { AddDeviceBluetoothList };
