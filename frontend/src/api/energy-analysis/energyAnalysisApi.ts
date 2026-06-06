import { getMockEnergyAnalysis } from "@/api/energy-analysis/mock";
import type {
  AnalysisPeriod,
  EnergyAnalysisData,
} from "@/api/energy-analysis/types";

const FETCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchEnergyAnalysis(
  period: AnalysisPeriod = "last-30-days",
): Promise<EnergyAnalysisData> {
  await delay(FETCH_DELAY_MS);
  return getMockEnergyAnalysis(period);
}

export { fetchEnergyAnalysis };
