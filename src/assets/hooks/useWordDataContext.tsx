import { useContext } from "react";
import {
  WordDataContext,
  WordDataContextType,
} from "../context/WordDataContext";

export const useWordDataContext = (): WordDataContextType => {
  const context = useContext(WordDataContext);
  if (!context) {
    throw new Error(
      "useWordDataContext must be used inside a WordDataContextProvider"
    );
  }
  return context;
};
