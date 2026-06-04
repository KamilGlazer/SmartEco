import type { EnergyRange, EnergySummary } from "@/api/summary/types";

const PRICE_PER_KWH = 0.68;

const energyByRange: Record<
  EnergyRange,
  Omit<EnergySummary, "range" | "pricePerKwh" | "savedPln">
> = {
  today: {
    livePowerKw: 2.45,
    consumptionKwh: 12.4,
    savedKwh: 12.5,
  },
  week: {
    livePowerKw: 2.18,
    consumptionKwh: 86.7,
    savedKwh: 41.2,
  },
  month: {
    livePowerKw: 2.32,
    consumptionKwh: 342.9,
    savedKwh: 118.6,
  },
};

function getMockEnergySummary(range: EnergyRange): EnergySummary {
  const data = energyByRange[range];

  return {
    range,
    pricePerKwh: PRICE_PER_KWH,
    ...data,
    savedPln: Number((data.savedKwh * PRICE_PER_KWH).toFixed(2)),
  };
}

export { PRICE_PER_KWH, energyByRange, getMockEnergySummary };
