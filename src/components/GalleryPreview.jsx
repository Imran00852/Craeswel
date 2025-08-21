// GalleryPreview.js
import React from "react";
import { Box, Typography, Grid, Card, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const photos = [
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=800",
  "https://images.unsplash.com/photo-1601758125946-3f43d5c9a9af?w=800",
  "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1?w=800",
  "https://images.unsplash.com/photo-1601758123927-196b69b2a97a?w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
];

const GalleryPreview = () => {
  return (
    <Box sx={{ bgcolor: "#f9fafb", p: 3, borderRadius: 2, mb: 4 }}>
      <Typography
        variant="h5"
        color="#1A365D"
        textAlign="center"
        textTransform="uppercase"
        sx={{ fontWeight: 700, mb: 3 }}
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Gallery
      </Typography>

      <Grid container spacing={2}>
        {photos.slice(0, 4).map((src, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={src}
                  alt={`Gallery-${i}`}
                  sx={{
                    width: "100%",
                    objectFit: "cover",
                    aspectRatio: { xs: "1 / 1", sm: "auto" }, // ✅ square on mobile, auto on bigger screens
                    height: { sm: 200, md: 250 }, // ✅ fixed height on PC for alignment
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* More Button */}
      <Box textAlign="center" mt={3}>
        <Button
          component={Link}
          to="/gallery"
          variant="contained"
          sx={{
            bgcolor: "#1A365D",
            "&:hover": { bgcolor: "#12274a" },
            borderRadius: 3,
            px: 4,
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export default GalleryPreview;
