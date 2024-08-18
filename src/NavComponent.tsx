import React from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import koi from "./assets/koi.webp";

function NavComponent() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;
  const navItems: Record<string, string> = {
    Discord: "https://discord.gg/bxvCg2g",
    Reddit: "https://www.reddit.com/r/tsevhu/",
    Github: "https://github.com/ericbowden/koilang-server",
  };

  return (
    <AppBar position="static" component="nav">
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

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            {Object.keys(navItems).map((item) => (
              <Button
                key={item}
                target="_blank"
                href={navItems[item]}
                color="inherit"
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={
                {
                  //display: { xs: "block", md: "none" },
                }
              }
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              variant="temporary"
              open={mobileOpen}
              anchor="right"
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                  Koilang Translator
                </Typography>
                <Divider />
                <List>
                  {Object.keys(navItems).map((item) => (
                    <ListItem key={item} disablePadding>
                      <ListItemButton
                        target="_blank"
                        sx={{ textAlign: "center" }}
                        href={navItems[item]}
                      >
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavComponent;
