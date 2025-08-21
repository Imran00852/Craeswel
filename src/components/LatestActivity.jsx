import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion"; // ✅ import
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ------------------- Latest Activities -------------------
const LatestActivity = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const activities = [
    {
      title: "Feeding Stray Dogs",
      description:
        "We distributed food to 50+ stray dogs in the city. Volunteers spent the day ensuring no dog went hungry.",
      images: [
        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=800&auto=format",
        "https://images.unsplash.com/photo-1601758064226-0c3f67aa9e7b?w=800&auto=format",
      ],
    },
    {
      title: "School Supplies Drive",
      description: "Provided books and stationery to underprivileged kids.",
      images: [
        "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&auto=format",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format",
      ],
    },
    {
      title: "Medical Camp",
      description: "Organized free health checkups for children.",
      images: [
        "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&auto=format",
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format",
      ],
    },
    {
      title: "Tree Plantation",
      description: "Planted 200 trees in rural areas.",
      images: [
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format",
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f0f4f8", p: 3, borderRadius: 2, mb: 4 }}>
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
        Latest Activities
      </Typography>

      {/* Scrollable list of big cards */}
      <Stack
        spacing={3}
        sx={{
          maxHeight: "90vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          pr: 1,
        }}
      >
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 3,
                border: "1px solid #1A365D",
                bgcolor: "#fff",
                minHeight: 500,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ p: 1, bgcolor: "#f9fafb" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                  alt="logo"
                  style={{ width: 30, height: 30 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {new Date().toLocaleDateString()}
                </Typography>
              </Stack>

              {/* Carousel */}
              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                  minHeight: 300,
                  maxHeight: 300,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Carousel
                  autoPlay
                  infiniteLoop
                  interval={4000}
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  swipeable={!isSmall}
                  emulateTouch={!isSmall}
                >
                  {a.images.map((imgSrc, idx) => (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`${a.title}-${idx}`}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Carousel>
              </Box>

              {/* Content */}
              <Box sx={{ px: 2, py: 1 }}>
                <Typography fontWeight="bold" gutterBottom>
                  {a.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {a.description}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

// ------------------- Team Section -------------------
const TeamSection = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const volunteers = [
    {
      name: "Alex Johnson",
      role: "Volunteer",
      avatar: "https://i.pravatar.cc/300?img=1",
    },
    {
      name: "Sarah Miller",
      role: "Volunteer",
      avatar: "https://i.pravatar.cc/300?img=5",
    },
    {
      name: "Raj Patel",
      role: "Volunteer",
      avatar: "https://i.pravatar.cc/300?img=11",
    },
  ];

  const management = [
    {
      name: "Emily Carter",
      role: "Coordinator",
      avatar: "https://i.pravatar.cc/300?img=15",
    },
    {
      name: "Michael Brown",
      role: "Manager",
      avatar: "https://i.pravatar.cc/300?img=18",
    },
    {
      name: "Sophia Lee",
      role: "Treasurer",
      avatar: "https://i.pravatar.cc/300?img=22",
    },
  ];

  const renderCarousel = (title, members, delay) => (
    <motion.div
      initial={{ opacity: 0, x: delay === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ width: isSmall ? "100%" : "45%" }}
    >
      <Typography
        variant="h6"
        color="#1A365D"
        textAlign="center"
        textTransform="uppercase"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        {title}
      </Typography>
      <Card sx={{ borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipeable={!isSmall}
          emulateTouch={!isSmall}
        >
          {members.map((m, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <img
                src={m.avatar}
                alt={m.name}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography fontWeight="bold">{m.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {m.role}
                </Typography>
              </CardContent>
            </Box>
          ))}
        </Carousel>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ bgcolor: "#f9fafb", p: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        color="#1A365D"
        textAlign="center"
        textTransform="uppercase"
        sx={{ fontWeight: 700, mb: 2 }}
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Team
      </Typography>

      <Stack
        direction={isSmall ? "column" : "row"}
        spacing={2}
        justifyContent="center"
      >
        {renderCarousel("Volunteers", volunteers, 0)}
        {renderCarousel("Management", management, 0.2)}
      </Stack>
    </Box>
  );
};

// ------------------- Export Combined -------------------
const ActivitiesAndTeam = () => {
  return (
    <Box>
      <LatestActivity />
      <TeamSection />
    </Box>
  );
};

export default ActivitiesAndTeam;
