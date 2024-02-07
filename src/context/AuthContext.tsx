import React, { createContext, useReducer, useEffect } from "react";
import {
  User,
  AuthState,
  AuthAction,
  AuthContextType,
} from "../shared/authTypes";

export const AuthContext = createContext<AuthContextType>({
  state: { user: null },
  dispatch: () => null,
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    ) as User | null;

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
