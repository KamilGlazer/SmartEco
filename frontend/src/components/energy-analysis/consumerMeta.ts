import type { LucideIcon } from "lucide-react";
import { Car, Droplets, Wind } from "lucide-react";

const CONSUMER_ICONS: Record<string, LucideIcon> = {
  "consumer-hvac": Wind,
  "consumer-water-heater": Droplets,
  "consumer-ev-charger": Car,
};

function getConsumerIcon(consumerId: string): LucideIcon {
  return CONSUMER_ICONS[consumerId] ?? Wind;
}

export { getConsumerIcon };
