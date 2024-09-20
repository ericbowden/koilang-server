import { GrammarTagsType, sortTags } from "./grammarTags";
import { POSTagsKeyType } from "./posTags";
import { DefinitionType } from "./types";

export function generateMeaning(
  map: Record<string, Partial<DefinitionType>[]>,
  posKey: POSTagsKeyType,
) {
  Object.entries(map).forEach(([key, values]) => {
    values.forEach((value) => {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      sortTags(value.tags as GrammarTagsType);

      const tags = value.tags?.join(", ") ?? "";
      value.meaning = `${key} (${tags})`;
      value.splitMeaning = [key];
      value.splitPOS = [posKey];
    });
  });
}
