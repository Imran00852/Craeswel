// Footer.js
import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A365D",
        color: "white",
        mt: 8,
        pt: { xs: 6, sm: 8 },
        pb: { xs: 4, sm: 6 },
        px: { xs: 3, sm: 6, md: 10 },
      }}
    >
      <Grid container spacing={{ xs: 4, sm: 6, md: 8 }}>
        {/* About */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
          >
            About Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "grey.300",
              lineHeight: 1.8,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            }}
          >
            Empowering women & youth, educating underprivileged children, and
            caring for animals with compassion.
          </Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
          >
            Contact
          </Typography>
          <Box display="flex" alignItems="center" mb={1.5}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
              101 Reyaz Studio Building, Azad Gunj, Baramulla, J&K - 193101
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1.5}>
            <Phone sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
              +91 7006079022
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
              craeswel@gmail.com
            </Typography>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
          >
            Quick Links
          </Typography>
          <Box display="flex" flexDirection="column" gap={1.2}>
            <Link
              href="/"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": { color: "#E67E22", pl: 0.5 },
              }}
            >
              Home
            </Link>
            <Link
              href="/#about"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": { color: "#E67E22", pl: 0.5 },
              }}
            >
              About
            </Link>
            <Link
              href="/gallery"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": { color: "#E67E22", pl: 0.5 },
              }}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              color="inherit"
              underline="hover"
              sx={{
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": { color: "#E67E22", pl: 0.5 },
              }}
            >
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            sx={{ fontSize: { xs: "1.1rem", sm: "1.2rem" } }}
          >
            Follow Us
          </Typography>
          <Box display="flex" gap={1.5}>
            {[
              { icon: <Facebook />, link: "https://facebook.com" },
              { icon: <Instagram />, link: "https://instagram.com" },
              { icon: <Twitter />, link: "https://twitter.com" },
              { icon: <LinkedIn />, link: "https://linkedin.com" },
            ].map((item, i) => (
              <IconButton
                key={i}
                href={item.link}
                target="_blank"
                sx={{
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": { color: "#E67E22", transform: "scale(1.2)" },
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box
        mt={6}
        pt={2}
        borderTop="1px solid rgba(255,255,255,0.2)"
        textAlign="center"
      >
        <Typography
          variant="body2"
          sx={{ color: "grey.400", fontSize: "0.85rem" }}
        >
          © {new Date().getFullYear()} CRAESWEL. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
