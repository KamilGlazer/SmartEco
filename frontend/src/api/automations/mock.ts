import type {
  ActionTemplate,
  Automation,
  AutomationAction,
  AutomationConnection,
  AutomationSummary,
  AutomationTrigger,
  SaveAutomationPayload,
  TriggerTemplate,
} from "@/api/automations/types";

const triggerPool: TriggerTemplate[] = [
  { category: "time", title: "After 10:00 PM", subtitle: "Every day" },
  { category: "sensor", title: "Temp > 22°C", subtitle: "Living Room" },
  { category: "sensor", title: "Humidity > 60%", subtitle: "Bathroom" },
  { category: "time", title: "Before 7:00 AM", subtitle: "Weekdays" },
  { category: "sensor", title: "Motion detected", subtitle: "Hallway" },
  { category: "time", title: "At sunset", subtitle: "Every day" },
  { category: "sensor", title: "Door opened", subtitle: "Front door" },
  { category: "sensor", title: "CO₂ > 800 ppm", subtitle: "Bedroom" },
  { category: "time", title: "Every 30 minutes", subtitle: "While away" },
  { category: "sensor", title: "Light level < 20%", subtitle: "Kitchen" },
];

const actionPool: ActionTemplate[] = [
  {
    category: "scene",
    title: "Night Mode",
    subtitle: "Turn off lights, lock doors",
  },
  { category: "hvac", title: "Set Thermostat", subtitle: "Target: 20°C" },
  { category: "light", title: "Dim Lights", subtitle: "Living Room: 30%" },
  { category: "hvac", title: "Eco Mode", subtitle: "All zones" },
  {
    category: "scene",
    title: "Movie Time",
    subtitle: "Close blinds, dim lights",
  },
  { category: "light", title: "Turn On Lights", subtitle: "Hallway: 100%" },
  { category: "scene", title: "Away Mode", subtitle: "Arm security, lights off" },
  { category: "hvac", title: "Cool Down", subtitle: "Target: 18°C" },
  { category: "light", title: "Warm White", subtitle: "Bedroom: 2700K" },
  { category: "scene", title: "Morning Routine", subtitle: "Open blinds, brew coffee" },
];

let mockAutomations: Automation[] = [
  {
    id: "automation-evening-energy-saver",
    name: "Evening Energy Saver",
    triggers: [
      {
        id: "trigger-after-10pm",
        category: "time",
        title: "After 10:00 PM",
        subtitle: "Every day",
      },
      {
        id: "trigger-temp-living-room",
        category: "sensor",
        title: "Temp > 22°C",
        subtitle: "Living Room",
      },
    ],
    actions: [
      {
        id: "action-night-mode",
        category: "scene",
        title: "Night Mode",
        subtitle: "Turn off lights, lock doors",
      },
      {
        id: "action-set-thermostat",
        category: "hvac",
        title: "Set Thermostat",
        subtitle: "Target: 20°C",
      },
    ],
    connections: [
      { triggerId: "trigger-after-10pm", actionId: "action-night-mode" },
      { triggerId: "trigger-after-10pm", actionId: "action-set-thermostat" },
    ],
  },
  {
    id: "automation-morning-boost",
    name: "Morning Boost",
    triggers: [
      {
        id: "trigger-before-7am",
        category: "time",
        title: "Before 7:00 AM",
        subtitle: "Weekdays",
      },
    ],
    actions: [
      {
        id: "action-morning-scene",
        category: "scene",
        title: "Morning Routine",
        subtitle: "Open blinds, brew coffee",
      },
    ],
    connections: [
      { triggerId: "trigger-before-7am", actionId: "action-morning-scene" },
    ],
  },
];

function cloneAutomation(automation: Automation): Automation {
  return {
    ...automation,
    triggers: automation.triggers.map((trigger) => ({ ...trigger })),
    actions: automation.actions.map((action) => ({ ...action })),
    connections: automation.connections.map((connection) => ({ ...connection })),
  };
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function pickRandomTriggerOptions(count = 5): TriggerTemplate[] {
  return shuffleArray(triggerPool).slice(0, count);
}

function pickRandomActionOptions(count = 5): ActionTemplate[] {
  return shuffleArray(actionPool).slice(0, count);
}

function createTriggerFromTemplate(template: TriggerTemplate): AutomationTrigger {
  return { id: crypto.randomUUID(), ...template };
}

function createActionFromTemplate(template: ActionTemplate): AutomationAction {
  return { id: crypto.randomUUID(), ...template };
}

function toAutomationSummary(automation: Automation): AutomationSummary {
  return {
    id: automation.id,
    name: automation.name,
    triggerCount: automation.triggers.length,
    actionCount: automation.actions.length,
  };
}

function getMockAutomations(): AutomationSummary[] {
  return mockAutomations.map(toAutomationSummary);
}

function getMockAutomation(id: string): Automation | null {
  const automation = mockAutomations.find((item) => item.id === id);
  return automation ? cloneAutomation(automation) : null;
}

function createMockAutomation(): Automation {
  const automation: Automation = {
    id: crypto.randomUUID(),
    name: "New Automation",
    triggers: [],
    actions: [],
    connections: [],
  };

  mockAutomations.push(automation);
  return cloneAutomation(automation);
}

function saveMockAutomation(
  id: string,
  payload: SaveAutomationPayload,
): Automation | null {
  const index = mockAutomations.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const automation = cloneAutomation({
    id,
    name: payload.name.trim() || "Untitled Automation",
    triggers: payload.triggers,
    actions: payload.actions,
    connections: payload.connections,
  });

  mockAutomations[index] = automation;
  return cloneAutomation(automation);
}

function deleteMockAutomation(id: string): boolean {
  const initialLength = mockAutomations.length;
  mockAutomations = mockAutomations.filter((item) => item.id !== id);
  return mockAutomations.length < initialLength;
}

function sanitizeConnections(
  triggers: AutomationTrigger[],
  actions: AutomationAction[],
  connections: AutomationConnection[],
): AutomationConnection[] {
  const triggerIds = new Set(triggers.map((trigger) => trigger.id));
  const actionIds = new Set(actions.map((action) => action.id));

  return connections.filter(
    (connection) =>
      triggerIds.has(connection.triggerId) && actionIds.has(connection.actionId),
  );
}

export {
  cloneAutomation,
  createActionFromTemplate,
  createMockAutomation,
  createTriggerFromTemplate,
  deleteMockAutomation,
  getMockAutomation,
  getMockAutomations,
  pickRandomActionOptions,
  pickRandomTriggerOptions,
  sanitizeConnections,
  saveMockAutomation,
};
