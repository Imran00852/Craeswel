// GalleryPreview.js
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAllGalleryPhotosQuery } from "../redux/api/api";

const GalleryPreview = () => {
  const { data, isLoading } = useAllGalleryPhotosQuery();

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 3, mb: 3 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading gallery...
        </Typography>
      </Stack>
    );
  }

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

      <Grid container spacing={2} justifyContent="center">
        {data?.photos?.slice(0, 4).map((photo, i) => (
          <Grid item key={photo._id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  width: 160, // ✅ fixed width
                  height: 160, // ✅ fixed height
                }}
              >
                <CardMedia
                  component="img"
                  image={photo.url}
                  alt={`Gallery-${i}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // ✅ fills evenly
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
