import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#f0f4f8", // removed minHeight
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
              We are a passionate team dedicated to making a positive impact in
              our community. Our mission is to provide support, care, and
              resources where they are needed most.
            </Typography>

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
              We envision a world where compassion and innovation come together
              to create meaningful change. Our work is guided by empathy,
              collaboration, and commitment to building a better tomorrow.
            </Typography>

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
              From grassroots initiatives to large-scale projects, we work
              tirelessly to bring hope, awareness, and opportunities to those
              who need them most.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default About;
