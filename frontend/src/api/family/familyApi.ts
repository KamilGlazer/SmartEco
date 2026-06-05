import {
  addMockFamilyMember,
  getMockFamilyMembers,
} from "@/api/family/mock";
import type { FamilyMember, InviteMemberPayload } from "@/api/family/types";

const FETCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchFamilyMembers(): Promise<FamilyMember[]> {
  await delay(FETCH_DELAY_MS);
  return getMockFamilyMembers();
}

async function inviteFamilyMember(
  payload: InviteMemberPayload,
): Promise<FamilyMember> {
  await delay(FETCH_DELAY_MS);
  return addMockFamilyMember(payload);
}

export { fetchFamilyMembers, inviteFamilyMember };
