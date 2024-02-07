export type User = {
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
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export type AuthState = {
  user: User | null;
};
