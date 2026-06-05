import type { TopConsumer } from "@/api/energy-analysis/types";
import { getConsumerIcon } from "@/components/energy-analysis/consumerMeta";

type ConsumerRowProps = {
  consumer: TopConsumer;
};

function ConsumerRow({ consumer }: ConsumerRowProps) {
  const Icon = getConsumerIcon(consumer.id);

  return (
    <div className="flex items-center gap-4 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1f1f1f] text-[#00E676]">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">
          {consumer.name}
        </p>
        <p className="truncate text-xs text-[#8C929F]">{consumer.category}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-white">
          {consumer.kwh.toFixed(1)} kWh
        </p>
        <p className="text-xs font-medium text-[#00E676]">
          {consumer.sharePercent}%
        </p>
      </div>
    </div>
  );
}

export { ConsumerRow };
