import type { InfrastructureFilters } from "@/api/infrastructure/types";
import { InfrastructureFilterSelect } from "@/components/infrastructure/InfrastructureFilterSelect";
import {
  ALL_DEVICE_TYPES_OPTION,
  ALL_ROOMS_OPTION,
} from "@/components/infrastructure/utils";

type InfrastructureHeaderProps = {
  filters: InfrastructureFilters;
  roomFilter: string;
  deviceTypeFilter: string;
  onRoomFilterChange: (value: string) => void;
  onDeviceTypeFilterChange: (value: string) => void;
};

function InfrastructureHeader({
  filters,
  roomFilter,
  deviceTypeFilter,
  onRoomFilterChange,
  onDeviceTypeFilterChange,
}: InfrastructureHeaderProps) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Infrastructure Management
        </h1>
        <p className="text-sm text-[#8C929F]">
          Monitor and control your connected ecosystem.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <InfrastructureFilterSelect
          value={roomFilter}
          placeholder="All rooms"
          options={[ALL_ROOMS_OPTION, ...filters.rooms]}
          onValueChange={onRoomFilterChange}
        />
        <InfrastructureFilterSelect
          value={deviceTypeFilter}
          placeholder="All types"
          options={[ALL_DEVICE_TYPES_OPTION, ...filters.deviceTypes]}
          onValueChange={onDeviceTypeFilterChange}
        />
      </div>
    </header>
  );
}

export { InfrastructureHeader };
