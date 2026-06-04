import type { DeviceStatus } from "@/api/devices/types";
import type { LucideIcon } from "lucide-react";
import {
  Coffee,
  Fan,
  Lightbulb,
  Refrigerator,
  Tv,
  Wind,
} from "lucide-react";

const DEVICE_ICONS: Record<string, LucideIcon> = {
  "device-main-lights": Lightbulb,
  "device-ac-unit": Wind,
  "device-smart-tv": Tv,
  "device-refrigerator": Refrigerator,
  "device-coffee-machine": Coffee,
  "device-ceiling-fan": Fan,
};

const DEVICE_STATUS_LABELS: Record<string, string> = {
  "device-main-lights": "On • 75%",
  "device-ac-unit": "Cooling • 22°C",
  "device-smart-tv": "Off • Standby",
  "device-refrigerator": "Eco Mode • 4°C",
  "device-coffee-machine": "Off",
  "device-ceiling-fan": "Off",
};

const DEVICE_DEFAULT_STATUS: Record<string, DeviceStatus> = {
  "device-main-lights": "on",
  "device-ac-unit": "cooling",
  "device-smart-tv": "off",
  "device-refrigerator": "on",
  "device-coffee-machine": "off",
  "device-ceiling-fan": "off",
};

const ROOM_ORDER = [
  "room-living-room",
  "room-kitchen",
  "room-bedroom",
] as const;

function getDeviceIcon(deviceId: string): LucideIcon {
  return DEVICE_ICONS[deviceId] ?? Lightbulb;
}

function getDeviceStatusLabel(deviceId: string, isActive: boolean): string {
  const label = DEVICE_STATUS_LABELS[deviceId];

  if (!isActive) {
    return label?.toLowerCase().startsWith("off") ? label : "Off";
  }

  return label ?? "On";
}

export {
  DEVICE_DEFAULT_STATUS,
  ROOM_ORDER,
  getDeviceIcon,
  getDeviceStatusLabel,
};
