import type { AuthUser, LoginCredentials } from "@/api/auth/types";

const MOCK_USER: AuthUser = {
  id: "user-1",
  email: "user@smarteco.com",
  fullName: "Demo User",
};

const MOCK_PASSWORD = "user123";

function validateMockLogin(credentials: LoginCredentials): AuthUser | null {
  const email = credentials.email.trim().toLowerCase();

  if (email === MOCK_USER.email && credentials.password === MOCK_PASSWORD) {
    return MOCK_USER;
  }

  return null;
}

export { MOCK_USER, validateMockLogin };
