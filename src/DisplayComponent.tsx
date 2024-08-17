import { Box } from "@mui/material";
import { useAppStateContext } from "./state";

function DisplayComponent() {
  const {
    appState: { response },
  } = useAppStateContext();

  if (!response.html) {
    return null;
  }

  return (
    <Box sx={{ overflowX: "scroll" }}>
      <div dangerouslySetInnerHTML={{ __html: response.html }}></div>
    </Box>
  );
}

export default DisplayComponent;
