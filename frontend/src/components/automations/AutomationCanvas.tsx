import { useLayoutEffect, useRef, useState } from "react";

import type {
  AutomationAction,
  AutomationConnection,
  AutomationTrigger,
} from "@/api/automations/types";
import { AddNodeButton } from "@/components/automations/AddNodeButton";
import { AutomationNodeCard } from "@/components/automations/AutomationNodeCard";

type AutomationCanvasProps = {
  name: string;
  onNameChange: (name: string) => void;
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  connections: AutomationConnection[];
  connectingTriggerId: string | null;
  onConnectTrigger: (triggerId: string) => void;
  onConnectAction: (actionId: string) => void;
  onAddCondition: () => void;
  onAddAction: () => void;
  onDeleteNode: (nodeId: string) => void;
  deletingNodeIds: Set<string>;
};

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[11px] font-bold tracking-[0.18em] text-[#8C929F] uppercase">
      {children}
    </p>
  );
}

function buildConnectionPath(
  canvasRect: DOMRect,
  fromRect: DOMRect,
  toRect: DOMRect,
): string | null {
  const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
  const x2 = toRect.left + toRect.width / 2 - canvasRect.left;
  const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

  if (x2 <= x1) return null;

  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`;
}

function AutomationCanvas({
  name,
  onNameChange,
  triggers,
  actions,
  connections,
  connectingTriggerId,
  onConnectTrigger,
  onConnectAction,
  onAddCondition,
  onAddAction,
  onDeleteNode,
  deletingNodeIds,
}: AutomationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const triggerDotRefs = useRef(new Map<string, HTMLButtonElement>());
  const actionDotRefs = useRef(new Map<string, HTMLButtonElement>());
  const [connectionPaths, setConnectionPaths] = useState<string[]>([]);

  const connectedActionIds = new Set(connections.map((c) => c.actionId));
  const connectedTriggerIds = new Set(connections.map((c) => c.triggerId));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updatePaths = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const paths = connections
        .map((connection) => {
          const triggerDot = triggerDotRefs.current.get(connection.triggerId);
          const actionDot = actionDotRefs.current.get(connection.actionId);

          if (!triggerDot || !actionDot) return null;

          return buildConnectionPath(
            canvasRect,
            triggerDot.getBoundingClientRect(),
            actionDot.getBoundingClientRect(),
          );
        })
        .filter((path): path is string => path !== null);

      setConnectionPaths(paths);
    };

    updatePaths();

    const observer = new ResizeObserver(updatePaths);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [triggers, actions, connections]);

  const setTriggerDotRef = (triggerId: string) => (element: HTMLButtonElement | null) => {
    if (element) triggerDotRefs.current.set(triggerId, element);
    else triggerDotRefs.current.delete(triggerId);
  };

  const setActionDotRef = (actionId: string) => (element: HTMLButtonElement | null) => {
    if (element) actionDotRefs.current.set(actionId, element);
    else actionDotRefs.current.delete(actionId);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 lg:p-8">
      <label className="block max-w-xl space-y-2">
        <span className="text-xs font-bold tracking-[0.14em] text-[#8C929F] uppercase">
          Automation Name
        </span>
        <input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Name your automation"
          className="h-11 w-full rounded-lg border border-[#3B3E45] bg-[#101010] px-4 text-base font-medium text-[#00E676] transition-all duration-300 placeholder:text-[#8C929F] focus:border-[#00E676]/60 focus:ring-2 focus:ring-[#00E676]/20 focus:outline-none"
        />
      </label>

      {connectingTriggerId ? (
        <p className="mt-4 text-xs text-[#00E676]">
          Click THEN actions to connect them to the selected WHEN trigger. Multiple
          actions can share one trigger. Click again to disconnect.
        </p>
      ) : (
        <p className="mt-4 text-xs text-[#8C929F]">
          Click a WHEN trigger dot, then connect multiple THEN actions to it.
        </p>
      )}

      <div ref={canvasRef} className="relative mt-6">
        {connectionPaths.length > 0 ? (
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
            {connectionPaths.map((path, index) => (
              <path
                key={index}
                d={path}
                fill="none"
                stroke="#00E676"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            ))}
          </svg>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <ColumnLabel>When (Trigger)</ColumnLabel>

            {triggers.map((trigger, index) => (
              <div key={trigger.id} className="space-y-4">
                {index > 0 ? (
                  <div className="flex justify-center">
                    <span className="rounded-full border border-white/10 bg-[#1F1F1F] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#8C929F] uppercase">
                      And
                    </span>
                  </div>
                ) : null}
                <AutomationNodeCard
                  category={trigger.category}
                  title={trigger.title}
                  subtitle={trigger.subtitle}
                  side="trigger"
                  highlighted={connectedTriggerIds.has(trigger.id)}
                  isConnecting={connectingTriggerId === trigger.id}
                  onDelete={() => onDeleteNode(trigger.id)}
                  onDotClick={() => onConnectTrigger(trigger.id)}
                  dotRef={setTriggerDotRef(trigger.id)}
                  isDeleting={deletingNodeIds.has(trigger.id)}
                />
              </div>
            ))}

            <AddNodeButton label="Add Condition" onClick={onAddCondition} />
          </div>

          <div className="space-y-4 lg:pt-10">
            <ColumnLabel>Then (Action)</ColumnLabel>

            {actions.map((action) => (
              <AutomationNodeCard
                key={action.id}
                category={action.category}
                title={action.title}
                subtitle={action.subtitle}
                side="action"
                highlighted={connectedActionIds.has(action.id)}
                isConnectionTarget={Boolean(connectingTriggerId)}
                onDelete={() => onDeleteNode(action.id)}
                onDotClick={() => onConnectAction(action.id)}
                dotRef={setActionDotRef(action.id)}
                isDeleting={deletingNodeIds.has(action.id)}
              />
            ))}

            <AddNodeButton label="Add Action" onClick={onAddAction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AutomationCanvas };
