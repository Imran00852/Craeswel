import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const MainBanner = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Use your local public folder images
  const slides = [
    {
      src: "/dog1.avif",
      alt: "Rescuing stray dogs",
      title: "Every Life Matters",
      subtitle:
        "Together, we rescue, heal, and give stray dogs the love they deserve.",
    },
    {
      src: "/education.jpg",
      alt: "Helping poor children in education",
      title: "Education for Every Child",
      subtitle:
        "We empower underprivileged children with knowledge, hope, and opportunity.",
    },
  ];

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={6000}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        swipeable={!isMobile}
        emulateTouch={!isMobile}
        renderArrowPrev={() => null} // hide prev button
        renderArrowNext={() => null} // hide next button
      >
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              position: "relative",
              width: "100%",
              height: isMobile ? "70vh" : "100vh",
            }}
          >
            {/* Background Image */}
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
              }}
            />

            {/* Hero Text */}
            <Stack
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              alignItems="center"
              justifyContent="center"
              spacing={3}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "#fff",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="bold"
                sx={{ textShadow: "0 4px 10px rgba(0,0,0,0.6)" }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                sx={{
                  maxWidth: 650,
                  opacity: 0.95,
                  textShadow: "0 3px 8px rgba(0,0,0,0.5)",
                }}
              >
                {slide.subtitle}
              </Typography>

              {/* CTA Buttons */}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    bgcolor: "#E67E22",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 3,
                    px: 4,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                    "&:hover": { bgcolor: "#d16405ff" },
                  }}
                  onClick={() => navigate("/donate")}
                >
                  Donate Now
                </Button>
                <Button
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    borderColor: "#fff",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 3,
                    px: 4,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                  }}
                  onClick={() => navigate("/membership")}
                >
                  Join Us
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainBanner;
