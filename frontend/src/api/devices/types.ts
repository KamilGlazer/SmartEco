export type DeviceStatus = "on" | "off" | "cooling";

export interface DeviceDetails {
  todayKwh: number;
  weekKwh: number;
  monthKwh: number;
}

export interface Room {
  id: string;
  name: string;
}

export interface Device {
  id: string;
  is_favorite: boolean;
  is_active: boolean;
  name: string;
  status: DeviceStatus;
  details: DeviceDetails;
  room: Room;
}
