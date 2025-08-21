import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  return (
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
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: "12px", sm: "16px", md: "24px" },
          paddingRight: { xs: "12px", sm: "16px", md: "24px" },
        }}
      >
        <Toolbar
          sx={{
            px: "0 !important",
            minHeight: "64px !important",
          }}
          disableGutters
        >
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& svg:first-of-type": { color: "#E67E22" },
                "& svg:last-of-type": { color: "#27AE60", ml: "-8px" },
              }}
            >
              <PetsIcon fontSize={isTablet ? "medium" : "large"} />
              <SchoolIcon fontSize={isTablet ? "medium" : "large"} />
            </Box>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{
                ml: 1,
                fontWeight: "bold",
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.25rem",
                  md: "1.5rem",
                },
                textDecoration: "none",
                color: "white",
              }}
            >
              CRAESWEL
            </Typography>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation - Visible on tablet and desktop */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={isTablet ? 0.5 : 1}
              sx={{
                flexWrap: isTablet ? "wrap" : "nowrap",
                maxWidth: isTablet ? "60%" : "none",
              }}
            >
              {[
                { to: "/our-work", text: "Our Work" },
                { to: "/gallery", text: "Gallery" },
                { to: "/events", text: "Events" },
                { to: "/membership", text: "Membership" },
                { to: "/contact", text: "Contact" },
                { to: "/login", text: "Login" },
              ].map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: isTablet ? "0.75rem" : "0.875rem",
                    minWidth: "auto",
                    whiteSpace: "nowrap",
                    px: isTablet ? 0.75 : 1.5,
                    py: isTablet ? 0.5 : 1,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          )}

          {/* Donate Button - Always visible except mobile */}
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#E67E22",
                color: "white",
                fontWeight: "bold",
                fontSize: isTablet ? "0.75rem" : "0.875rem",
                "&:hover": {
                  backgroundColor: "#D35400",
                  transform: "translateY(-1px)",
                },
                minWidth: { xs: "80px", sm: "90px", md: "110px" },
                px: isTablet ? 1.25 : 2,
                py: isTablet ? 0.75 : 1,
                transition: "all 0.2s ease",
              }}
              size={isTablet ? "small" : "medium"}
            >
              Donate
            </Button>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <>
              <Button
                variant="contained"
                sx={{
                  ml: 1,
                  backgroundColor: "#E67E22",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  minWidth: "80px",
                  "&:hover": { backgroundColor: "#D35400" },
                }}
                size="small"
              >
                Donate
              </Button>
              <IconButton sx={{ ml: 1, color: "white" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
