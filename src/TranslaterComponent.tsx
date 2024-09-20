import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppStateContext, WordType } from "./state";
import { findMeaning } from "./dictionary/dictionaryUtils";
import { getVerbClass, getVerbTense } from "./dictionary/verb";
import { DependencyTagsKey } from "./dictionary/dependencyTags";
import { GrammarTagsType, GrammarTagType } from "./dictionary/grammarTags";

const findDepByTag = (
  word: WordType,
  tag: DependencyTagsKey,
): WordType | undefined => {
  for (const arc of word.arcs) {
    if (arc.label === tag) {
      return arc.endWord;
    } else {
      // recurse through all the words looking at each arc
      const result = findDepByTag(arc.endWord, tag);
      if (result) {
        return result;
      }
    }
  }
};

function translateVerb(verb: WordType) {
  // get verb
  const verbDefinitions = findMeaning(verb.lemma, "VERB");

  if (verbDefinitions.length === 0) {
    return <Box>Unable to translated, some words not found!</Box>;
  }

  const { word, pronunciation } = verbDefinitions[0];
  let finalPhrase = word;
  let finalPronunciation = pronunciation;
  const verbClass = getVerbClass(word);

  // get tense
  const tense = getVerbTense(verb);
  finalPhrase = tense.text + (tense.prefix ? "" : " ") + finalPhrase;
  finalPronunciation =
    tense.pronunciation + (tense.prefix ? "" : " ") + finalPronunciation;

  // get subject/pron
  const subjectClass = verbClass;

  // look for the subject associated with the verb
  const foundSubject = findDepByTag(verb, "nsubj");
  if (foundSubject) {
    // look for first pronoun that matches
    const subject = findMeaning(foundSubject.lemma, "PRON").find((sub) => {
      return sub.tags.includes(subjectClass);
    });

    if (subject) {
      finalPhrase = subject.word + " " + finalPhrase;
      finalPronunciation = subject.pronunciation + " " + finalPronunciation;
    }
  }

  // todo get plural determiner

  // get determiner
  const objectClass: GrammarTagType =
    verbClass === "active" ? "stative" : "active"; // opposite of verb
  const foundDeterminer = findDepByTag(verb, "det");
  const foundObj = findDepByTag(verb, "dobj");
  if (foundDeterminer) {
    const isPluralObj = foundObj && ["NNS", "NNPS"].includes(foundObj.tag);
    const searchArray: GrammarTagsType = [objectClass];
    if (isPluralObj) {
      searchArray.push("plural");
    }

    // look for first determiner that matches
    const determiner = findMeaning(foundDeterminer.lemma, "DET").find((obj) => {
      return searchArray.every((tag) => obj.tags.includes(tag));
    });

    if (determiner) {
      finalPhrase = finalPhrase + " " + determiner.word;
      finalPronunciation = finalPronunciation + " " + determiner.pronunciation;
    }
  }

  // get object
  if (foundObj) {
    const obj = findMeaning(foundObj.lemma)[0];

    finalPhrase = finalPhrase + " " + obj.word;
    finalPronunciation = finalPronunciation + " " + obj.pronunciation;
  }

  // todo get mood

  return (
    <Box>
      {finalPhrase}
      <br />/{finalPronunciation}/
    </Box>
  );
}

export default function TranslaterComponent() {
  const [translatedSentence, setTranslatedSentence] = useState<JSX.Element[]>(
    [],
  );
  const {
    appState: { response },
  } = useAppStateContext();

  useEffect(() => {
    const sentence: JSX.Element[] = [];

    // translate verbs
    const verbs = response.parsed.words.filter((word) => word.pos == "VERB");
    verbs.forEach((verb) => {
      sentence.push(translateVerb(verb));
    });

    setTranslatedSentence(sentence);
  }, [response.parsed]);

  return (
    <Typography
      variant="h6"
      display="flex"
      padding={1}
      alignItems="center"
      gap={1}
      justifyContent="center"
      sx={{
        marginBottom: 2,
        p: 2,
      }}
    >
      {translatedSentence}
    </Typography>
  );
}
