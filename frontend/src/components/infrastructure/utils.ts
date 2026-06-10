import type { InfrastructureDevice } from "@/api/infrastructure/types";

const ALL_FILTER_VALUE = "";

const ALL_ROOMS_OPTION = { value: ALL_FILTER_VALUE, label: "All rooms" };
const ALL_DEVICE_TYPES_OPTION = {
  value: ALL_FILTER_VALUE,
  label: "All types",
};

function filterInfrastructureDevices(
  devices: InfrastructureDevice[],
  roomFilter: string,
  deviceTypeFilter: string,
): InfrastructureDevice[] {
  return devices.filter((device) => {
    const matchesRoom =
      !roomFilter || roomFilter === ALL_FILTER_VALUE
        ? true
        : device.room.id === roomFilter;
    const matchesType =
      !deviceTypeFilter || deviceTypeFilter === ALL_FILTER_VALUE
        ? true
        : device.deviceType === deviceTypeFilter;

    return matchesRoom && matchesType;
  });
}

export {
  ALL_DEVICE_TYPES_OPTION,
  ALL_FILTER_VALUE,
  ALL_ROOMS_OPTION,
  filterInfrastructureDevices,
};
