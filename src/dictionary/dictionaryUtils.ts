import { posTagKeys, POSTagsKeyType } from "./posTags";
import table from "./dataTable";

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

interface TableEntryType {
  Word: string;
  Pronunciation: string;
  POS: string;
  Meaning: string;
  "Verb Class": string;
}

export interface DefinitionType extends TableEntryType {
  splitMeaning: string[];
  splitPOS: POSTagsKeyType[];
}

const dictByPOSMap = Object.fromEntries(
  posTagKeys.map((key) => [key, [] as DefinitionType[]]),
) as Record<POSTagsKeyType, DefinitionType[]>;

function addToPOSDictionaries(entry: DefinitionType, line: string) {
  if (!entry.POS) {
    throw new Error("ParseError: No POS entry for line: " + line);
  }

  // loop over and add pos dictionaries
  koiDictToPosMapKeys.forEach((koiKey) => {
    if (entry.POS.match(koiKey)) {
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
  const headers = lines[0].split("\t") as (keyof TableEntryType)[];
  const data = lines.slice(1).map((line) => {
    const values = line.split("\t");
    const entry = {} as DefinitionType;

    // add per each header
    headers.forEach((header, index) => {
      if (values[index]) {
        entry[header] = values[index].trim();
      }
    });

    // split meaning on whitespace
    entry.splitMeaning = entry.Meaning.match(/\b\w+\b/g) ?? [];

    // split POS on ';' and convert to official POS
    entry.splitPOS = entry.POS.split(";").map(
      (pos: string) =>
        koiDictToPosMap[pos.trim() as KoiDictKeyType] as POSTagsKeyType,
    );

    // add to POS dictionaries
    addToPOSDictionaries(entry, line);

    return entry;
  });

  return data;
}
console.time("convertDataTime");
const dictArray = convertDictToJSONArray(table);
console.timeEnd("convertDataTime");

export function findMeaning(text: string, dictKey?: POSTagsKeyType) {
  const dictToUse = dictKey ? dictByPOSMap[dictKey] : dictArray;

  return dictToUse.filter((item: DefinitionType) => {
    return item.splitMeaning.includes(text);
  });
}
