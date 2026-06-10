import { useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchInfrastructureDevices,
  fetchInfrastructureFilters,
  toggleInfrastructureDevice,
} from "@/api/infrastructure/infrastructureApi";
import type {
  InfrastructureDevice,
  InfrastructureFilters,
} from "@/api/infrastructure/types";
import { AddDevice } from "@/components/infrastructure/AddDevice";
import { InfrastructureDeviceGrid } from "@/components/infrastructure/InfrastructureDeviceGrid";
import { InfrastructureHeader } from "@/components/infrastructure/InfrastructureHeader";
import { filterInfrastructureDevices } from "@/components/infrastructure/utils";

const Infrastructure = () => {
  const [devices, setDevices] = useState<InfrastructureDevice[]>([]);
  const [filters, setFilters] = useState<InfrastructureFilters>({
    rooms: [],
    deviceTypes: [],
  });
  const [roomFilter, setRoomFilter] = useState("");
  const [deviceTypeFilter, setDeviceTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [togglingDeviceId, setTogglingDeviceId] = useState<string | null>(null);
  const [showAddDevice, setShowAddDevice] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);

    Promise.all([fetchInfrastructureDevices(), fetchInfrastructureFilters()])
      .then(([deviceData, filterData]) => {
        if (!cancelled) {
          setDevices(deviceData);
          setFilters(filterData);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDevices = useMemo(
    () => filterInfrastructureDevices(devices, roomFilter, deviceTypeFilter),
    [devices, roomFilter, deviceTypeFilter],
  );

  const handleDeviceToggle = useCallback(
    async (deviceId: string, isActive: boolean) => {
      setTogglingDeviceId(deviceId);

      try {
        const updatedDevice = await toggleInfrastructureDevice(
          deviceId,
          isActive,
        );

        if (!updatedDevice) {
          return;
        }

        setDevices((current) =>
          current.map((device) =>
            device.id === deviceId ? updatedDevice : device,
          ),
        );
      } finally {
        setTogglingDeviceId(null);
      }
    },
    [],
  );

  const handleDeviceAdded = useCallback((device: InfrastructureDevice) => {
    setDevices((current) => [...current, device]);
    setFilters((current) => {
      const roomExists = current.rooms.some(
        (room) => room.value === device.room.id,
      );

      if (roomExists) return current;

      return {
        ...current,
        rooms: [
          ...current.rooms,
          { value: device.room.id, label: device.room.name },
        ],
      };
    });
  }, []);

  if (showAddDevice) {
    return (
      <div className="flex min-h-[calc(100dvh)] w-full flex-col px-8 py-8">
        <AddDevice
          roomOptions={filters.rooms}
          onBack={() => setShowAddDevice(false)}
          onDeviceAdded={handleDeviceAdded}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
      <InfrastructureHeader
        filters={filters}
        roomFilter={roomFilter}
        deviceTypeFilter={deviceTypeFilter}
        onRoomFilterChange={setRoomFilter}
        onDeviceTypeFilterChange={setDeviceTypeFilter}
      />

      <InfrastructureDeviceGrid
        devices={filteredDevices}
        isLoading={isLoading}
        togglingDeviceId={togglingDeviceId}
        onDeviceToggle={handleDeviceToggle}
        onAddDevice={() => setShowAddDevice(true)}
      />
    </div>
  );
};

export { Infrastructure };
