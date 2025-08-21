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
        mt: 5,
        pt: 6,
        pb: 3,
        px: { xs: 3, sm: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            About Us
          </Typography>
          <Typography variant="body2" color="grey.300">
            We are dedicated to rescuing, treating, and rehoming stray animals
            while raising awareness in our community.
          </Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Contact
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">123 Street, Baramulla, J&K</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Phone sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">+91 98765 43210</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">info@craeswel.org</Typography>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Quick Links
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              About
            </Link>
            <Link href="/gallery" color="inherit" underline="hover">
              Gallery
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Follow Us
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box
        mt={5}
        pt={2}
        borderTop="1px solid rgba(255,255,255,0.2)"
        textAlign="center"
      >
        <Typography variant="body2" color="grey.400">
          © {new Date().getFullYear()} CRAESWEL. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
