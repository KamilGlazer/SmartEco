type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = LoginCredentials & {
  fullName: string;
};

type LoginResponse = {
  user: AuthUser;
  token: string;
};

export type { AuthUser, LoginCredentials, LoginResponse, RegisterCredentials };
