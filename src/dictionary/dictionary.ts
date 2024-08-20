import { posTagKeys, POSTagsKeyType } from "./posTags";
import table from "./table";

const koiDictToPosMap = {
  adj: "ADJ",
  adv: "ADV",
  conj: "CONJ",
  det: "DET",
  int: "INTJ",
  n: "NOUN",
  num: "NUM",
  o: "", // onomatopoeia
  phr: "", // phrase
  pn: "PRON",
  post: "", // position
  ppr: "PROPN",
  v: "VERB",
} as const;

type KoiDictKeyType = keyof typeof koiDictToPosMap;
const koiDictToPosMapKeys = Object.keys(koiDictToPosMap) as KoiDictKeyType[];

interface TableEntry {
  Word: string;
  Pronunciation: string;
  POS: string;
  Meaning: string;
  "Verb Class": string;
}

export interface Definition extends TableEntry {
  splitMeaning: string[];
  splitPOS: string[];
}

const dictByPOSMap = Object.fromEntries(
  posTagKeys.map((key) => [key, [] as Definition[]]),
) as Record<POSTagsKeyType, Definition[]>;

function addToPOSDictionaries(entry: Definition, line: string) {
  if (!entry.POS) {
    throw new Error("ParseError: No POS entry for line: " + line);
  }

  // loop over and add pos dictionaries
  koiDictToPosMapKeys.forEach((koiKey) => {
    if (entry.POS.match(koiKey)) {
      const posKey = koiDictToPosMap[koiKey];
      // if pos found add it to that pos dictionary
      if (posKey) {
        dictByPOSMap[posKey].push(entry);
      }
    }
  });
}

function convertDictToJSONArray(input: string) {
  const lines = input.trim().split("\n");
  const headers = lines[0].split("\t") as (keyof TableEntry)[];
  const data = lines.slice(1).map((line) => {
    const values = line.split("\t");
    const entry = {} as Definition;

    // add per each header
    headers.forEach((header, index) => {
      if (values[index]) {
        entry[header] = values[index].trim();
      }
    });

    // split meaning on whitespace
    entry.splitMeaning = entry.Meaning.split(" ");

    // split POS on ';' and convert to official POS
    entry.splitPOS = entry.POS.split(";").map(
      (pos: string) => koiDictToPosMap[pos.trim() as KoiDictKeyType],
    );

    // add to POS dictionaries
    addToPOSDictionaries(entry, line);

    return entry;
  });

  return data;
}

const dictArray = convertDictToJSONArray(table);

export function findMeaning(text: string, dictKey?: POSTagsKeyType) {
  const dictToUse = dictKey ? dictByPOSMap[dictKey] : dictArray;

  return dictToUse.filter((item: Definition) => {
    return item.splitMeaning.includes(text);
  });
}
