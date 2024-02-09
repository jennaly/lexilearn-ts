import React, { createContext, useReducer, ReactNode } from "react";

type WordDefinition = {
  definition: string;
  type?: string;
  image_url?: string;
  example?: string;
  emoji?: any;
};

type WordData = {
  word: string;
  definitions: WordDefinition[];
  difficulty?: number;
};

type WordDataState = {
  wordData: WordData | null;
};

type WordDataAction =
  | { type: "GET_WORD_DATA"; payload: WordDataState }
  | { type: "RESET_WORD_DATA"; payload: {} };

export type WordDataContextType = WordDataState & {
  dataDispatch: React.Dispatch<WordDataAction>;
};

export const WordDataContext = createContext<WordDataContextType>({
  wordData: null,
  dataDispatch: () => null,
});

export const wordDataContextReducer = (
  state: WordDataState,
  action: WordDataAction
): WordDataState => {
  switch (action.type) {
    case "GET_WORD_DATA":
      return { ...action.payload };
    case "RESET_WORD_DATA":
      return {
        wordData: null,
      };
    default:
      return state;
  }
};

// Provider component
type WordDataContextProviderProps = {
  children: ReactNode;
};

export const WordDataContextProvider = ({
  children,
}: WordDataContextProviderProps) => {
  const [state, dataDispatch] = useReducer(wordDataContextReducer, {
    wordData: null,
  });

  return (
    <WordDataContext.Provider value={{ ...state, dataDispatch }}>
      {children}
    </WordDataContext.Provider>
  );
};
