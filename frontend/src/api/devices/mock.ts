import type { Device } from "@/api/devices/types";

const mockDevices: Device[] = [
  {
    id: "device-main-lights",
    is_favorite: true,
    is_active: true,
    name: "Main Lights",
    status: "on",
    details: { todayKwh: 1.2, weekKwh: 8.4, monthKwh: 32.1 },
    room: { id: "room-living-room", name: "Living Room" },
  },
  {
    id: "device-ac-unit",
    is_favorite: true,
    is_active: true,
    name: "AC Unit",
    status: "cooling",
    details: { todayKwh: 4.8, weekKwh: 31.2, monthKwh: 124.5 },
    room: { id: "room-living-room", name: "Living Room" },
  },
  {
    id: "device-smart-tv",
    is_favorite: true,
    is_active: false,
    name: "Smart TV",
    status: "off",
    details: { todayKwh: 0.3, weekKwh: 2.1, monthKwh: 9.8 },
    room: { id: "room-living-room", name: "Living Room" },
  },
  {
    id: "device-refrigerator",
    is_favorite: true,
    is_active: true,
    name: "Refrigerator",
    status: "on",
    details: { todayKwh: 2.1, weekKwh: 14.6, monthKwh: 58.3 },
    room: { id: "room-kitchen", name: "Kitchen" },
  },
  {
    id: "device-coffee-machine",
    is_favorite: true,
    is_active: false,
    name: "Coffee Machine",
    status: "off",
    details: { todayKwh: 0.1, weekKwh: 0.9, monthKwh: 3.4 },
    room: { id: "room-kitchen", name: "Kitchen" },
  },
  {
    id: "device-ceiling-fan",
    is_favorite: true,
    is_active: false,
    name: "Ceiling Fan",
    status: "off",
    details: { todayKwh: 0, weekKwh: 0.4, monthKwh: 1.9 },
    room: { id: "room-bedroom", name: "Bedroom" },
  },
  {
    id: "device-garage-door",
    is_favorite: false,
    is_active: false,
    name: "Garage Door",
    status: "off",
    details: { todayKwh: 0.05, weekKwh: 0.3, monthKwh: 1.2 },
    room: { id: "room-garage", name: "Garage" },
  },
  {
    id: "device-washing-machine",
    is_favorite: false,
    is_active: false,
    name: "Washing Machine",
    status: "off",
    details: { todayKwh: 0, weekKwh: 1.8, monthKwh: 7.6 },
    room: { id: "room-utility", name: "Utility Room" },
  },
];

function getMockDevices(): Device[] {
  return mockDevices.map((device) => ({
    ...device,
    details: { ...device.details },
    room: { ...device.room },
  }));
}

function getMockFavoriteDevices(): Device[] {
  return getMockDevices().filter((device) => device.is_favorite);
}

function getMockDeviceById(id: string): Device | undefined {
  return getMockDevices().find((device) => device.id === id);
}

export {
  mockDevices,
  getMockDevices,
  getMockFavoriteDevices,
  getMockDeviceById,
};
