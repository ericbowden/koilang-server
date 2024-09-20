import { createContext, useContext } from "react";
import { POSTagsKeyType } from "./dictionary/posTags";
import { DependencyTagsKey } from "./dictionary/dependencyTags";

export interface ArcType {
  dir: "left" | "right";
  end: number;
  label: DependencyTagsKey;
  start: number;
  endWord: WordType;
}

export interface WordType {
  tag: POSTagsKeyType;
  pos: POSTagsKeyType;
  text: string;
  lemma: string;
  arcs: ArcType[];
}

export interface ParsedResponseType {
  parsed: {
    arcs: ArcType[];
    words: WordType[];
  };
  html: string;
}

export interface AppStateType {
  response: ParsedResponseType | Record<string, never>;
  formText: string;
  isWord: boolean;
}

export interface AppStateContextType {
  appState: AppStateType;
  setAppState: (value: Partial<AppStateType>) => void;
}

// create app context
export const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

// helper method to use app context in a hook
export const useAppStateContext = () => {
  return useContext(AppStateContext);
};
