import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAllEventsQuery } from "../redux/api/api";

const LatestEvents = () => {
  const { data, isLoading } = useAllEventsQuery();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading events...
        </Typography>
      </Stack>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          textAlign: "center",
          py: 8,
          mb: 6,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 2 }}
          component={motion.div}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Latest Events
        </Typography>
        <Typography
          variant="h6"
          sx={{ opacity: 0.9, maxWidth: 700, mx: "auto" }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover the stories, milestones, and activities that shape our
          journey.
        </Typography>
      </Box>

      {/* Events Grid */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, pb: 6 }}>
        <Grid container spacing={4}>
          {data?.events?.map((event, i) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    transition: "transform 0.3s",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  {/* Image with Date Badge */}
                  <Box sx={{ position: "relative" }}>
                    {event.attachment?.length > 0 && (
                      <img
                        src={event.attachment[0].url}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Chip
                      label={new Date(event.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#1A365D", mb: 1 }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {event.description?.length > 100
                        ? event.description.substring(0, 100) + "..."
                        : event.description}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#1A365D",
                        "&:hover": { bgcolor: "#12274a" },
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                      onClick={() => handleOpen(event)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Event Details Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, overflow: "hidden" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            {selectedEvent?.title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {/* Full Carousel */}
          {selectedEvent?.attachment?.length > 0 && (
            <Carousel
              autoPlay
              infiniteLoop
              interval={5000}
              showThumbs={false}
              showStatus={false}
              swipeable
              emulateTouch
              dynamicHeight={false}
            >
              {selectedEvent.attachment.map((att, idx) => (
                <img
                  key={idx}
                  src={att.url}
                  alt={`${selectedEvent.title}-${idx}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Carousel>
          )}

          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedEvent?.description}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LatestEvents;
