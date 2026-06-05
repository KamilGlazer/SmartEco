export type MemberRole = "administrator" | "member";

export type InviteRole = "standard-member" | "administrator" | "limited-access";

export interface FamilyMember {
  id: string;
  name: string;
  email?: string;
  subtitle?: string;
  role: MemberRole;
  avatarUrl?: string;
  isOnline?: boolean;
}

export interface InviteMemberPayload {
  fullName: string;
  email: string;
  role: InviteRole;
}
