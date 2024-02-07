export type User = {
  _id: string;
  token: string;
  email: {
    type: String;
    required: true;
    unique: true;
  };
  password: {
    type: String;
    required: true;
  };
  name: {
    type: String;
    required: true;
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
