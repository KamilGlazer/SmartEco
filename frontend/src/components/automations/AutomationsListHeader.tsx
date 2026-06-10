import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Plus } from "lucide-react";

type AutomationsListHeaderProps = {
  onCreate: () => void;
  isCreating?: boolean;
};

function AutomationsListHeader({
  onCreate,
  isCreating = false,
}: AutomationsListHeaderProps) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Automations
        </h1>
        <p className="text-sm text-[#8C929F]">
          Saved logic flows that automate your ecosystem.
        </p>
      </div>

      <PrimaryButton
        onClick={onCreate}
        disabled={isCreating}
        className="h-10 gap-2 rounded-xl"
      >
        <Plus className="size-4" strokeWidth={2} />
        {isCreating ? "Creating..." : "New Automation"}
      </PrimaryButton>
    </header>
  );
}

export { AutomationsListHeader };
