import type { LucideIcon } from "lucide-react";
import { Lightbulb, Thermometer, Tv } from "lucide-react";

const INFRASTRUCTURE_DEVICE_ICONS: Record<string, LucideIcon> = {
  "device-oled-tv": Tv,
  "device-eco-thermostat": Thermometer,
  "device-led-array": Lightbulb,
};

function getInfrastructureDeviceIcon(deviceId: string): LucideIcon {
  return INFRASTRUCTURE_DEVICE_ICONS[deviceId] ?? Lightbulb;
}

export { getInfrastructureDeviceIcon };
