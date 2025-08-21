// Testimonial.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const testimonials = [
  {
    name: "Sophia Patel",
    role: "Volunteer",
    message:
      "Joining this NGO was one of the best decisions of my life. The community is warm, passionate, and truly dedicated to helping stray animals.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "James Carter",
    role: "Donor",
    message:
      "I love supporting their cause. Every donation feels meaningful when you see the positive impact on both the animals and the volunteers.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Aisha Khan",
    role: "Community Member",
    message:
      "Their medical camps and awareness drives are outstanding. I’ve personally seen lives change because of their relentless efforts.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <Box
      sx={{
        bgcolor: "#f9fafb",
        p: { xs: 2, sm: 4 },
        borderRadius: 3,
        my: 5,
        maxWidth: "900px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        color="#1A365D"
        fontWeight={700}
        textTransform="uppercase"
        mb={3}
      >
        What People Say
      </Typography>

      <Box sx={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                py: { xs: 3, sm: 5 },
                px: { xs: 2, sm: 4 },
                bgcolor: "white",
                minHeight: { xs: "auto", sm: 280 },
              }}
            >
              <Avatar
                src={testimonials[index].avatar}
                alt={testimonials[index].name}
                sx={{ width: 80, height: 80, mb: 2, mx: "auto" }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  mb: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
                color="text.secondary"
              >
                “{testimonials[index].message}”
              </Typography>
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="#1A365D">
                  {testimonials[index].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonials[index].role}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: 0, sm: -40 },
            transform: "translateY(-50%)",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#eee" },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: 0, sm: -40 },
            transform: "translateY(-50%)",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#eee" },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Testimonial;
