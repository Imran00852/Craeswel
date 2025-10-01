// OurWork.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const workData = [
  {
    title: "Education Access",
    description:
      "We provide schools and learning support, ensuring that no child is left behind due to financial constraints. Education is the foundation of empowerment and social change.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format",
  },
  {
    title: "Skill & Empowerment",
    description:
      "Through craft centers and training programs, we empower women and youth with essential skills, creating sustainable livelihoods and breaking cycles of poverty.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&auto=format",
  },
  {
    title: "Compassion & Development",
    description:
      "We build animal shelters, run rescue operations, and promote rural development. Our focus is on creating self-reliant, compassionate communities where animals and people thrive together.",
    image:
      "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=1200&auto=format",
  },
  {
    title: "Holistic Growth",
    description:
      "By combining education, skill-building, and animal welfare, we create long-lasting community transformation, ensuring growth that uplifts every individual with dignity.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200&auto=format",
  },
];

const OurWork = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f9fafc",
        py: 8,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#1A365D",
            mb: { xs: 3, sm: 5 },
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Our Work
        </Typography>
      </motion.div>

      {/* Work Grid */}
      <Grid container spacing={4}>
        {workData.map((work, i) => (
          <Grid item xs={12} md={6} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 6,
                  background: "linear-gradient(135deg, #ffffff, #f7f8fa)",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={work.image}
                  alt={work.title}
                  sx={{
                    width: { xs: "100%", sm: "40%" },
                    height: { xs: 200, sm: "100%" },
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <CardContent
                  sx={{
                    flex: 1,
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#1A365D",
                      mb: 2,
                    }}
                  >
                    {work.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4A5568",
                      lineHeight: 1.8,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {work.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurWork;
