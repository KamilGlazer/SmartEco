export type InfrastructureDeviceType =
  | "display"
  | "climate"
  | "lighting"
  | "appliance";

export interface InfrastructureDevice {
  id: string;
  name: string;
  room: {
    id: string;
    name: string;
  };
  deviceType: InfrastructureDeviceType;
  is_active: boolean;
  energy24hKwh: number;
  /** kWh per 3-hour interval over the last 24 hours (7 readings) */
  energyHistory: number[];
  ipAddress?: string;
}

export interface DiscoveredBluetoothDevice {
  id: string;
  name: string;
  room: string;
  deviceType: InfrastructureDeviceType;
  signalLabel: string;
}

export interface AddManualDevicePayload {
  name: string;
  room: string;
  ipAddress: string;
}

export interface InfrastructureFilterOption {
  value: string;
  label: string;
}

export interface InfrastructureFilters {
  rooms: InfrastructureFilterOption[];
  deviceTypes: InfrastructureFilterOption[];
}
