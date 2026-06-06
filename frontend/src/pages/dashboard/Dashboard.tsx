import { useCallback, useEffect, useState } from "react";

import { fetchFavoriteDevices } from "@/api/devices/devicesApi";
import type { Device } from "@/api/devices/types";
import { fetchEnergySummary } from "@/api/summary/summaryApi";
import type { EnergyRange, EnergySummary } from "@/api/summary/types";
import { DEVICE_DEFAULT_STATUS } from "@/components/dashboard/deviceMeta";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FavoritesSection } from "@/components/dashboard/FavoritesSection";
import { LivePowerCard } from "@/components/dashboard/LivePowerCard";

const Dashboard = () => {
  const [range, setRange] = useState<EnergyRange>("today");
  const [summary, setSummary] = useState<EnergySummary | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isDevicesLoading, setIsDevicesLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setIsSummaryLoading(true);

    fetchEnergySummary(range)
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .finally(() => {
        if (!cancelled) setIsSummaryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [range]);

  useEffect(() => {
    let cancelled = false;

    setIsDevicesLoading(true);

    fetchFavoriteDevices()
      .then((data) => {
        if (!cancelled) setDevices(data);
      })
      .finally(() => {
        if (!cancelled) setIsDevicesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDeviceToggle = useCallback(
    (deviceId: string, isActive: boolean) => {
      setDevices((current) =>
        current.map((device) =>
          device.id === deviceId
            ? {
                ...device,
                is_active: isActive,
                status: isActive
                  ? (DEVICE_DEFAULT_STATUS[deviceId] ?? "on")
                  : "off",
              }
            : device,
        ),
      );
    },
    [],
  );

  return (
    <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
      <DashboardHeader range={range} onRangeChange={setRange} />

      <LivePowerCard summary={summary} isLoading={isSummaryLoading} />

      <FavoritesSection
        devices={devices}
        isLoading={isDevicesLoading}
        onDeviceToggle={handleDeviceToggle}
      />
    </div>
  );
};

export { Dashboard };
