import { ArrowLeft, Plus } from "lucide-react";

type AddDeviceHeaderProps = {
  title: string;
  description: string;
  onBack: () => void;
};

function AddDeviceHeader({ title, description, onBack }: AddDeviceHeaderProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
      <button
        type="button"
        onClick={onBack}
        className="mr-auto inline-flex cursor-pointer items-center gap-2 text-sm text-[#8C929F] transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        Back to infrastructure
      </button>

      <span className="flex size-14 items-center justify-center rounded-full bg-[#00E676]/15 text-[#00E676] shadow-[0_0_24px_rgba(0,230,118,0.15)]">
        <Plus className="size-7" strokeWidth={2} />
      </span>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="max-w-xl text-sm text-[#8C929F]">{description}</p>
      </div>
    </div>
  );
}

export { AddDeviceHeader };
