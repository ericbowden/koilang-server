// the articles determine the 'case' of the nouns,
// aka what the subject or the object is in a sentence

import { DefinitionType } from "./types";

// plural can be determined by the noun dependency in the graph
// plural should be determined by the noun plural

export const articleMap: Record<string, Partial<DefinitionType>[]> = {
  "": [
    { tags: ["active", "singular", "koiwrit"], word: "", pronunciation: "" }, // null
    { tags: ["active", "singular"], word: "mn", pronunciation: "mn" }, // old (historical) form
  ],
  the: [
    { tags: ["active", "plural"], word: "na", pronunciation: "na" },
    { tags: ["stative", "singular"], word: "wn", pronunciation: "wn" },
    {
      tags: ["stative", "plural", "koiwrit"],
      word: "ul",
      pronunciation: "ul",
    },
  ],
  a: [
    { tags: ["active", "singular"], word: "ha", pronunciation: "ha" },
    {
      tags: ["stative", "singular", "koiwrit"],
      word: "sy",
      pronunciation: "sə",
    },
  ],
  some: [
    {
      tags: ["active", "plural", "koiwrit"],
      word: "vai",
      pronunciation: "vai",
    },
    { tags: ["stative", "plural"], word: "vu", pronunciation: "vu" },
  ],
  this: [
    {
      tags: ["active", "singular", "koiwrit", "near"],
      word: "na'a",
      pronunciation: "naʔa",
    },
    {
      tags: ["stative", "singular", "near"],
      word: "wna",
      pronunciation: "wna",
    },
  ],
  these: [
    {
      tags: ["active", "plural", "near", "near"],
      word: "na'au",
      pronunciation: "naʔɑʊ",
    },
    {
      tags: ["stative", "plural", "koiwrit", "near"],
      word: "ula",
      pronunciation: "ula",
    },
  ],
  that: [
    // far
    {
      tags: ["active", "singular", "far"],
      word: "na'e",
      pronunciation: "naʔɛ",
    },
    {
      tags: ["stative", "singular", "far", "koiwrit"],
      word: "wne",
      pronunciation: "wnɛ",
    },
    // farther
    {
      tags: ["active", "singular", "farther", "koiwrit"],
      word: "nu'e",
      pronunciation: "nuʔɛ",
    },
    {
      tags: ["stative", "singular", "farther"],
      word: "wke",
      pronunciation: "wkɛ",
    },
  ],
  those: [
    {
      tags: ["active", "plural", "far"],
      word: "ne'o",
      pronunciation: "nɛʔo",
    },
    {
      tags: ["stative", "plural", "far", "koiwrit"],
      word: "ulo",
      pronunciation: "ulo",
    },
    {
      tags: ["active", "plural", "farther", "koiwrit"],
      word: "nu'on",
      pronunciation: "nuʔon",
    },
    {
      tags: ["stative", "plural", "farther"],
      word: "ulon",
      pronunciation: "ulon",
    },
  ],
} as const;

// generate meaning
Object.entries(articleMap).forEach(([key, values]) => {
  values.forEach((value) => {
    const tags = value.tags?.join(", ") ?? "";
    value.meaning = `${key} (${tags})`;
    value.splitMeaning = [key];
    value.splitPOS = ["DET"];
  });
});

// convert to DefinitionType array
export const articles = Object.values(articleMap).flat() as DefinitionType[];
