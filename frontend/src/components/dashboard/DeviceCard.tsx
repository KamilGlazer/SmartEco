import type { Device } from "@/api/devices/types";
import {
  getDeviceIcon,
  getDeviceStatusLabel,
} from "@/components/dashboard/deviceMeta";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type DeviceCardProps = {
  device: Device;
  onToggle: (deviceId: string, isActive: boolean) => void;
};

function DeviceCard({ device, onToggle }: DeviceCardProps) {
  const Icon = getDeviceIcon(device.id);
  const statusLabel = getDeviceStatusLabel(device.id, device.is_active);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-[#161616] px-4 py-3 transition-[border-color,box-shadow]",
        device.is_active
          ? "border-[#00E676]/50 shadow-[0_0_16px_rgba(0,230,118,0.12)]"
          : "border-white/10"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg",
          device.is_active
            ? "text-[#00E676]"
            : "text-[#8C929F]"
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{device.name}</p>
        <p
          className={cn(
            "truncate text-xs",
            device.is_active ? "text-[#00E676]" : "text-[#8C929F]"
          )}
        >
          {statusLabel}
        </p>
      </div>

      <Switch
        checked={device.is_active}
        onCheckedChange={(checked) => onToggle(device.id, checked)}
        className="data-checked:bg-[#00E676] data-unchecked:bg-[#3a3f4a]"
      />
    </div>
  );
}

export { DeviceCard };
