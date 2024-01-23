export interface IUser {
  user: { email: string; email_verified: boolean; sub: string };
  preferences: {
    mode: string;
    density: string;
    motion: boolean;
  };
}
