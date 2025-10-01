import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  useAllEventsQuery,
  useGetMembersQuery,
  useAllTeamMembersQuery, // ✅ import management API
} from "../redux/api/api";

// ------------------- Latest Activities -------------------
const LatestActivity = () => {
  const theme = useTheme();
  const { data, isLoading } = useAllEventsQuery();

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading latest activities...
        </Typography>
      </Stack>
    );
  }

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
        Latest Events
      </Typography>

      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          maxHeight: "80vh",
          overflowY: "auto",
          pr: 1,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
        }}
      >
        <Stack spacing={3}>
          {data?.events?.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  border: "1px solid #e0e0e0",
                  bgcolor: "#fff",
                }}
              >
                {event.attachment?.length > 0 && (
                  <Box sx={{ width: "100%", height: 400, overflow: "hidden" }}>
                    <Carousel
                      autoPlay
                      infiniteLoop
                      interval={5000}
                      showThumbs={false}
                      showStatus={false}
                      showIndicators={event.attachment.length > 1}
                      swipeable
                      emulateTouch
                    >
                      {event.attachment.map((att, idx) => (
                        <img
                          key={idx}
                          src={att.url}
                          alt={`${event.title}-${idx}`}
                          style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </Carousel>
                  </Box>
                )}

                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(event.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                  </Stack>

                  <Typography variant="body1" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

// ------------------- Team Section -------------------
const TeamSection = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Volunteers
  const { data: volunteers = [], isLoading: loadingVolunteers } =
    useGetMembersQuery();

  // ✅ Management (Admin Team)
  const { data: teamData = [], isLoading: loadingManagement } =
    useAllTeamMembersQuery();

  const renderCarousel = (title, members, delay, isVolunteer = false) => (
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
        {(isVolunteer ? loadingVolunteers : loadingManagement) ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Loading {isVolunteer ? "volunteers" : "management"}...
            </Typography>
          </Box>
        ) : (
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            showArrows={false}
            swipeable={!isSmall}
            emulateTouch={!isSmall}
          >
            {(isVolunteer ? members?.members : members?.teamMembers)?.map(
              (m, i) => (
                <Box
                  key={i}
                  sx={{
                    textAlign: "center",
                    p: 2,
                    bgcolor: "#fafafa",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 250, sm: 350, md: 400 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRadius: 2,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      mb: 2,
                      bgcolor: "#f5f5f5",
                    }}
                  >
                    <img
                      src={isVolunteer ? m.photo : m.photo?.url}
                      alt={m.fullName || m.name}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => (e.target.src = "/fallback-user.png")}
                    />
                  </Box>

                  <CardContent sx={{ p: 1 }}>
                    <Typography fontWeight="bold" variant="subtitle1">
                      {m.fullName || m.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isVolunteer ? "Volunteer" : m.role}
                    </Typography>
                  </CardContent>
                </Box>
              )
            )}
          </Carousel>
        )}
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
        {renderCarousel("Volunteers", volunteers, 0, true)}
        {renderCarousel("Management", teamData, 0.2, false)}
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
