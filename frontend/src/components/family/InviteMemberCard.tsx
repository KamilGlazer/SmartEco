import { useState } from "react";

import type { InviteMemberPayload, InviteRole } from "@/api/family/types";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown, UserPlus } from "lucide-react";

type InviteMemberCardProps = {
  onSubmit: (payload: InviteMemberPayload) => Promise<void>;
  isSubmitting?: boolean;
};

const ROLE_OPTIONS: { value: InviteRole; label: string }[] = [
  { value: "standard-member", label: "Standard Member" },
  { value: "administrator", label: "Administrator" },
  { value: "limited-access", label: "Limited Access" },
];

function InviteField({
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

function InviteMemberCard({
  onSubmit,
  isSubmitting = false,
}: InviteMemberCardProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InviteRole>("standard-member");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ fullName, email, role });
    setFullName("");
    setEmail("");
    setRole("standard-member");
  };

  const fieldClassName =
    "h-11 rounded-xl border-white/10 bg-[#151515] px-4 text-sm text-white placeholder:text-[#8C929F] focus-visible:border-[#00E676]/50 focus-visible:ring-[#00E676]/20";

  return (
    <Card className="border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="px-6 py-6">
        <div className="mb-6 flex items-center gap-2">
          <UserPlus className="size-5 text-[#00E676]" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold text-white">Invite Member</h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InviteField label="Full Name">
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="e.g. Alex Smith"
              className={fieldClassName}
              disabled={isSubmitting}
            />
          </InviteField>

          <InviteField label="Email Address">
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@example.com"
              className={fieldClassName}
              disabled={isSubmitting}
            />
          </InviteField>

          <InviteField label="Role Definition">
            <div className="relative">
              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as InviteRole)
                }
                className={cn(
                  fieldClassName,
                  "w-full appearance-none pr-10",
                )}
                disabled={isSubmitting}
              >
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#8C929F]"
                strokeWidth={1.75}
              />
            </div>
          </InviteField>

          <PrimaryButton
            type="submit"
            disabled={isSubmitting || !fullName.trim() || !email.trim()}
            className="mt-2 h-11 w-full rounded-xl text-sm"
          >
            Send Invitation
          </PrimaryButton>
        </form>
      </CardContent>
    </Card>
  );
}

export { InviteMemberCard };
