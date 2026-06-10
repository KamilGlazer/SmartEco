export type TriggerCategory = "time" | "sensor";

export type ActionCategory = "scene" | "hvac" | "light";

export type AutomationNodeCategory = TriggerCategory | ActionCategory;

export interface AutomationTrigger {
  id: string;
  category: TriggerCategory;
  title: string;
  subtitle: string;
}

export interface AutomationAction {
  id: string;
  category: ActionCategory;
  title: string;
  subtitle: string;
}

export interface AutomationConnection {
  triggerId: string;
  actionId: string;
}

export interface Automation {
  id: string;
  name: string;
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  connections: AutomationConnection[];
}

export interface AutomationSummary {
  id: string;
  name: string;
  triggerCount: number;
  actionCount: number;
}

export interface SaveAutomationPayload {
  name: string;
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  connections: AutomationConnection[];
}

export type TriggerTemplate = Omit<AutomationTrigger, "id">;
export type ActionTemplate = Omit<AutomationAction, "id">;
