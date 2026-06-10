import { useEffect, useRef, useState } from "react";

import type { FamilyMember } from "@/api/family/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreVertical, Smile, Trash2 } from "lucide-react";

type MemberRowProps = {
  member: FamilyMember;
  isDeleting?: boolean;
  onDelete: (memberId: string) => void;
};

function MemberRoleBadge({ role }: { role: FamilyMember["role"] }) {
  const isAdmin = role === "administrator";

  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md px-2.5 py-0.5 text-xs font-medium",
        isAdmin
          ? "border border-[#00E676]/30 bg-[#00E676]/10 text-[#00E676]"
          : "border border-white/10 bg-[#1f1f1f] text-[#8C929F]",
      )}
    >
      {isAdmin ? "Administrator" : "Member"}
    </Badge>
  );
}

function MemberAvatar({ member }: { member: FamilyMember }) {
  if (member.avatarUrl) {
    return (
      <div className="relative shrink-0">
        <img
          src={member.avatarUrl}
          alt=""
          className="size-11 rounded-full object-cover"
        />
        {member.isOnline ? (
          <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-[#161616] bg-[#00E676]" />
        ) : null}
      </div>
    );
  }

  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-[#8C929F]">
      <Smile className="size-5" strokeWidth={1.75} />
    </span>
  );
}

function MemberRow({ member, isDeleting = false, onDelete }: MemberRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = member.role === "administrator";

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-4 transition-opacity",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      <MemberAvatar member={member} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{member.name}</p>
        <p className="truncate text-xs text-[#8C929F]">
          {member.email ?? member.subtitle}
        </p>
      </div>

      <MemberRoleBadge role={member.role} />

      {!isAdmin ? (
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            disabled={isDeleting}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#8C929F] transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-50"
            aria-label={`Actions for ${member.name}`}
          >
            <MoreVertical className="size-4" strokeWidth={1.75} />
          </button>

          {isMenuOpen ? (
            <div className="absolute right-0 z-20 mt-1 w-42 rounded-lg border border-white/10 bg-[#1F1F1F] p-1 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(member.id);
                }}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-400/10"
              >
                <Trash2 className="size-3.5" strokeWidth={1.75} />
                Remove member
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export { MemberRow };
