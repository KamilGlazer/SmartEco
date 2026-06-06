import type { FamilyMember } from "@/api/family/types";
import { MemberRow } from "@/components/family/MemberRow";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

type ActiveMembersCardProps = {
  members: FamilyMember[];
  isLoading?: boolean;
};

function ActiveMembersCard({
  members,
  isLoading = false,
}: ActiveMembersCardProps) {
  return (
    <Card className="border-white/10 bg-[#161616] py-0 ring-0">
      <CardContent className="px-6 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Users className="size-5 text-[#00E676]" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold text-white">Active Members</h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { ActiveMembersCard };
