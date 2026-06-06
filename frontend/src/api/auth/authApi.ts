import { registerMockUser, validateMockLogin } from "@/api/auth/mock";
import type { LoginCredentials, LoginResponse, RegisterCredentials } from "@/api/auth/types";

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

async function register(credentials: RegisterCredentials): Promise<LoginResponse> {
  await delay(FETCH_DELAY_MS);

  try {
    const user = registerMockUser(credentials);

    return {
      user,
      token: `mock-token-${user.id}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new AuthError(error.message);
    }

    throw new AuthError("Unable to register. Please try again.");
  }
}

export { AuthError, login, register };
