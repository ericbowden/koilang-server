import { posTagKeys, POSTagsKeyType } from "./posTags";
import table from "./dataTable";
import { pronouns } from "./pronoun";
import { DefinitionType, DefinitionTypeRecord, TableEntryType } from "./types";
import { articles } from "./determiner";

const koiDictToPosMap = {
  adj: "ADJ",
  adv: "ADV",
  conj: "CONJ",
  det: "DET",
  int: "INTJ",
  n: "NOUN",
  num: "NUM",
  pn: "PRON",
  ppr: "PROPN",
  v: "VERB",

  // not used in spacy, only in the koi dict
  o: "ONOMATOPOEIA",
  phr: "PHRASE",
  post: "POSITION",
} as const;

type KoiDictKeyType = keyof typeof koiDictToPosMap;
const koiDictToPosMapKeys = Object.keys(koiDictToPosMap) as KoiDictKeyType[];

const tableEntryMap: Record<string, keyof TableEntryType> = {
  Word: "word",
  Pronunciation: "pronunciation",
  POS: "pos",
  Meaning: "meaning",
  "Verb Class": "verbClass",
} as const;

// init pos dictionary
const dictByPOSMap = Object.fromEntries(
  posTagKeys.map((key) => [key, [] as DefinitionType[]]),
) as DefinitionTypeRecord;

function addToPOSDictionaries(entry: DefinitionType, line: string) {
  if (!entry.pos) {
    throw new Error("ParseError: No POS entry for line: " + line);
  }

  // loop over and add pos dictionaries
  koiDictToPosMapKeys.forEach((koiKey) => {
    if (entry.pos.match(koiKey)) {
      const posKey = koiDictToPosMap[koiKey];
      // if pos found add it to that pos dictionary
      if (posKey in dictByPOSMap) {
        dictByPOSMap[posKey as POSTagsKeyType].push(entry);
      }
    }
  });
}

function convertDictToJSONArray(input: string) {
  const lines = input.trim().split("\n");
  const headers = lines[0].split("\t");
  const data = lines.slice(1).map((line) => {
    const values = line.split("\t");
    const entry = {} as DefinitionType;

    // add per each header
    headers.forEach((header, index) => {
      if (values[index]) {
        const mapping = tableEntryMap[header];
        entry[mapping] = values[index].trim();
      }
    });

    // split meaning on whitespace
    entry.splitMeaning = entry.meaning.match(/\b\w+\b/g) ?? [];

    // split POS on ';' and convert to official POS
    entry.splitPOS = entry.pos
      .split(";")
      .map(
        (pos: string) =>
          koiDictToPosMap[pos.trim() as KoiDictKeyType] as POSTagsKeyType,
      );

    // add tags
    entry.tags = [];

    // add to POS dictionaries
    addToPOSDictionaries(entry, line);

    return entry;
  });

  return data;
}
console.time("convertDataTime");
// convert table to json array
const dictArray = convertDictToJSONArray(table);

// add extra definitions
dictArray.push(...pronouns, ...articles);
dictByPOSMap.PRON = [...pronouns, ...dictByPOSMap.PRON];
dictByPOSMap.DET = [...articles, ...dictByPOSMap.DET];

console.timeEnd("convertDataTime");

export function findMeaning(text: string, dictKey?: POSTagsKeyType) {
  const dictToUse = dictKey ? dictByPOSMap[dictKey] : dictArray;

  const found = dictToUse.filter((item: DefinitionType) => {
    return item.splitMeaning.includes(text);
  });

  return found.length > 0 ? found : undefined;
}
