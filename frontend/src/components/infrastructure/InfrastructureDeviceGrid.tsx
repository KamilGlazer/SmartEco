import type { InfrastructureDevice } from "@/api/infrastructure/types";
import { AddDeviceCard } from "@/components/infrastructure/AddDeviceCard";
import { InfrastructureDeviceCard } from "@/components/infrastructure/InfrastructureDeviceCard";

type InfrastructureDeviceGridProps = {
  devices: InfrastructureDevice[];
  isLoading?: boolean;
  togglingDeviceId?: string | null;
  onDeviceToggle: (deviceId: string, isActive: boolean) => void;
};

function InfrastructureDeviceGrid({
  devices,
  isLoading = false,
  togglingDeviceId = null,
  onDeviceToggle,
}: InfrastructureDeviceGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[220px] animate-pulse rounded-xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {devices.map((device) => (
        <InfrastructureDeviceCard
          key={device.id}
          device={device}
          onToggle={onDeviceToggle}
          isToggling={togglingDeviceId === device.id}
        />
      ))}
      <AddDeviceCard />
    </div>
  );
}

export { InfrastructureDeviceGrid };
