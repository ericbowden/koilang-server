// order here determines the label display order
export const GrammarTags = [
  // person
  //"first",
  //"second",
  //"third",
  // quantity
  "singular",
  "plural",
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
] as const;

export type GrammarTagsType = ArrayElement<typeof GrammarTags>[];

type OrderMapType = Record<ArrayElement<typeof GrammarTags>, number>;

// Create a map for quick lookup of the order index
const orderMap = GrammarTags.reduce<OrderMapType>((map, tag, index) => {
  map[tag] = index;
  return map;
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
}, {} as OrderMapType);

export function sortTags(arr: GrammarTagsType) {
  arr.sort((a, b) => orderMap[a] - orderMap[b]);
}
