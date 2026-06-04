import type { Device } from "@/api/devices/types";
import { RoomColumn } from "@/components/dashboard/RoomColumn";
import { groupDevicesByRoom } from "@/components/dashboard/utils";
import { LayoutGrid } from "lucide-react";

type FavoritesSectionProps = {
  devices: Device[];
  isLoading?: boolean;
  onDeviceToggle: (deviceId: string, isActive: boolean) => void;
};

function FavoritesSection({
  devices,
  isLoading = false,
  onDeviceToggle,
}: FavoritesSectionProps) {
  const rooms = groupDevicesByRoom(devices);

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <LayoutGrid className="size-5 text-[#00E676]" strokeWidth={1.75} />
        <h2 className="text-xl font-semibold text-white">Favorites</h2>
      </div>

      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {rooms.map(({ room, devices: roomDevices }) => (
            <RoomColumn
              key={room.id}
              room={room}
              devices={roomDevices}
              onDeviceToggle={onDeviceToggle}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { FavoritesSection };
