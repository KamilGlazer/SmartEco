import type {
  AnalysisPeriod,
  EnergyAnalysisData,
  PowerConsumption,
} from "@/api/energy-analysis/types";

const periodOptions = [
  { value: "last-7-days" as const, label: "Last 7 Days" },
  { value: "last-30-days" as const, label: "Last 30 Days" },
  { value: "last-90-days" as const, label: "Last 90 Days" },
];

const powerConsumptionByPeriod: Record<AnalysisPeriod, PowerConsumption> = {
  "last-7-days": {
    period: "last-7-days",
    periodLabel: "Last 7 Days",
    subtitle: "Last 7 Days (kWh)",
    trendPercent: -6,
    trendLabel: "6% vs last wk",
    highlightIndex: 4,
    dataPoints: [
      { label: "MON", kwh: 11.2 },
      { label: "TUE", kwh: 13.8 },
      { label: "WED", kwh: 10.4 },
      { label: "THU", kwh: 15.1 },
      { label: "FRI", kwh: 17.6 },
      { label: "SAT", kwh: 14.3 },
      { label: "SUN", kwh: 12.9 },
    ],
  },
  "last-30-days": {
    period: "last-30-days",
    periodLabel: "Last 30 Days",
    subtitle: "Last 30 Days (kWh)",
    trendPercent: -12,
    trendLabel: "12% vs last mo",
    highlightIndex: 3,
    dataPoints: [
      { label: "01 OCT", kwh: 10.4 },
      { label: "08 OCT", kwh: 14.2 },
      { label: "15 OCT", kwh: 9.6 },
      { label: "22 OCT", kwh: 18.8 },
      { label: "30 OCT", kwh: 15.3 },
    ],
  },
  "last-90-days": {
    period: "last-90-days",
    periodLabel: "Last 90 Days",
    subtitle: "Last 90 Days (kWh)",
    trendPercent: -4,
    trendLabel: "4% vs last qtr",
    highlightIndex: 5,
    dataPoints: [
      { label: "AUG", kwh: 92 },
      { label: "SEP", kwh: 108 },
      { label: "OCT", kwh: 96 },
      { label: "NOV", kwh: 124 },
      { label: "DEC", kwh: 118 },
      { label: "JAN", kwh: 132 },
    ],
  },
};

const financialImpact = {
  totalPln: 342.5,
  budgetTargetPln: 500,
  budgetUtilizationPercent: 68,
  peakHoursPln: 140.2,
  offPeakPln: 202.3,
};

const topConsumers = [
  {
    id: "consumer-hvac",
    name: "Central HVAC",
    category: "Climate Control",
    kwh: 142.5,
    sharePercent: 42,
  },
  {
    id: "consumer-water-heater",
    name: "Water Heater",
    category: "Utility",
    kwh: 85.2,
    sharePercent: 25,
  },
  {
    id: "consumer-ev-charger",
    name: "EV Charger",
    category: "Garage",
    kwh: 65.0,
    sharePercent: 19,
  },
];

function getMockEnergyAnalysis(period: AnalysisPeriod): EnergyAnalysisData {
  const powerConsumption = powerConsumptionByPeriod[period];

  return {
    powerConsumption: {
      ...powerConsumption,
      dataPoints: powerConsumption.dataPoints.map((point) => ({ ...point })),
    },
    financialImpact: { ...financialImpact },
    topConsumers: topConsumers.map((consumer) => ({ ...consumer })),
    periodOptions: periodOptions.map((option) => ({ ...option })),
  };
}

export {
  getMockEnergyAnalysis,
  periodOptions as defaultPeriodOptions,
  powerConsumptionByPeriod,
};
