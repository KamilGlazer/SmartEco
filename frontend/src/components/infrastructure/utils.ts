import type { InfrastructureDevice } from "@/api/infrastructure/types";

function filterInfrastructureDevices(
  devices: InfrastructureDevice[],
  roomFilter: string,
  deviceTypeFilter: string,
): InfrastructureDevice[] {
  return devices.filter((device) => {
    const matchesRoom = !roomFilter || device.room.id === roomFilter;
    const matchesType =
      !deviceTypeFilter || device.deviceType === deviceTypeFilter;

    return matchesRoom && matchesType;
  });
}

export { filterInfrastructureDevices };
