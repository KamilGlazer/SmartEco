import { useCallback, useEffect, useState } from "react";

import {
  createAutomation,
  deleteAutomation,
  fetchAutomation,
  fetchAutomations,
  fetchRandomActionOptions,
  fetchRandomTriggerOptions,
  saveAutomation,
} from "@/api/automations/automationsApi";
import {
  createActionFromTemplate,
  createTriggerFromTemplate,
  sanitizeConnections,
} from "@/api/automations/mock";
import type {
  ActionTemplate,
  Automation,
  AutomationAction,
  AutomationConnection,
  AutomationSummary,
  AutomationTrigger,
  TriggerTemplate,
} from "@/api/automations/types";
import { AutomationCanvas } from "@/components/automations/AutomationCanvas";
import { AutomationsEditorHeader } from "@/components/automations/AutomationsEditorHeader";
import { AutomationsList } from "@/components/automations/AutomationsList";
import { AutomationsListHeader } from "@/components/automations/AutomationsListHeader";
import {
  NodePickerDialog,
  type NodePickerOption,
} from "@/components/automations/NodePickerDialog";

type View = "list" | "editor";
type PickerKind = "trigger" | "action" | null;

const Automations = () => {
  const [view, setView] = useState<View>("list");
  const [automations, setAutomations] = useState<AutomationSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [triggers, setTriggers] = useState<AutomationTrigger[]>([]);
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [connections, setConnections] = useState<AutomationConnection[]>([]);
  const [connectingTriggerId, setConnectingTriggerId] = useState<string | null>(
    null,
  );

  const [isListLoading, setIsListLoading] = useState(true);
  const [isEditorLoading, setIsEditorLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [pickerKind, setPickerKind] = useState<PickerKind>(null);
  const [pickerOptions, setPickerOptions] = useState<NodePickerOption[]>([]);
  const [isPickerLoading, setIsPickerLoading] = useState(false);

  const loadAutomations = useCallback(async () => {
    setIsListLoading(true);
    try {
      const data = await fetchAutomations();
      setAutomations(data);
    } finally {
      setIsListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAutomations();
  }, [loadAutomations]);

  const applyAutomation = useCallback((automation: Automation) => {
    setSelectedId(automation.id);
    setName(automation.name);
    setTriggers(automation.triggers);
    setActions(automation.actions);
    setConnections(automation.connections);
    setConnectingTriggerId(null);
  }, []);

  const openEditor = useCallback(
    async (id: string) => {
      setView("editor");
      setIsEditorLoading(true);

      try {
        const automation = await fetchAutomation(id);
        if (automation) applyAutomation(automation);
      } finally {
        setIsEditorLoading(false);
      }
    },
    [applyAutomation],
  );

  const handleCreate = useCallback(async () => {
    setIsCreating(true);

    try {
      const automation = await createAutomation();
      applyAutomation(automation);
      setView("editor");
      await loadAutomations();
    } finally {
      setIsCreating(false);
    }
  }, [applyAutomation, loadAutomations]);

  const handleBack = useCallback(() => {
    setView("list");
    setSelectedId(null);
    setConnectingTriggerId(null);
    loadAutomations();
  }, [loadAutomations]);

  const handleSave = useCallback(async () => {
    if (!selectedId) return;

    setIsSaving(true);

    try {
      const automation = await saveAutomation(selectedId, {
        name,
        triggers,
        actions,
        connections: sanitizeConnections(triggers, actions, connections),
      });

      if (automation) {
        applyAutomation(automation);
        await loadAutomations();
        setView("list");
      }
    } finally {
      setIsSaving(false);
    }
  }, [
    selectedId,
    name,
    triggers,
    actions,
    connections,
    applyAutomation,
    loadAutomations,
  ]);

  const handleDeleteAutomation = useCallback(async () => {
    if (!selectedId) return;

    setIsDeleting(true);

    try {
      await deleteAutomation(selectedId);
      setView("list");
      setSelectedId(null);
      await loadAutomations();
    } finally {
      setIsDeleting(false);
    }
  }, [selectedId, loadAutomations]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setTriggers((current) => current.filter((trigger) => trigger.id !== nodeId));
    setActions((current) => current.filter((action) => action.id !== nodeId));
    setConnections((current) =>
      current.filter(
        (connection) =>
          connection.triggerId !== nodeId && connection.actionId !== nodeId,
      ),
    );

    if (connectingTriggerId === nodeId) {
      setConnectingTriggerId(null);
    }
  }, [connectingTriggerId]);

  const openPicker = useCallback(async (kind: PickerKind) => {
    if (!kind) return;

    setPickerKind(kind);
    setPickerOptions([]);
    setIsPickerLoading(true);

    try {
      const options =
        kind === "trigger"
          ? await fetchRandomTriggerOptions()
          : await fetchRandomActionOptions();
      setPickerOptions(options);
    } finally {
      setIsPickerLoading(false);
    }
  }, []);

  const handleSelectTrigger = useCallback((option: NodePickerOption) => {
    const trigger = createTriggerFromTemplate(option as TriggerTemplate);
    setTriggers((current) => [...current, trigger]);
  }, []);

  const handleSelectAction = useCallback(
    (option: NodePickerOption) => {
      const action = createActionFromTemplate(option as ActionTemplate);
      setActions((current) => [...current, action]);

      if (triggers.length > 0) {
        setConnections((current) => [
          ...current,
          { triggerId: triggers[0].id, actionId: action.id },
        ]);
      }
    },
    [triggers],
  );

  const handleConnectTrigger = useCallback((triggerId: string) => {
    setConnectingTriggerId((current) =>
      current === triggerId ? null : triggerId,
    );
  }, []);

  const handleConnectAction = useCallback(
    (actionId: string) => {
      if (!connectingTriggerId) return;

      setConnections((current) => {
        const alreadyConnected = current.some(
          (connection) =>
            connection.triggerId === connectingTriggerId &&
            connection.actionId === actionId,
        );

        if (alreadyConnected) {
          return current.filter(
            (connection) =>
              !(
                connection.triggerId === connectingTriggerId &&
                connection.actionId === actionId
              ),
          );
        }

        const withoutAction = current.filter(
          (connection) => connection.actionId !== actionId,
        );

        return [
          ...withoutAction,
          { triggerId: connectingTriggerId, actionId },
        ];
      });
    },
    [connectingTriggerId],
  );

  const editorBusy =
    isEditorLoading || isSaving || isDeleting || isPickerLoading;

  if (view === "list") {
    return (
      <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
        <AutomationsListHeader
          onCreate={handleCreate}
          isCreating={isCreating}
        />
        <AutomationsList
          automations={automations}
          isLoading={isListLoading}
          onSelect={openEditor}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
      <AutomationsEditorHeader
        onBack={handleBack}
        onDelete={handleDeleteAutomation}
        onSave={handleSave}
        isSaving={isSaving}
        isDeleting={isDeleting}
        isBusy={editorBusy}
      />

      {isEditorLoading ? (
        <p className="text-sm text-[#8C929F]">Loading automation...</p>
      ) : (
        <AutomationCanvas
          name={name}
          onNameChange={setName}
          triggers={triggers}
          actions={actions}
          connections={connections}
          connectingTriggerId={connectingTriggerId}
          onConnectTrigger={handleConnectTrigger}
          onConnectAction={handleConnectAction}
          onAddCondition={() => openPicker("trigger")}
          onAddAction={() => openPicker("action")}
          onDeleteNode={handleDeleteNode}
          deletingNodeIds={new Set()}
        />
      )}

      <NodePickerDialog
        open={pickerKind !== null}
        onOpenChange={(open) => {
          if (!open) setPickerKind(null);
        }}
        title={pickerKind === "trigger" ? "Add Condition" : "Add Action"}
        description={
          pickerKind === "trigger"
            ? "Pick one of five random WHEN triggers."
            : "Pick one of five random THEN actions."
        }
        options={pickerOptions}
        isLoading={isPickerLoading}
        onSelect={(option) => {
          if (pickerKind === "trigger") handleSelectTrigger(option);
          if (pickerKind === "action") handleSelectAction(option);
        }}
      />
    </div>
  );
};

export { Automations };
