import {
  createMockAutomation,
  deleteMockAutomation,
  getMockAutomation,
  getMockAutomations,
  pickRandomActionOptions,
  pickRandomTriggerOptions,
  saveMockAutomation,
} from "@/api/automations/mock";
import type {
  ActionTemplate,
  Automation,
  AutomationSummary,
  SaveAutomationPayload,
  TriggerTemplate,
} from "@/api/automations/types";

const FETCH_DELAY_MS = 100;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchAutomations(): Promise<AutomationSummary[]> {
  await delay(FETCH_DELAY_MS);
  return getMockAutomations();
}

async function fetchAutomation(id: string): Promise<Automation | null> {
  await delay(FETCH_DELAY_MS);
  return getMockAutomation(id);
}

async function createAutomation(): Promise<Automation> {
  await delay(FETCH_DELAY_MS);
  return createMockAutomation();
}

async function saveAutomation(
  id: string,
  payload: SaveAutomationPayload,
): Promise<Automation | null> {
  await delay(FETCH_DELAY_MS);
  return saveMockAutomation(id, payload);
}

async function deleteAutomation(id: string): Promise<boolean> {
  await delay(FETCH_DELAY_MS);
  return deleteMockAutomation(id);
}

async function fetchRandomTriggerOptions(): Promise<TriggerTemplate[]> {
  await delay(FETCH_DELAY_MS);
  return pickRandomTriggerOptions();
}

async function fetchRandomActionOptions(): Promise<ActionTemplate[]> {
  await delay(FETCH_DELAY_MS);
  return pickRandomActionOptions();
}

export {
  createAutomation,
  deleteAutomation,
  fetchAutomation,
  fetchAutomations,
  fetchRandomActionOptions,
  fetchRandomTriggerOptions,
  saveAutomation,
};
