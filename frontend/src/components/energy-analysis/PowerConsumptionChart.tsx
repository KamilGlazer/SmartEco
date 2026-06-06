import type { PowerDataPoint } from "@/api/energy-analysis/types";

const CHART_WIDTH = 560;
const CHART_HEIGHT = 180;
const PADDING_X = 8;
const PADDING_Y = 16;

type PowerConsumptionChartProps = {
  dataPoints: PowerDataPoint[];
  highlightIndex: number;
};

function buildChartGeometry(dataPoints: PowerDataPoint[]) {
  const values = dataPoints.map((point) => point.kwh);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = Math.max(maxValue - minValue, 0.01);
  const plotWidth = CHART_WIDTH - PADDING_X * 2;
  const plotHeight = CHART_HEIGHT - PADDING_Y * 2;

  const points = dataPoints.map((point, index) => {
    const x =
      PADDING_X +
      (dataPoints.length === 1
        ? plotWidth / 2
        : (index / (dataPoints.length - 1)) * plotWidth);
    const y =
      PADDING_Y +
      plotHeight -
      ((point.kwh - minValue) / valueRange) * plotHeight;

    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const baselineY = PADDING_Y + plotHeight;
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? PADDING_X} ${baselineY} L ${points[0]?.x ?? PADDING_X} ${baselineY} Z`;

  return { points, linePath, areaPath, baselineY };
}

function PowerConsumptionChart({
  dataPoints,
  highlightIndex,
}: PowerConsumptionChartProps) {
  const { points, linePath, areaPath } = buildChartGeometry(dataPoints);
  const highlightPoint = points[highlightIndex];

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-44 w-full"
      role="img"
      aria-label={`Power consumption chart: ${dataPoints.map((point) => `${point.label} ${point.kwh} kWh`).join(", ")}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="power-area-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0, 230, 118, 0.28)" />
          <stop offset="100%" stopColor="rgba(0, 230, 118, 0.02)" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={PADDING_X}
          x2={CHART_WIDTH - PADDING_X}
          y1={PADDING_Y + (CHART_HEIGHT - PADDING_Y * 2) * ratio}
          y2={PADDING_Y + (CHART_HEIGHT - PADDING_Y * 2) * ratio}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      <path d={areaPath} fill="url(#power-area-gradient)" />
      <path
        d={linePath}
        fill="none"
        stroke="#00E676"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {highlightPoint ? (
        <circle
          cx={highlightPoint.x}
          cy={highlightPoint.y}
          r="5"
          fill="#FF9800"
          stroke="#161616"
          strokeWidth="2"
        />
      ) : null}

      {points.map((point) => (
        <circle
          key={point.label}
          cx={point.x}
          cy={point.y}
          r="3"
          fill="#00E676"
        />
      ))}
    </svg>
  );
}

export { PowerConsumptionChart };
