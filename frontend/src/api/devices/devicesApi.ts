import {
  getMockDeviceById,
  getMockDevices,
  getMockFavoriteDevices,
} from "@/api/devices/mock";
import type { Device } from "@/api/devices/types";

const FETCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchDevices(): Promise<Device[]> {
  await delay(FETCH_DELAY_MS);
  return getMockDevices();
}

async function fetchFavoriteDevices(): Promise<Device[]> {
  await delay(FETCH_DELAY_MS);
  return getMockFavoriteDevices();
}

async function fetchDeviceById(id: string): Promise<Device | null> {
  await delay(FETCH_DELAY_MS);
  return getMockDeviceById(id) ?? null;
}

export { fetchDevices, fetchFavoriteDevices, fetchDeviceById };
