export type UserRole = 'admin' | 'member' | 'viewer';

/** Represents an authenticated or assignable user */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
}

/** JWT / session auth payload */
export interface AuthPayload {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
}
