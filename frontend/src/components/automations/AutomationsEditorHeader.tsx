import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

type AutomationsEditorHeaderProps = {
  onBack: () => void;
  onDelete: () => void;
  onSave: () => void;
  isSaving?: boolean;
  isDeleting?: boolean;
  isBusy?: boolean;
};

function AutomationsEditorHeader({
  onBack,
  onDelete,
  onSave,
  isSaving = false,
  isDeleting = false,
  isBusy = false,
}: AutomationsEditorHeaderProps) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isBusy}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#8C929F] transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-50"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Back to list
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Scene Creator
          </h1>
          <p className="text-sm text-[#8C929F]">
            Design logic flows to automate your ecosystem.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SecondaryButton
          onClick={onDelete}
          disabled={isBusy}
          className="h-10 gap-2 rounded-xl border-red-400/30 text-red-400 hover:text-red-300"
        >
          <Trash2 className="size-4" strokeWidth={1.75} />
          {isDeleting ? "Deleting..." : "Delete"}
        </SecondaryButton>
        <PrimaryButton
          onClick={onSave}
          disabled={isBusy}
          className="h-10 gap-2 rounded-xl"
        >
          <Save className="size-4" strokeWidth={2} />
          {isSaving ? "Saving..." : "Save Automation"}
        </PrimaryButton>
      </div>
    </header>
  );
}

export { AutomationsEditorHeader };
