import { createContext, useContext } from "react";
import { POSTagsKeyType } from "./dictionary/posTags";
import { DependencyTagsKey } from "./dictionary/dependencyTags";
import { Verbs } from "compromise/view/three";

export interface ParsedResponseType {
  parsed: {
    arcs: {
      dir: "left" | "right";
      end: number;
      label: DependencyTagsKey;
      start: number;
    }[];
    words: {
      tag: POSTagsKeyType;
      pos: POSTagsKeyType;
      text: string;
      lemma: string;
    }[];
  };
  html: string;
  verbData: Verbs;
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
