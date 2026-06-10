import { useState } from "react";

import type { InfrastructureFilterOption } from "@/api/infrastructure/types";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type AddDeviceManualFormProps = {
  roomOptions: InfrastructureFilterOption[];
  isSubmitting?: boolean;
  onSubmit: (payload: {
    name: string;
    room: string;
    ipAddress: string;
  }) => Promise<void>;
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[#8C929F]">{label}</span>
      {children}
    </label>
  );
}

function AddDeviceManualForm({
  roomOptions,
  isSubmitting = false,
  onSubmit,
}: AddDeviceManualFormProps) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState(roomOptions[0]?.label ?? "");
  const [ipAddress, setIpAddress] = useState("");

  const fieldClassName =
    "h-11 rounded-xl border-white/10 bg-[#151515] px-4 text-sm text-white placeholder:text-[#8C929F] focus-visible:border-[#00E676]/50 focus-visible:ring-[#00E676]/20";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, room, ipAddress });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-5 rounded-xl border border-white/10 bg-[#161616] p-6"
    >
      <FormField label="Name">
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Smart Camera"
          className={fieldClassName}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Pokój">
        <div className="relative">
          <select
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            className={cn(fieldClassName, "w-full appearance-none pr-10")}
            disabled={isSubmitting}
          >
            {roomOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#8C929F]"
            strokeWidth={1.75}
          />
        </div>
      </FormField>

      <FormField label="Adres IP">
        <Input
          value={ipAddress}
          onChange={(event) => setIpAddress(event.target.value)}
          placeholder="192.168.1.42"
          className={fieldClassName}
          disabled={isSubmitting}
        />
      </FormField>

      <PrimaryButton
        type="submit"
        disabled={isSubmitting || !name.trim() || !room.trim() || !ipAddress.trim()}
        className="mt-2 h-11 w-full rounded-xl text-sm"
      >
        {isSubmitting ? "Adding device..." : "Add device"}
      </PrimaryButton>
    </form>
  );
}

export { AddDeviceManualForm };
