export type AnalysisPeriod = "last-7-days" | "last-30-days" | "last-90-days";

export interface PowerDataPoint {
  label: string;
  kwh: number;
}

export interface PowerConsumption {
  period: AnalysisPeriod;
  periodLabel: string;
  subtitle: string;
  trendPercent: number;
  trendLabel: string;
  highlightIndex: number;
  dataPoints: PowerDataPoint[];
}

export interface FinancialImpact {
  totalPln: number;
  budgetTargetPln: number;
  budgetUtilizationPercent: number;
  peakHoursPln: number;
  offPeakPln: number;
}

export interface TopConsumer {
  id: string;
  name: string;
  category: string;
  kwh: number;
  sharePercent: number;
}

export interface PeriodOption {
  value: AnalysisPeriod;
  label: string;
}

export interface EnergyAnalysisData {
  powerConsumption: PowerConsumption;
  financialImpact: FinancialImpact;
  topConsumers: TopConsumer[];
  periodOptions: PeriodOption[];
}
