import type { TopConsumer } from "@/api/energy-analysis/types";
import { ConsumerRow } from "@/components/energy-analysis/ConsumerRow";
import { Card, CardContent } from "@/components/ui/card";

type TopConsumersSectionProps = {
  consumers: TopConsumer[];
  isLoading?: boolean;
};

function TopConsumersSection({
  consumers,
  isLoading = false,
}: TopConsumersSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Top Power Consumers</h2>

      <Card className="border-white/10 bg-[#161616] py-0 ring-0">
        <CardContent className="px-6 py-2">
          {isLoading ? (
            <div className="space-y-4 py-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg bg-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {consumers.map((consumer) => (
                <ConsumerRow key={consumer.id} consumer={consumer} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

export { TopConsumersSection };
