import type { Device, Room } from "@/api/devices/types";

import { ROOM_ORDER } from "@/components/dashboard/deviceMeta";

type DevicesByRoom = {
  room: Room;
  devices: Device[];
};

function groupDevicesByRoom(devices: Device[]): DevicesByRoom[] {
  const grouped = new Map<string, DevicesByRoom>();

  for (const device of devices) {
    const existing = grouped.get(device.room.id);

    if (existing) {
      existing.devices.push(device);
      continue;
    }

    grouped.set(device.room.id, {
      room: device.room,
      devices: [device],
    });
  }

  return Array.from(grouped.values()).sort((a, b) => {
    const indexA = ROOM_ORDER.indexOf(
      a.room.id as (typeof ROOM_ORDER)[number]
    );
    const indexB = ROOM_ORDER.indexOf(
      b.room.id as (typeof ROOM_ORDER)[number]
    );

    if (indexA === -1 && indexB === -1) {
      return a.room.name.localeCompare(b.room.name);
    }

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

function countActiveDevices(devices: Device[]) {
  return devices.filter((device) => device.is_active).length;
}

export { groupDevicesByRoom, countActiveDevices };
