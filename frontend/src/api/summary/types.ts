export type EnergyRange = "today" | "week" | "month";

export interface EnergySummary {
  range: EnergyRange;
  livePowerKw: number;
  consumptionKwh: number;
  pricePerKwh: number;
  savedKwh: number;
  savedPln: number;
}
