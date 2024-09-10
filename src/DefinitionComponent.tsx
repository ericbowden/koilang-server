import { Box, CircularProgress, Stack, Tooltip } from "@mui/material";
import { DefinitionType, findMeaning } from "./dictionary/dictionaryUtils";
import { ParsedResponseType, useAppStateContext } from "./state";
import { posTags, POSTagsKeyType } from "./dictionary/posTags";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import axios from "axios";
import { Howl } from "howler";
import { useState } from "react";

// Tags we could only translate (for now)
/* const focusedPOS: POSTagsKeyType[] = [
  "ADJ",
  //"ADV",
  //"CONJ",
  //"DET",
  //"INTJ",
  "NOUN",
  //"NUM",
  "PRON",
  //"PROPN",
  "VERB",
]; */

function POSComponent(props: { pos: POSTagsKeyType }) {
  const { pos } = props;
  return (
    <Tooltip title={posTags[pos]} arrow>
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
        {pos}
      </Box>
    </Tooltip>
  );
}

const definitionsStyle = {
  border: 1,
  borderColor: "secondary.main",
  borderRadius: 1,
  p: 2,
  m: 2,
};

function Term(props: { found: DefinitionType }) {
  const { found } = props;
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
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
          onplay: function () {
            setLoading(false);
            setPlaying(true);
          },
          onend: function () {
            setPlaying(false);
          },
        });

        sound.play();
      });
  }

  const volumeElement = loading ? (
    <CircularProgress size={16} />
  ) : playing ? (
    <PlayArrowIcon sx={{ fontSize: 16 }} />
  ) : (
    <VolumeUpIcon sx={{ fontSize: 16 }} />
  );

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
        {found.Pronunciation && (
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
            &nbsp;[/{found.Pronunciation}/{volumeElement}]
          </Stack>
        )}
      </Box>
      <div>
        (
        {found.splitPOS.map((pos, k) => {
          const isLast = found.splitPOS.length - 1 == k;
          return (
            <span key={k}>
              <POSComponent pos={pos} />
              {!isLast ? ", " : ""}
            </span>
          );
        })}
        ) {found.Meaning}
      </div>
    </Box>
  );
}

type Word = ArrayElement<ParsedResponseType["parsed"]["words"]>;

function Definition(props: {
  word: Word;
}) {
  const { word } = props;
  const {
    appState: { isWord },
  } = useAppStateContext();

  const phraseTags = !isWord ? word.pos : undefined;

  const definitions = findMeaning(word.lemma, phraseTags).map((found, i) => (
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

const getDefinitionText = (word: Word) => {
  return word.lemma.toLowerCase() === word.text.toLowerCase()
    ? word.text
    : `${word.text} [to ${word.lemma}]`;
}

export default function DefinitionsComponent() {
  const {
    appState: { response, isWord },
  } = useAppStateContext();

  return (
    <>
      {response.parsed.words
        // filter out pos that we don't want to show
        /* .filter((word) => {
          //return !["PUNCT"].includes(word.tag);
          //return focusedTags.includes(word.tag);
        }) */
        .map((word, i) => {
          return (
            <Box
              key={i}
              sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                marginBottom: 2,
                p: 2,
              }}
            >
              {getDefinitionText(word)}{" "}
              {!isWord && (
                <>
                  (<POSComponent pos={word.pos} />/
                  <POSComponent pos={word.tag} />)
                </>
              )}
              <Definition word={word} />
            </Box>
          );
        })}
    </>
  );
}
