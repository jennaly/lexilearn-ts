import { useAuthContext } from "../hooks/useAuthContext";

type LogoutResult = {
  logout: () => void;
};

export const useLogout = (): LogoutResult => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
