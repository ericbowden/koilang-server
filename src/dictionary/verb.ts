import { WordType } from "../state";

// once you know if verb is active or stative then you know what the 'case' of the subject is, which will match
// object will take the opposite of that

// once you know that then you can choose the pronoun/article words

// there are active/stative slots on the fish

// ## Senetence structure ##

// articles/pronouns/numbers always show up before the nouns

// adjectives/prepositiions show up after

// verb can show up anywhere
// noun phrase (e.g. the blue dog) should be kept together

/* const activeVerbEndings = {
  // "": "CL1",
  yo: "CL1",
  se: "CL2",
  tso: "CL2", //with tsu
  tsu: "CL2", //with so,
  vha: "CL3",
  man: "CL3",
  kae: "CL4",
  da: "CL4",
} as const; */

const stativeVerbEndings = {
  "'en": "CL1",
  cet: "CL2",
  vh: "CL3", //with vhi
  vhi: "CL3", //with vh
  non: "CL3",
  ak: "CL4",
  ge: "CL4",
} as const;

const stativeVerbEndingKeys = Object.keys(
  stativeVerbEndings,
) as (keyof typeof stativeVerbEndings)[];

export function getVerbClass(verb: string) {
  const isStative = stativeVerbEndingKeys.some((ending) =>
    verb.endsWith(ending),
  );
  return isStative ? "stative" : "active";
}

// # Verb Tenses

// tenses are applied to the verb as a an aux word
// generally before the verb but aux word can appear anywhere
const tenses: Record<
  string,
  {
    text: string;
    pronunciation: string;
    prefix: boolean;
    label: string;
    koiDir: "N" | "NW" | "W" | "SW" | "S" | "SE" | "E" | "NE";
  }
> = {
  // applied as prefix to the verb
  nonfinite: {
    text: "i'",
    pronunciation: "iʔ",
    prefix: true,
    label: "always true or always happening",
    koiDir: "N",
  },
  // the following are applied as aux word
  remotePast: {
    text: "bae",
    pronunciation: " /be/",
    prefix: false,
    label: "far past not in your lifetime",
    koiDir: "NW",
  },
  medialPast: {
    text: "xir",
    pronunciation: "xiɾ",
    prefix: false,
    label: "past within your lifetime",
    koiDir: "W",
  },
  recentPast: {
    text: "ci",
    pronunciation: "çi",
    prefix: false,
    label: "yesterday or within a month",
    koiDir: "SW",
  },
  present: {
    text: "", // empty
    pronunciation: "",
    prefix: false,
    label: "present time",
    koiDir: "S",
  },
  present2: {
    text: "li",
    pronunciation: "li",
    prefix: false,
    label: "present time",
    koiDir: "S",
  },
  nearFuture: {
    text: "nui",
    pronunciation: "nui",
    prefix: false,
    label: "tomorrow or within a month",
    koiDir: "SE",
  },
  medialFuture: {
    text: "asi",
    pronunciation: "asi",
    prefix: false,
    label: "future within your lifetime",
    koiDir: "E",
  },
  remoteFuture: {
    text: "vhut",
    pronunciation: "βut",
    prefix: false,
    label: "future not in your lifetime",
    koiDir: "NE",
  },
} as const;

export function getVerbTense(word: WordType) {
  switch (word.tag) {
    case "VB": //"verb, base form",
      return tenses.present;
    case "VBD": //"verb, past tense",
      return tenses.recentPast;
    case "VBG": //"verb, gerund or present participle",
      return tenses.nonfinite;
    case "VBN": //"verb, past participle",
      return tenses.recentPast;
    case "VBP": //"verb, non-3rd person singular present",
      return tenses.present;
    case "VBZ": //"verb, 3rd person singular present",
      return tenses.present;
    default:
      return tenses.present;
  }
}

// # Mood
// adds speaker intent, based on aux words

// mood particles (all words start with h)

// look at aux word to determine the mood
// then add the tranlated aux word after verb
// mood aux word can appear anywhere tho

// affixes modify the verb

// # other section
// additinoal aspects of verbs
// adds suffix to end of verb after the 'verb class'

// # Adverb

// Look at what class of verb ending the verb has
// then add the adverb ending suffix to the adverb
