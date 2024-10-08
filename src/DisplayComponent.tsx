import { Box, Tab, Tabs } from "@mui/material";
import { useAppStateContext } from "./state";
import React from "react";
import DefinitionsComponent from "./DefinitionComponent";
import SVGComponent from "./SVGComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

function DisplayComponent() {
  const {
    appState: { response, isWord },
  } = useAppStateContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!response.html) {
    return null;
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab label={`${isWord ? "Word" : "Phrase"} Translation`} />
        {!isWord && <Tab label="Dependency Graph" />}
      </Tabs>
      <Box sx={{ marginTop: 2 }}>
        <TabPanel value={value} index={0}>
          <DefinitionsComponent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SVGComponent />
        </TabPanel>
      </Box>
    </>
  );
}

export default DisplayComponent;
