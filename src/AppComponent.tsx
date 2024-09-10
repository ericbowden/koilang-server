import { Container, createTheme, ThemeProvider } from "@mui/material";
import NavComponent from "./NavComponent";
import FormComponent from "./FormComponent";
import DisplayComponent from "./DisplayComponent";
import { useState } from "react";
import { AppStateContext, AppStateType } from "./state";

const theme = createTheme({
  shape: {
    borderRadius: 8, //pixels
  },
});

theme.typography.h6 = {
  fontSize: ".9rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.25rem",
  },
};

function AppComponent() {
  // init app state
  const [appState, _setAppState] = useState<AppStateType>({
    response: {},
    formText: "",
    isWord: false,
  });

  // helper method to allow passing partial objects into the app state
  const setAppState = (value: Partial<AppStateType>) => {
    _setAppState((prev) => ({ ...prev, ...value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <AppStateContext.Provider
        value={{
          appState,
          setAppState,
        }}
      >
        <NavComponent />
        <Container sx={{ marginTop: 2 }}>
          <FormComponent />
          <DisplayComponent />
        </Container>
      </AppStateContext.Provider>
    </ThemeProvider>
  );
}

export default AppComponent;
