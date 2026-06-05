import { cn } from "@/lib/utils";

const CHART_HEIGHT_PX = 48;
const ACTIVE_COLOR = "0, 230, 118";
const INACTIVE_COLOR = "58, 63, 74";

type EnergyBarChartProps = {
  values: number[];
  isActive?: boolean;
};

function getBarOpacity(value: number, maxValue: number) {
  const ratio = value / maxValue;
  return 0.15 + ratio * 0.85;
}

function EnergyBarChart({ values, isActive = true }: EnergyBarChartProps) {
  const maxValue = Math.max(...values, 0.01);
  const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <div
      className="flex items-end gap-1"
      style={{ height: CHART_HEIGHT_PX }}
      role="img"
      aria-label={`Energy usage over last 24 hours: ${values.map((value) => `${value.toFixed(2)} kWh`).join(", ")}`}
    >
      {values.map((value, index) => {
        const heightPx = Math.max((value / maxValue) * CHART_HEIGHT_PX, 4);
        const opacity = getBarOpacity(value, maxValue);

        return (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-[3px] transition-[height,background-color]",
            )}
            style={{
              height: heightPx,
              backgroundColor: `rgba(${color}, ${opacity})`,
            }}
            title={`${value.toFixed(2)} kWh`}
          />
        );
      })}
    </div>
  );
}

export { EnergyBarChart };
