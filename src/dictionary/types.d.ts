import { POSTagsKeyType } from "./posTags";

interface TableEntryType {
  word: string;
  pronunciation: string;
  pos: string;
  meaning: string;
  verbClass: string;
}

interface DefinitionType extends TableEntryType {
  splitMeaning: string[];
  splitPOS: POSTagsKeyType[];
  tags: GrammarTags | [];
}

type DefinitionTypeRecord = Record<POSTagsKeyType, DefinitionType[]>;

type GrammarTags = (
  | // person
  "first"
  | "second"
  | "third"
  // quantity
  | "singular"
  | "plural"
  // ownership
  | "possesive"
  // status
  | "animate"
  | "inanimate"
  // gender
  | "masculine"
  | "feminine"
  | "neutral"
  // case/verb class
  | "koiwrit"
  | "active"
  | "stative"
  // distance
  | "near"
  | "far"
  | "farther"
  // inclusion
  | "inclusive"
  | "exclusive"
)[];
