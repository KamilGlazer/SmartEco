import type { FamilyMember } from "@/api/family/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreVertical, Smile } from "lucide-react";

type MemberRowProps = {
  member: FamilyMember;
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

function MemberRow({ member }: MemberRowProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <MemberAvatar member={member} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{member.name}</p>
        <p className="truncate text-xs text-[#8C929F]">
          {member.email ?? member.subtitle}
        </p>
      </div>

      <MemberRoleBadge role={member.role} />

      <button
        type="button"
        className="shrink-0 rounded-lg p-1 text-[#8C929F] transition-colors hover:bg-white/5 hover:text-white"
        aria-label={`Actions for ${member.name}`}
      >
        <MoreVertical className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}

export { MemberRow };
