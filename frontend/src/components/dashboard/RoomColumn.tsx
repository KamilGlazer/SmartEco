import type { Device, Room } from "@/api/devices/types";
import { DeviceCard } from "@/components/dashboard/DeviceCard";
import { countActiveDevices } from "@/components/dashboard/utils";
import { Badge } from "@/components/ui/badge";

type RoomColumnProps = {
  room: Room;
  devices: Device[];
  onDeviceToggle: (deviceId: string, isActive: boolean) => void;
};

function RoomColumn({ room, devices, onDeviceToggle }: RoomColumnProps) {
  const activeCount = countActiveDevices(devices);

  return (
    <section className="flex min-w-[260px] flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-white">{room.name}</h3>
        <Badge
          variant="secondary"
          className="rounded-md border border-white/10 bg-[#1f1f1f] px-2 py-0.5 text-xs font-normal text-[#8C929F]"
        >
          {activeCount} Active
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={onDeviceToggle}
          />
        ))}
      </div>
    </section>
  );
}

export { RoomColumn };
