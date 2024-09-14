import { DefinitionType } from "./types";
import { generateMeaning } from "./utils";

const pronounMap: Record<string, Partial<DefinitionType>[]> = {
  // 1st person
  I: [
    // active
    {
      tags: ["singular", "neutral", "active"],
      word: "nsa",
      pronunciation: "nsɑ",
    },
    {
      tags: ["singular", "masculine", "active"],
      word: "nsae",
      pronunciation: "nse",
    },
    {
      tags: ["singular", "feminine", "active"],
      word: "nsi",
      pronunciation: "nsi",
    },
    // stative
    {
      tags: ["singular", "neutral", "stative", "koiwrit"],
      word: "tsa",
      pronunciation: "ʦɑ",
    },
    {
      tags: ["singular", "masculine", "stative", "koiwrit"],
      word: "tsaej",
      pronunciation: "ʦeʒ",
    },
    {
      tags: ["singular", "feminine", "stative", "koiwrit"],
      word: "tsij",
      pronunciation: "ʦiʒ",
    },
  ],
  me: [
    // active
    {
      tags: ["singular", "neutral", "active"],
      word: "nsa",
      pronunciation: "nsɑ",
    },
    {
      tags: ["singular", "masculine", "active"],
      word: "nsae",
      pronunciation: "nse",
    },
    {
      tags: ["singular", "feminine", "active"],
      word: "nsi",
      pronunciation: "nsi",
    },
    // stative
    {
      tags: ["singular", "neutral", "stative", "koiwrit"],
      word: "tsa",
      pronunciation: "ʦɑ",
    },
    {
      tags: ["singular", "masculine", "stative", "koiwrit"],
      word: "tsaej",
      pronunciation: "ʦeʒ",
    },
    {
      tags: ["singular", "feminine", "stative", "koiwrit"],
      word: "tsij",
      pronunciation: "ʦiʒ",
    },
  ],
  mine: [
    // active
    {
      tags: ["singular", "neutral", "active"],
      word: "nsa",
      pronunciation: "nsɑ",
    },
    {
      tags: ["singular", "masculine", "active"],
      word: "nsae",
      pronunciation: "nse",
    },
    {
      tags: ["singular", "feminine", "active"],
      word: "nsi",
      pronunciation: "nsi",
    },
    // stative
    {
      tags: ["singular", "neutral", "stative", "koiwrit"],
      word: "tsa",
      pronunciation: "ʦɑ",
    },
    {
      tags: ["singular", "masculine", "stative", "koiwrit"],
      word: "tsaej",
      pronunciation: "ʦeʒ",
    },
    {
      tags: ["singular", "feminine", "stative", "koiwrit"],
      word: "tsij",
      pronunciation: "ʦiʒ",
    },
  ],
  my: [
    {
      tags: ["possesive", "singular", "neutral", "active"],
      word: "cho",
      pronunciation: "tʃo",
    },
    {
      tags: ["possesive", "singular", "masculine", "active"],
      word: "chae",
      pronunciation: "tʃe",
    },
    {
      tags: ["possesive", "singular", "feminine", "active"],
      word: "chi",
      pronunciation: "tʃi",
    },

    {
      tags: ["possesive", "singular", "neutral", "stative", "koiwrit"],
      word: "tso",
      pronunciation: "ʦo",
    },
    {
      tags: ["possesive", "singular", "masculine", "stative", "koiwrit"],
      word: "chy",
      pronunciation: "tʃə",
    },
    {
      tags: ["possesive", "singular", "feminine", "stative", "koiwrit"],
      word: "tsy",
      pronunciation: "tsə",
    },
  ],

  // 1st person plural
  we: [
    // inclusive
    {
      tags: ["inclusive", "plural", "neutral", "active", "koiwrit"],
      word: "be",
      pronunciation: "bɛ",
    },
    {
      tags: ["inclusive", "plural", "masculine", "active", "koiwrit"],
      word: "ba",
      pronunciation: "bɑ",
    },
    {
      tags: ["inclusive", "plural", "feminine", "active", "koiwrit"],
      word: "bii",
      pronunciation: "bɪ",
    },

    {
      tags: ["inclusive", "plural", "neutral", "stative"],
      word: "baej",
      pronunciation: "beʒ",
    },
    {
      tags: ["inclusive", "plural", "masculine", "stative"],
      word: "baj",
      pronunciation: "bɑʒ",
    },
    {
      tags: ["inclusive", "plural", "feminine", "stative"],
      word: "bij",
      pronunciation: "biʒ",
    },

    // exclusive
    {
      tags: ["exclusive", "plural", "neutral", "active", "koiwrit"],
      word: "ite",
      pronunciation: "ˈitɛ",
    },
    {
      tags: ["exclusive", "plural", "masculine", "active"],
      word: "ita",
      pronunciation: "itɑ",
    },
    {
      tags: ["exclusive", "plural", "feminine", "active"],
      word: "itii",
      pronunciation: "itɪ",
    },

    {
      tags: ["exclusive", "plural", "neutral", "stative"],
      word: "tev",
      pronunciation: "ˈtɛv",
    },
    {
      tags: ["exclusive", "plural", "masculine", "stative", "koiwrit"],
      word: "tav",
      pronunciation: "tɑv",
    },
    {
      tags: ["exclusive", "plural", "feminine", "stative", "koiwrit"],
      word: "itiiv",
      pronunciation: "itɪv",
    },
  ],
  our: [
    // inclusive
    {
      tags: [
        "possesive",
        "inclusive",
        "plural",
        "neutral",
        "active",
        "koiwrit",
      ],
      word: "yii",
      pronunciation: "jɪ",
    },
    {
      tags: [
        "possesive",
        "inclusive",
        "plural",
        "masculine",
        "active",
        "koiwrit",
      ],
      word: "by",
      pronunciation: "bə",
    },
    {
      tags: [
        "possesive",
        "inclusive",
        "plural",
        "feminine",
        "active",
        "koiwrit",
      ],
      word: "iby",
      pronunciation: "ibə",
    },

    {
      tags: ["possesive", "inclusive", "plural", "neutral", "stative"],
      word: "yev",
      pronunciation: "jɛv",
    },
    {
      tags: ["possesive", "inclusive", "plural", "masculine", "stative"],
      word: "bu",
      pronunciation: "bu",
    },
    {
      tags: ["possesive", "inclusive", "plural", "feminine", "stative"],
      word: "ibu",
      pronunciation: "ibu",
    },

    // exclusive
    {
      tags: [
        "possesive",
        "exclusive",
        "plural",
        "neutral",
        "active",
        "koiwrit",
      ],
      word: "vy",
      pronunciation: "və",
    },
    {
      tags: ["possesive", "exclusive", "plural", "masculine", "active"],
      word: "ty",
      pronunciation: "tə",
    },
    {
      tags: ["possesive", "exclusive", "plural", "feminine", "active"],
      word: "ity",
      pronunciation: "ɪtə",
    },

    {
      tags: ["possesive", "exclusive", "plural", "neutral", "stative"],
      word: "yu",
      pronunciation: "ju",
    },
    {
      tags: [
        "possesive",
        "exclusive",
        "plural",
        "masculine",
        "stative",
        "koiwrit",
      ],
      word: "tu",
      pronunciation: "tu",
    },
    {
      tags: [
        "possesive",
        "exclusive",
        "plural",
        "feminine",
        "stative",
        "koiwrit",
      ],
      word: "itu",
      pronunciation: "itu",
    },
  ],
  us: [
    {
      tags: ["inclusive", "plural", "neutral", "stative"],
      word: "baej",
      pronunciation: "beʒ",
    },
    {
      tags: ["inclusive", "plural", "masculine", "stative"],
      word: "baj",
      pronunciation: "bɑʒ",
    },
    {
      tags: ["inclusive", "plural", "feminine", "stative"],
      word: "bij",
      pronunciation: "biʒ",
    },

    {
      tags: ["exclusive", "plural", "neutral", "stative"],
      word: "tev",
      pronunciation: "ˈtɛv",
    },
    {
      tags: ["exclusive", "plural", "masculine", "stative", "koiwrit"],
      word: "tav",
      pronunciation: "tɑv",
    },
    {
      tags: ["exclusive", "plural", "feminine", "stative", "koiwrit"],
      word: "itiiv",
      pronunciation: "itɪv",
    },
  ],

  // 2nd person singular/plural
  you: [{ tags: [], word: "", pronunciation: "" }],
  your: [{ tags: [], word: "", pronunciation: "" }],

  // 3rd person
  she: [{ tags: [], word: "", pronunciation: "" }],
  he: [{ tags: [], word: "", pronunciation: "" }],
  him: [{ tags: [], word: "", pronunciation: "" }],
  her: [{ tags: [], word: "", pronunciation: "" }],
  it: [{ tags: [], word: "", pronunciation: "" }],
  its: [{ tags: [], word: "", pronunciation: "" }],

  // 3rd person plural
  they: [{ tags: [], word: "", pronunciation: "" }],
  them: [{ tags: [], word: "", pronunciation: "" }],
  their: [{ tags: [], word: "", pronunciation: "" }],
  theirs: [{ tags: [], word: "", pronunciation: "" }],
} as const;

// generate meaning for pronouns
generateMeaning(pronounMap, "PRON");

// convert to DefinitionType array
export const pronouns = Object.values(pronounMap).flat() as DefinitionType[];
