import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { AuthContextType } from "../shared/authTypes";

type UseAuthContextReturnType = AuthContextType;

export const useAuthContext = (): UseAuthContextReturnType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
