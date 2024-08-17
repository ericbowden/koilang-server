import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import koi from "./assets/koi.jpg";

function NavComponent() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 50,
            }}
            src={koi}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              ml: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            Koilang Translator
          </Typography>
          {/* <Box>
            <Button href="https://discord.com/" sx={{ color: "white" }}>
              Discord
            </Button>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavComponent;
