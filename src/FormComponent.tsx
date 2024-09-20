import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import axios, { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useAppStateContext, ParsedResponseType, ArcType } from "./state";

interface FormType {
  "form-text"?: string;
}

function processResponse(res: ParsedResponseType) {
  const arcsByStartMap: Record<number, ArcType[] | undefined> = {};

  // Group arcs by their 'start' index
  res.parsed.arcs.forEach((arc) => {
    const start = arc.dir == "right" ? arc.start : arc.end;
    const end = arc.dir == "right" ? arc.end : arc.start;
    // for some reason spacey inverts these props if dir == left
    // so we assign them correctly here
    arc.start = start;
    arc.end = end;
    // populate map
    if (!arcsByStartMap[arc.start]) {
      arcsByStartMap[arc.start] = [];
    }

    arcsByStartMap[arc.start]?.push(arc);
  });

  // Process each word and assign arcs
  res.parsed.words.forEach((word, index) => {
    word.arcs = arcsByStartMap[index] ?? [];

    word.arcs.forEach((arc) => {
      arc.endWord = res.parsed.words[arc.end];
    });
  });
}

function FormComponent() {
  const { setAppState } = useAppStateContext();

  const formik = useFormik({
    initialValues: {
      "form-text": "",
      //"form-text": "I have worked on my language.",
      //"form-text": "The sun is setting on golden grains of sand",
      //"form-text": "I ate a chicken",
      //"form-text": "I ate a sandwhich and it was real good!",
      //"form-text": "a super quick dog jumps over the slow slow fox",
    },
    validate: (values) => {
      const errors: FormType = {};

      if (!values["form-text"]) {
        errors["form-text"] = "Must set value!";
      }

      return errors;
    },
    onSubmit: (values) => {
      void axios
        .post("/process", {
          text: values["form-text"],
        })
        .then((res: AxiosResponse<ParsedResponseType>) => {
          const formText = values["form-text"];
          processResponse(res.data);
          setAppState({
            response: res.data,
            formText,
            isWord: res.data.parsed.words.length == 1,
          });
        });
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      display="flex"
      padding={1}
      alignItems="center"
      gap={1}
      justifyContent="center"
    >
      <TextField
        label="Word or Phrase"
        variant="outlined"
        id="form-text"
        sx={{ width: 250 }}
        value={formik.values["form-text"]}
        onChange={formik.handleChange}
        error={formik.touched["form-text"] && !!formik.errors["form-text"]}
        helperText={formik.errors["form-text"]}
      />
      <Button variant="contained" type="submit">
        Translate
      </Button>
    </Box>
  );
}

export default FormComponent;
