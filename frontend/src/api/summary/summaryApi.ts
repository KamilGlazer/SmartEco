import { getMockEnergySummary } from "@/api/summary/mock";
import type { EnergyRange, EnergySummary } from "@/api/summary/types";

const FETCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchEnergySummary(
  range: EnergyRange
): Promise<EnergySummary> {
  await delay(FETCH_DELAY_MS);
  return getMockEnergySummary(range);
}

export { fetchEnergySummary };
