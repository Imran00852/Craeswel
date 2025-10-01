// Header.js
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const isTabletOrBelow = useMediaQuery("(max-width:944px)");
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { to: "/our-work", text: "Our Work" },
    { to: "/gallery", text: "Gallery" },
    { to: "/events", text: "Events" },
    { to: "/membership", text: "Membership" },
    { to: "/contact", text: "Contact" },
    { to: "/login", text: "Login" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#1A365D",
          color: "white",
          boxShadow: "none",
          py: 1,
          width: "100%",
          left: 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              px: "0 !important",
              minHeight: "64px !important",
              flexWrap: "wrap",
            }}
            disableGutters
          >
            {/* Logo Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src="/logo.png"
                alt="Craeswel Foundation Logo"
                sx={{
                  height: { xs: 32, sm: 40 },
                  width: "auto",
                }}
              />
              <Typography
                component={Link}
                to="/"
                variant="h6"
                sx={{
                  ml: 1,
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  textDecoration: "none",
                  color: "white",
                }}
              >
                CRAESWEL
              </Typography>
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isTabletOrBelow && (
              <Stack direction="row" spacing={1}>
                {navItems.map((item) => (
                  <Button
                    key={item.to}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.15)",
                        borderRadius: 1,
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                    backgroundColor: "#E67E22",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    "&:hover": {
                      backgroundColor: "#D35400",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => navigate("/donate")}
                >
                  Donate
                </Button>
              </Stack>
            )}

            {/* Mobile Navigation */}
            {isTabletOrBelow && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E67E22",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    minWidth: "70px",
                    "&:hover": { backgroundColor: "#D35400" },
                  }}
                  size="small"
                  onClick={() => navigate("/donate")}
                >
                  Donate
                </Button>
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => setDrawerOpen(true)}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "#1A365D",
            color: "white",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Menu
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Links */}
        <List sx={{ mt: 1 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={() => setDrawerOpen(false)}
              sx={{
                px: 2,
                py: 1.2,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: "rgba(230,126,34,0.10)", // subtle orange hover
                },
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#fff", // brand orange for menu items
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
