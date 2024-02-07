export type User = {
  _id: string;
  token: string;
  email: {
    type: string;
    unique: true;
  };
  password: {
    type: string;
  };
  name: {
    type: string;
  };
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
