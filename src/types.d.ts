import { POSTagsKeyType } from "./dictionary/posTags";
import { DependencyTagsKey } from "./dictionary/dependencyTags";

interface ParsedResponseType {
  parsed: {
    arcs: {
      dir: "left" | "right";
      end: number;
      label: DependencyTagsKey;
      start: number;
    }[];
    words: {
      tag: POSTagsKeyType;
      text: string;
      lemma: string;
    }[];
  };
  html: string;
}

interface AppStateType {
  response: ParsedResponseType | Record<string, never>;
  formText: string;
  isWord: boolean;
}

interface AppStateContextType {
  appState: AppStateType;
  setAppState: (value: Partial<AppStateType>) => void;
}

// helper type to get array element type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
