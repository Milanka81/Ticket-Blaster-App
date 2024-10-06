export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  __v: number;
  isVerified: boolean;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}
