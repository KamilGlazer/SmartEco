import { validateMockLogin } from "@/api/auth/mock";
import type { LoginCredentials, LoginResponse } from "@/api/auth/types";

const FETCH_DELAY_MS = 400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  await delay(FETCH_DELAY_MS);

  const user = validateMockLogin(credentials);

  if (!user) {
    throw new AuthError("Invalid email or password.");
  }

  return {
    user,
    token: `mock-token-${user.id}`,
  };
}

export { AuthError, login };
