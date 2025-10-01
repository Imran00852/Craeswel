import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAllGalleryPhotosQuery } from "../redux/api/api";
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const { data, isLoading } = useAllGalleryPhotosQuery();

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading photos...
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f9fafb", p: 4, minHeight: "100vh" }}>
      <Helmet>
        <title>Gallery | Craeswel Foundation</title>
        <meta
          name="description"
          content="Browse the photo gallery of Craeswel Foundation, showcasing our events, activities, and the impact we create in education, skill development, and animal welfare."
        />
      </Helmet>

      <Typography
        variant="h4"
        color="#1A365D"
        textAlign="center"
        textTransform="uppercase"
        sx={{ fontWeight: 700, mb: 4 }}
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Photo Gallery
      </Typography>

      <Grid container spacing={2}>
        {data?.photos?.map((photo, i) => (
          <Grid item xs={12} sm={6} md={3} key={photo._id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => window.open(photo.url, "_blank")}
              >
                <CardMedia
                  component="img"
                  image={photo.url}
                  alt={`Gallery-${i}`}
                  sx={{
                    width: "100%",
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                    height: { sm: 200, md: 250 },
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
