import {
  getMockInfrastructureDevices,
  getMockInfrastructureFilters,
  updateMockInfrastructureDevice,
} from "@/api/infrastructure/mock";
import type {
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

export {
  fetchInfrastructureDevices,
  fetchInfrastructureFilters,
  toggleInfrastructureDevice,
};
