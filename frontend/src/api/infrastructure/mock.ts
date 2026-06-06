import type {
  InfrastructureDevice,
  InfrastructureFilters,
} from "@/api/infrastructure/types";

const mockInfrastructureDevices: InfrastructureDevice[] = [
  {
    id: "device-oled-tv",
    name: "OLED Smart TV",
    room: { id: "room-living-room", name: "Living Room" },
    deviceType: "display",
    is_active: true,
    energy24hKwh: 1.2,
    energyHistory: [0.05, 0.06, 0.08, 0.1, 0.15, 0.38, 0.38],
  },
  {
    id: "device-eco-thermostat",
    name: "Eco Thermostat",
    room: { id: "room-whole-house", name: "Whole House" },
    deviceType: "climate",
    is_active: true,
    energy24hKwh: 4.8,
    energyHistory: [0.95, 0.82, 0.45, 0.38, 0.42, 0.88, 0.9],
  },
  {
    id: "device-led-array",
    name: "LED Array",
    room: { id: "room-kitchen", name: "Kitchen" },
    deviceType: "lighting",
    is_active: false,
    energy24hKwh: 0.4,
    energyHistory: [0.06, 0.05, 0.07, 0.08, 0.05, 0.04, 0.05],
  },
];

const infrastructureFilters: InfrastructureFilters = {
  rooms: [
    { value: "room-living-room", label: "Living Room" },
    { value: "room-whole-house", label: "Whole House" },
    { value: "room-kitchen", label: "Kitchen" },
  ],
  deviceTypes: [
    { value: "display", label: "Display" },
    { value: "climate", label: "Climate" },
    { value: "lighting", label: "Lighting" },
    { value: "appliance", label: "Appliance" },
  ],
};

function getMockInfrastructureDevices(): InfrastructureDevice[] {
  return mockInfrastructureDevices.map((device) => ({
    ...device,
    room: { ...device.room },
    energyHistory: [...device.energyHistory],
  }));
}

function getMockInfrastructureFilters(): InfrastructureFilters {
  return {
    rooms: infrastructureFilters.rooms.map((option) => ({ ...option })),
    deviceTypes: infrastructureFilters.deviceTypes.map((option) => ({
      ...option,
    })),
  };
}

function updateMockInfrastructureDevice(
  deviceId: string,
  isActive: boolean,
): InfrastructureDevice | undefined {
  const device = mockInfrastructureDevices.find((item) => item.id === deviceId);

  if (!device) {
    return undefined;
  }

  device.is_active = isActive;
  return {
    ...device,
    room: { ...device.room },
    energyHistory: [...device.energyHistory],
  };
}

export {
  getMockInfrastructureDevices,
  getMockInfrastructureFilters,
  mockInfrastructureDevices,
  updateMockInfrastructureDevice,
};
