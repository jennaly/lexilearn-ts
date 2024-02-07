import React, { createContext, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

type FavoriteWord = {
  _id: string;
  term: string;
  definitions: string[];
  difficulty?: number;
  user: string;
};

type FavoriteWordsState = {
  favoriteWords: FavoriteWord[];
};

type Action =
  | { type: "GET_FAVORITE_WORDS"; payload: FavoriteWord[] }
  | { type: "CREATE_FAVORITE_WORD"; payload: FavoriteWord }
  | { type: "DELETE_FAVORITE_WORD"; payload: FavoriteWord };

type FavoriteWordsContextType = FavoriteWordsState & {
  dispatch: React.Dispatch<Action>;
};

export const FavoriteWordsContext = createContext<FavoriteWordsContextType>({
  favoriteWords: [],
  dispatch: () => null,
});

export const favoriteWordsReducer = (
  state: FavoriteWordsState,
  action: Action
) => {
  switch (action.type) {
    case "GET_FAVORITE_WORDS":
      return {
        favoriteWords: action.payload,
      };
    case "CREATE_FAVORITE_WORD":
      return {
        favoriteWords: [action.payload, ...state.favoriteWords],
      };
    case "DELETE_FAVORITE_WORD":
      return {
        favoriteWords: state.favoriteWords.filter(
          (word) => word._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

type FavoriteWordsContextProviderProps = {
  children: React.ReactNode;
};

export const FavoriteWordsContextProvider = ({
  children,
}: FavoriteWordsContextProviderProps) => {
  const { user } = useAuthContext();

  const favoriteWordsFromLocalStorage = JSON.parse(
    localStorage.getItem("favoriteWords") || "[]"
  ) as FavoriteWord[];

  const initialState: FavoriteWord[] = user
    ? []
    : favoriteWordsFromLocalStorage || [];

  const [state, dispatch] = useReducer(favoriteWordsReducer, {
    favoriteWords: initialState,
  });

  return (
    <FavoriteWordsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FavoriteWordsContext.Provider>
  );
};
