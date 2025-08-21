import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MainBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=800&auto=format",
      alt: "Stray dog being fed",
    },
    {
      src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&auto=format",
      alt: "Children studying",
    },
    {
      src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&auto=format",
      alt: "Veterinary care",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        "& .carousel": {
          margin: 0,
          padding: 0,
        },
        "& .carousel .slide": {
          background: "transparent",
        },
        "& .carousel .control-arrow": {
          backgroundColor: "rgba(0,0,0,0.3)",
          height: "50px",
          marginTop: "-25px",
          top: "50%",
        },
        "& .carousel .control-arrow:hover": {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        stopOnHover={false}
        dynamicHeight={false}
        swipeable={!isMobile}
        emulateTouch={!isMobile}
      >
        {carouselImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: isMobile ? "100vh" : "590px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainBanner;
