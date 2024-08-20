import { POSTagsKeyType } from "./dictionary/posTags";
import { DependencyTagsKey } from "./dictionary/dependencyTags";

interface ParsedResponse {
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
  response: ParsedResponse | Record<string, never>;
}

interface AppStateContextType {
  appState: AppStateType;
  setAppState: (value: Partial<AppStateType>) => void;
}

// helper type to get array element type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
