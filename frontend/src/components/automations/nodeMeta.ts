import type { AutomationNodeCategory } from "@/api/automations/types";
import type { LucideIcon } from "lucide-react";
import { Clock, Lightbulb, Moon, Snowflake, Thermometer } from "lucide-react";

type NodeMeta = {
  icon: LucideIcon;
  label: string;
  accentClassName: string;
};

const NODE_META: Record<AutomationNodeCategory, NodeMeta> = {
  time: {
    icon: Clock,
    label: "Time",
    accentClassName: "text-[#00E676]",
  },
  sensor: {
    icon: Thermometer,
    label: "Sensor",
    accentClassName: "text-[#FFA726]",
  },
  scene: {
    icon: Moon,
    label: "Scene",
    accentClassName: "text-[#00E676]",
  },
  hvac: {
    icon: Snowflake,
    label: "HVAC",
    accentClassName: "text-[#80DEEA]",
  },
  light: {
    icon: Lightbulb,
    label: "Light",
    accentClassName: "text-[#FFD54F]",
  },
};

function getNodeMeta(category: AutomationNodeCategory): NodeMeta {
  return NODE_META[category];
}

export { getNodeMeta };
