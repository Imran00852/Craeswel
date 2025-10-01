import React from "react";
import { Box, Typography, Card, CardActionArea } from "@mui/material";
import { motion } from "framer-motion";

const objectives = [
  {
    title: "Education Access",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format", // children learning
  },
  {
    title: "Skill & Empowerment",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format", // women/youth empowerment
  },
  {
    title: "Compassion & Development",
    image:
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=800&auto=format", // rural/animal welfare
  },
  {
    title: "Holistic Growth",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format", // community growth
  },
];

const OurObjectives = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f0f4f8",
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1A365D",
            mb: 4,
            textTransform: "uppercase",
          }}
        >
          Our Objectives
        </Typography>
      </motion.div>

      {/* Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {objectives.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Card
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                aspectRatio: "1 / 1", // square layout
                boxShadow: 4,
              }}
            >
              <CardActionArea
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  src={obj.image}
                  alt={obj.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                    }}
                  >
                    {obj.title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default OurObjectives;
