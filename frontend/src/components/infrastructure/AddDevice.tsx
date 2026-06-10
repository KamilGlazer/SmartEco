import { useCallback, useEffect, useState } from "react";

import {
  addInfrastructureDeviceFromBluetooth,
  addInfrastructureDeviceManual,
  fetchBluetoothDevices,
} from "@/api/infrastructure/infrastructureApi";
import type {
  DiscoveredBluetoothDevice,
  InfrastructureDevice,
  InfrastructureFilterOption,
} from "@/api/infrastructure/types";
import { AddDeviceBluetoothList } from "@/components/infrastructure/AddDeviceBluetoothList";
import { AddDeviceHeader } from "@/components/infrastructure/AddDeviceHeader";
import { AddDeviceManualForm } from "@/components/infrastructure/AddDeviceManualForm";
import {
  AddDeviceMethodSelect,
  type AddDeviceMethod,
} from "@/components/infrastructure/AddDeviceMethodSelect";

type AddDeviceStep = "method" | AddDeviceMethod;

type AddDeviceProps = {
  roomOptions: InfrastructureFilterOption[];
  onBack: () => void;
  onDeviceAdded: (device: InfrastructureDevice) => void;
};

function AddDevice({ roomOptions, onBack, onDeviceAdded }: AddDeviceProps) {
  const [step, setStep] = useState<AddDeviceStep>("method");
  const [bluetoothDevices, setBluetoothDevices] = useState<
    DiscoveredBluetoothDevice[]
  >([]);
  const [isBluetoothLoading, setIsBluetoothLoading] = useState(false);
  const [addingDeviceId, setAddingDeviceId] = useState<string | null>(null);
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);

  useEffect(() => {
    if (step !== "bluetooth") return;

    let cancelled = false;
    setIsBluetoothLoading(true);

    fetchBluetoothDevices()
      .then((devices) => {
        if (!cancelled) setBluetoothDevices(devices);
      })
      .finally(() => {
        if (!cancelled) setIsBluetoothLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [step]);

  const handleBack = useCallback(() => {
    if (step === "method") {
      onBack();
      return;
    }

    setStep("method");
  }, [step, onBack]);

  const handleBluetoothSelect = useCallback(
    async (deviceId: string) => {
      setAddingDeviceId(deviceId);

      try {
        const device = await addInfrastructureDeviceFromBluetooth(deviceId);
        if (device) {
          onDeviceAdded(device);
          onBack();
        }
      } finally {
        setAddingDeviceId(null);
      }
    },
    [onBack, onDeviceAdded],
  );

  const handleManualSubmit = useCallback(
    async (payload: { name: string; room: string; ipAddress: string }) => {
      setIsManualSubmitting(true);

      try {
        const device = await addInfrastructureDeviceManual(payload);
        onDeviceAdded(device);
        onBack();
      } finally {
        setIsManualSubmitting(false);
      }
    },
    [onBack, onDeviceAdded],
  );

  const headerCopy =
    step === "method"
      ? {
          title: "Add New Device",
          description:
            "Select a method to integrate your new hardware into the SmartEco ecosystem.",
        }
      : step === "bluetooth"
        ? {
            title: "Search via Bluetooth",
            description: "Select a nearby device to add to your infrastructure.",
          }
        : {
            title: "Manual Selection",
            description: "Enter device details to register it manually.",
          };

  return (
    <div className="flex flex-col gap-10">
      <AddDeviceHeader
        title={headerCopy.title}
        description={headerCopy.description}
        onBack={handleBack}
      />

      {step === "method" ? (
        <AddDeviceMethodSelect onSelect={setStep} />
      ) : null}

      {step === "bluetooth" ? (
        <AddDeviceBluetoothList
          devices={bluetoothDevices}
          isLoading={isBluetoothLoading}
          addingDeviceId={addingDeviceId}
          onSelectDevice={handleBluetoothSelect}
        />
      ) : null}

      {step === "manual" ? (
        <AddDeviceManualForm
          roomOptions={roomOptions}
          isSubmitting={isManualSubmitting}
          onSubmit={handleManualSubmit}
        />
      ) : null}
    </div>
  );
}

export { AddDevice };
