import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import axios, { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useAppStateContext } from "./state";
import { ParsedResponseType } from "./types";

interface FormType {
  "form-text"?: string;
}

function FormComponent() {
  const { setAppState } = useAppStateContext();

  const formik = useFormik({
    initialValues: {
      "form-text": "",
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
          setAppState({
            response: res.data,
            formText: values["form-text"],
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
