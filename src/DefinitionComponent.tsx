import { Box, Stack, Tooltip } from "@mui/material";
import { findMeaning } from "./dictionary/dictionary";
import { useAppStateContext } from "./state";
import { ArrayElement, ParsedResponse } from "./types";
import { posTagKeys, posTags, POSTagsKeyType } from "./dictionary/posTags";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import axios from "axios";
import { Howl } from "howler";

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

function pronounce(pronunciation: string) {
  void axios
    .post("https://iawll6of90.execute-api.us-east-1.amazonaws.com/production", {
      text: pronunciation,
      voice: "Maja",
    })
    .then((res: { data: string }) => {
      // play sound
      const sound = new Howl({
        src: ["data:audio/wav;base64," + res.data],
      });

      sound.play();
    });
}

function TagComponent(props: { tag: POSTagsKeyType }) {
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

function getDefinitions(word: ArrayElement<ParsedResponse["parsed"]["words"]>) {
  const style = {
    border: 1,
    borderColor: "secondary.main",
    borderRadius: 2,
    p: 2,
    m: 2,
  };
  const definitions = findMeaning(word.lemma, word.tag).map((found, j) => (
    <Box key={j} sx={style}>
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
          <VolumeUpIcon
            sx={{
              fontSize: 16,
            }}
          />
          ]
        </Stack>
      </Box>
      <div>
        (
        {found.splitPOS.map((pos, k) => {
          const isLast = found.splitPOS.length - 1 == k;
          return (
            <span key={k}>
              <TagComponent tag={pos} />
              {!isLast ? ", " : ""}
            </span>
          );
        })}
        ) {found.Meaning}
      </div>
    </Box>
  ));

  return definitions.length > 0 ? (
    definitions
  ) : (
    <Box sx={style}>No definitions found!</Box>
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
              {word.lemma} (<TagComponent tag={word.tag} />)
              {getDefinitions(word)}
            </Box>
          );
        })}
    </>
  );
}
