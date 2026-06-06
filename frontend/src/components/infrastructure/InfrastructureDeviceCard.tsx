import type { InfrastructureDevice } from "@/api/infrastructure/types";
import { EnergyBarChart } from "@/components/infrastructure/EnergyBarChart";
import { getInfrastructureDeviceIcon } from "@/components/infrastructure/deviceMeta";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type InfrastructureDeviceCardProps = {
  device: InfrastructureDevice;
  onToggle: (deviceId: string, isActive: boolean) => void;
  isToggling?: boolean;
};

function InfrastructureDeviceCard({
  device,
  onToggle,
  isToggling = false,
}: InfrastructureDeviceCardProps) {
  const Icon = getInfrastructureDeviceIcon(device.id);

  return (
    <article
      className={cn(
        "flex flex-col rounded-lg border bg-[#161616] p-5 transition-[border-color,box-shadow]",
        device.is_active
          ? "border-[#00E676]/50 shadow-[0_0_20px_rgba(0,230,118,0.12)]"
          : "border-white/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              device.is_active ? "text-[#00E676]" : "text-[#8C929F]",
            )}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <p className="truncate text-sm font-semibold text-white">
            {device.name}
          </p>
        </div>

        <Switch
          checked={device.is_active}
          disabled={isToggling}
          onCheckedChange={(checked) => onToggle(device.id, checked)}
          className="data-checked:bg-[#00E676] data-unchecked:bg-[#3a3f4a]"
        />
      </div>

      <p className="mt-3 text-xs text-[#8C929F]">{device.room.name}</p>

      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-xs font-medium text-[#8C929F]">
          Energy 24h
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            device.is_active ? "text-[#00E676]" : "text-[#8C929F]",
          )}
        >
          {device.energy24hKwh.toFixed(1)} kWh
        </p>
      </div>

      <div className="mt-4">
        <EnergyBarChart
          values={device.energyHistory}
          isActive={device.is_active}
        />
      </div>
    </article>
  );
}

export { InfrastructureDeviceCard };
