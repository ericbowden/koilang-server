// order here determines the label display order
export const GrammarTags = [
  // person
  //"first",
  //"second",
  //"third",
  // ownership
  "possesive",
  // status
  "animate",
  "inanimate",
  // gender
  "neutral",
  "masculine",
  "feminine",
  // case/verb class
  "active",
  "stative",
  "koiwrit",
  // inclusion
  "inclusive",
  "exclusive",
  // distance
  "near",
  "far",
  "farther",
  // quantity
  "singular",
  "plural",
] as const;

export type GrammarTagType = ArrayElement<typeof GrammarTags>;
export type GrammarTagsType = GrammarTagType[];

type OrderMapType = Record<ArrayElement<typeof GrammarTags>, number>;

// Create a map for quick lookup of the order index
const orderMap = GrammarTags.reduce<OrderMapType>((map, tag, index) => {
  map[tag] = index;
  return map;
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
}, {} as OrderMapType);

/**
 * Sort an array of tags based on their position in the GrammarTags array
 */
export function sortTags(arr: GrammarTagsType) {
  arr.sort((a, b) => orderMap[a] - orderMap[b]);
}
