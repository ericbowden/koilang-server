import { Box, CircularProgress, Stack, Tooltip } from "@mui/material";
import { Definition, findMeaning } from "./dictionary/dictionary";
import { useAppStateContext } from "./state";
import { ArrayElement, ParsedResponse } from "./types";
import { posTagKeys, posTags, POSTagsKeyType } from "./dictionary/posTags";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import axios from "axios";
import { Howl } from "howler";
import { useState } from "react";

// Tags we want to translate (for now)
/* const FocusedTags: POSTagsKeyType[] = [
  "ADJ",
  "ADV",
  "CONJ",
  "DET",
  "INTJ",
  "NOUN",
  "NUM",
  "PRON",
  "PROPN",
  "VERB",
]; */

// currently we focus on translating all tags
const FocusedTags = posTagKeys;

function POSTagComponent(props: { tag: POSTagsKeyType }) {
  const { tag } = props;
  return (
    <Tooltip title={posTags[tag]} arrow>
      <Box
        component="span"
        sx={{
          border: 0,
          borderBottom: 1,
          borderColor: "primary.main",
          borderStyle: "dashed",
          cursor: "pointer",
        }}
      >
        {tag}
      </Box>
    </Tooltip>
  );
}

const definitionsStyle = {
  border: 1,
  borderColor: "secondary.main",
  borderRadius: 2,
  p: 2,
  m: 2,
};

function Term(props: { found: Definition }) {
  const { found } = props;
  const [loading, setLoading] = useState(false);
  function pronounce(pronunciation: string) {
    if (loading) return;

    setLoading(true);
    void axios
      .post(
        "https://iawll6of90.execute-api.us-east-1.amazonaws.com/production",
        {
          text: pronunciation,
          voice: "Maja",
        },
      )
      .then((res: { data: string }) => {
        // play sound
        const sound = new Howl({
          src: ["data:audio/wav;base64," + res.data],
        });

        sound.play();
        setLoading(false);
      });
  }

  return (
    <Box sx={definitionsStyle}>
      <Box
        onClick={() => {
          pronounce(found.Pronunciation);
        }}
      >
        <Box fontWeight="bold" display="inline">
          {found.Word}
        </Box>
        <Stack
          alignItems="center"
          direction="row"
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            "&:hover": {
              color: "secondary.main",
            },
          }}
        >
          &nbsp;[/{found.Pronunciation}/
          {!loading ? (
            <VolumeUpIcon
              sx={{
                fontSize: 16,
              }}
            />
          ) : (
            <CircularProgress size={16} />
          )}
          ]
        </Stack>
      </Box>
      <div>
        (
        {found.splitPOS.map((pos, k) => {
          const isLast = found.splitPOS.length - 1 == k;
          return (
            <span key={k}>
              <POSTagComponent tag={pos} />
              {!isLast ? ", " : ""}
            </span>
          );
        })}
        ) {found.Meaning}
      </div>
    </Box>
  );
}

function Definition(props: {
  word: ArrayElement<ParsedResponse["parsed"]["words"]>;
}) {
  const { word } = props;

  const definitions = findMeaning(word.lemma, word.tag).map((found, i) => (
    <Box key={i}>
      <Term found={found} />
    </Box>
  ));

  return definitions.length > 0 ? (
    definitions
  ) : (
    <Box sx={definitionsStyle}>No definitions found!</Box>
  );
}

export default function DefinitionsComponent() {
  const {
    appState: { response },
  } = useAppStateContext();

  return (
    <>
      {response.parsed.words
        // filter out words that we don't want to focus on
        .filter((word) => {
          return FocusedTags.includes(word.tag);
        })
        .map((word, i) => {
          return (
            <Box
              key={i}
              sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 2,
                marginBottom: 2,
                p: 2,
              }}
            >
              {word.lemma} (<POSTagComponent tag={word.tag} />)
              <Definition word={word} />
            </Box>
          );
        })}
    </>
  );
}
