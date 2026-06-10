import {
  addMockInfrastructureDeviceFromBluetooth,
  addMockInfrastructureDeviceManual,
  getMockBluetoothDevices,
  getMockInfrastructureDevices,
  getMockInfrastructureFilters,
  updateMockInfrastructureDevice,
} from "@/api/infrastructure/mock";
import type {
  AddManualDevicePayload,
  DiscoveredBluetoothDevice,
  InfrastructureDevice,
  InfrastructureFilters,
} from "@/api/infrastructure/types";

const FETCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchInfrastructureDevices(): Promise<InfrastructureDevice[]> {
  await delay(FETCH_DELAY_MS);
  return getMockInfrastructureDevices();
}

async function fetchInfrastructureFilters(): Promise<InfrastructureFilters> {
  await delay(FETCH_DELAY_MS);
  return getMockInfrastructureFilters();
}

async function toggleInfrastructureDevice(
  deviceId: string,
  isActive: boolean,
): Promise<InfrastructureDevice | null> {
  await delay(FETCH_DELAY_MS);
  return updateMockInfrastructureDevice(deviceId, isActive) ?? null;
}

async function fetchBluetoothDevices(): Promise<DiscoveredBluetoothDevice[]> {
  await delay(FETCH_DELAY_MS);
  return getMockBluetoothDevices();
}

async function addInfrastructureDeviceFromBluetooth(
  deviceId: string,
): Promise<InfrastructureDevice | null> {
  await delay(FETCH_DELAY_MS);
  return addMockInfrastructureDeviceFromBluetooth(deviceId);
}

async function addInfrastructureDeviceManual(
  payload: AddManualDevicePayload,
): Promise<InfrastructureDevice> {
  await delay(FETCH_DELAY_MS);
  return addMockInfrastructureDeviceManual(payload);
}

export {
  addInfrastructureDeviceFromBluetooth,
  addInfrastructureDeviceManual,
  fetchBluetoothDevices,
  fetchInfrastructureDevices,
  fetchInfrastructureFilters,
  toggleInfrastructureDevice,
};
