import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1A365D",
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: { xs: "1.6rem", sm: "2rem", md: "2.2rem" },
          }}
        >
          About Us
        </Typography>
      </motion.div>

      {/* Wider Big Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <Card
          sx={{
            width: "100%",
            borderRadius: 4,
            mx: "auto",
            boxShadow: 6,
            background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <CardContent>
            {/* Who We Are */}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#2D3748",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
              }}
            >
              Who We Are
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#4A5568",
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
              }}
            >
              Craeswel Foundation is dedicated to uplifting underprivileged
              children, empowering women, and caring for animals, particularly
              in Jammu & Kashmir. We provide quality education, create
              sustainable livelihoods through skill development, and offer
              compassionate care for stray animals. Our mission is rooted in the
              belief that every individual deserves the chance to thrive,
              regardless of their background.
            </Typography>

            {/* Our Mission */}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#2D3748",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#4A5568",
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
              }}
            >
              To empower women and youth through skills development, provide
              education to underprivileged children, and promote animal welfare
              through rescue operations and shelter initiatives.
            </Typography>

            {/* Our Vision */}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#2D3748",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
              }}
            >
              Our Vision
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: "#4A5568",
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
              }}
            >
              To build a compassionate society where every child has access to
              education, women have the power to succeed, and animals are cared
              for with dignity.
            </Typography>

            {/* What We Do */}
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#2D3748",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
              }}
            >
              What We Do
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4A5568",
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
              }}
            >
              We focus on holistic growth — providing education, skill-building
              programs, and animal welfare initiatives. From setting up schools
              and craft centers to building animal shelters and running rescue
              operations, we work to uplift communities and create sustainable
              change.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default About;
