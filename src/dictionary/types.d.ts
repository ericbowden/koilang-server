import { GrammarTagsType } from "./grammarTags";
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
  tags: GrammarTagsType;
}

type DefinitionTypeRecord = Record<POSTagsKeyType, DefinitionType[]>;
