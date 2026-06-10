import type {
  FamilyMember,
  InviteMemberPayload,
  InviteRole,
  MemberRole,
} from "@/api/family/types";

const mockMembers: FamilyMember[] = [
  {
    id: "member-sarah",
    name: "Sarah Connor",
    email: "sarah.c@smarteco.io",
    role: "administrator",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "member-john",
    name: "John Connor",
    email: "john.c@smarteco.io",
    role: "member",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "member-maya",
    name: "Maya Connor",
    subtitle: "Limited Access Profile",
    role: "member",
  },
];

function inviteRoleToMemberRole(role: InviteRole): MemberRole {
  return role === "administrator" ? "administrator" : "member";
}

function createMemberFromInvite(payload: InviteMemberPayload): FamilyMember {
  return {
    id: crypto.randomUUID(),
    name: payload.fullName.trim(),
    email: payload.email.trim(),
    role: inviteRoleToMemberRole(payload.role),
    subtitle:
      payload.role === "limited-access" ? "Limited Access Profile" : undefined,
  };
}

function getMockFamilyMembers(): FamilyMember[] {
  return mockMembers.map((member) => ({ ...member }));
}

function addMockFamilyMember(payload: InviteMemberPayload): FamilyMember {
  const member = createMemberFromInvite(payload);
  mockMembers.push(member);
  return { ...member };
}

function deleteMockFamilyMember(id: string): boolean {
  const initialLength = mockMembers.length;
  const index = mockMembers.findIndex((member) => member.id === id);
  if (index === -1) return false;

  mockMembers.splice(index, 1);
  return mockMembers.length < initialLength;
}

export {
  addMockFamilyMember,
  createMemberFromInvite,
  deleteMockFamilyMember,
  getMockFamilyMembers,
  mockMembers,
};
