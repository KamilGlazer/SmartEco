import type {
  AddManualDevicePayload,
  DiscoveredBluetoothDevice,
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

const bluetoothDevices: DiscoveredBluetoothDevice[] = [
  {
    id: "bt-air-purifier",
    name: "Air Purifier X1",
    room: "Bedroom",
    deviceType: "appliance",
    signalLabel: "Strong signal",
  },
  {
    id: "bt-smart-bulb",
    name: "Smart Bulb RGB",
    room: "Living Room",
    deviceType: "lighting",
    signalLabel: "Nearby",
  },
  {
    id: "bt-climate-sensor",
    name: "Climate Sensor",
    room: "Kitchen",
    deviceType: "climate",
    signalLabel: "Moderate signal",
  },
];

function resolveRoom(roomName: string): { id: string; name: string } {
  const existing = infrastructureFilters.rooms.find(
    (option) => option.label.toLowerCase() === roomName.trim().toLowerCase(),
  );

  if (existing) {
    return { id: existing.value, name: existing.label };
  }

  const room = {
    id: `room-${roomName.trim().toLowerCase().replace(/\s+/g, "-")}`,
    name: roomName.trim(),
  };

  infrastructureFilters.rooms.push({ value: room.id, label: room.name });
  return room;
}

function createInfrastructureDevice(
  input: {
    name: string;
    room: string;
    deviceType: InfrastructureDevice["deviceType"];
    ipAddress?: string;
  },
): InfrastructureDevice {
  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    room: resolveRoom(input.room),
    deviceType: input.deviceType,
    is_active: false,
    energy24hKwh: 0,
    energyHistory: [0, 0, 0, 0, 0, 0, 0],
    ipAddress: input.ipAddress?.trim() || undefined,
  };
}

function getMockBluetoothDevices(): DiscoveredBluetoothDevice[] {
  return bluetoothDevices.map((device) => ({ ...device }));
}

function addMockInfrastructureDeviceFromBluetooth(
  deviceId: string,
): InfrastructureDevice | null {
  const discovered = bluetoothDevices.find((device) => device.id === deviceId);
  if (!discovered) return null;

  const device = createInfrastructureDevice({
    name: discovered.name,
    room: discovered.room,
    deviceType: discovered.deviceType,
  });

  mockInfrastructureDevices.push(device);
  return {
    ...device,
    room: { ...device.room },
    energyHistory: [...device.energyHistory],
  };
}

function addMockInfrastructureDeviceManual(
  payload: AddManualDevicePayload,
): InfrastructureDevice {
  const device = createInfrastructureDevice({
    name: payload.name,
    room: payload.room,
    deviceType: "appliance",
    ipAddress: payload.ipAddress,
  });

  mockInfrastructureDevices.push(device);
  return {
    ...device,
    room: { ...device.room },
    energyHistory: [...device.energyHistory],
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
  addMockInfrastructureDeviceFromBluetooth,
  addMockInfrastructureDeviceManual,
  getMockBluetoothDevices,
  getMockInfrastructureDevices,
  getMockInfrastructureFilters,
  mockInfrastructureDevices,
  updateMockInfrastructureDevice,
};
