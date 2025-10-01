import { Box, Stack } from "@mui/material";
import MainBanner from "../components/MainBanner";
import About from "../components/About";
import PresidentMessage from "../components/PresidentMessage";
import ActivitiesAndTeam from "../components/LatestActivity";
import OurObjectives from "../components/OurObjectives";
import GalleryPreview from "../components/GalleryPreview";
import Testimonial from "../components/Testimonial";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#f0f4f8", minHeight: "100vh", overflowX: "hidden" }}>
      <Helmet>
        <title>Craeswel Foundation – Improving Lives of Dogs & Cats</title>
        <meta
          name="description"
          content="Craeswel Foundation is dedicated to the welfare of dogs and cats. Join us in making a positive impact through donations, volunteering, and spreading awareness."
        />
        <link rel="icon" type="image/png" href="/logo.png" /> {/* Favicon */}
      </Helmet>

      <Stack>
        <MainBanner />
        <ActivitiesAndTeam />
        <About />
        <PresidentMessage />
        <OurObjectives />
        <GalleryPreview />
        <Testimonial />
      </Stack>
    </Box>
  );
};

export default Home;
