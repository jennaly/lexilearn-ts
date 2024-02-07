export type User = {
  _id: string;
  token: string;
  email: string;
  password: string;
  name: string;
};

export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export type AuthContextType = {
  user?: User;
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export type AuthState = {
  user: User | null;
};
