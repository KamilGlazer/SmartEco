import type { AuthUser, LoginCredentials, RegisterCredentials } from "@/api/auth/types";

const MOCK_USER: AuthUser = {
  id: "user-1",
  email: "user@smarteco.com",
  fullName: "Demo User",
};

const MOCK_PASSWORD = "user123";

const mockUsers: Array<AuthUser & { password: string }> = [
  {
    ...MOCK_USER,
    password: MOCK_PASSWORD,
  },
];

function validateMockLogin(credentials: LoginCredentials): AuthUser | null {
  const email = credentials.email.trim().toLowerCase();

  const matchedUser = mockUsers.find(
    (user) => user.email.toLowerCase() === email && user.password === credentials.password,
  );

  if (!matchedUser) {
    return null;
  }

  const { password, ...user } = matchedUser;
  return user;
}

function registerMockUser(credentials: RegisterCredentials): AuthUser {
  const email = credentials.email.trim().toLowerCase();

  const isEmailTaken = mockUsers.some(
    (user) => user.email.toLowerCase() === email,
  );

  if (isEmailTaken) {
    throw new Error("Email already in use.");
  }

  const nextUser: AuthUser & { password: string } = {
    id: `user-${mockUsers.length + 1}`,
    email,
    fullName: credentials.fullName.trim(),
    password: credentials.password,
  };

  mockUsers.push(nextUser);

  const { password, ...user } = nextUser;
  return user;
}

export { MOCK_USER, validateMockLogin, registerMockUser };
