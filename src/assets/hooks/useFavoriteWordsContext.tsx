import {
  FavoriteWordsContext,
  FavoriteWordsState,
  FavoriteWordsAction,
} from "../context/FavoriteWordsContext";
import { useContext } from "react";

export const useFavoriteWordsContext = (): FavoriteWordsState & {
  dispatch: React.Dispatch<FavoriteWordsAction>;
} => {
  const context = useContext(FavoriteWordsContext);
  if (!context) {
    throw new Error(
      "useFavoriteWordsContext must be used inside a FavoriteWordsContextProvider"
    );
  }
  return context;
};
