import { useCallback, useEffect, useState } from "react";

import {
  fetchFamilyMembers,
  inviteFamilyMember,
} from "@/api/family/familyApi";
import type { FamilyMember, InviteMemberPayload } from "@/api/family/types";
import { ActiveMembersCard } from "@/components/family/ActiveMembersCard";
import { FamilyHeader } from "@/components/family/FamilyHeader";
import { InviteMemberCard } from "@/components/family/InviteMemberCard";

const Family = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);

    fetchFamilyMembers()
      .then((data) => {
        if (!cancelled) setMembers(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleInvite = useCallback(async (payload: InviteMemberPayload) => {
    setIsSubmitting(true);

    try {
      const member = await inviteFamilyMember(payload);
      setMembers((current) => [...current, member]);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh)] w-full flex-col gap-10 px-8 py-8">
      <FamilyHeader />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <ActiveMembersCard members={members} isLoading={isLoading} />
        <InviteMemberCard onSubmit={handleInvite} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export { Family };
