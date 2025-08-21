import { Box, Stack } from "@mui/material";
import MainBanner from "../components/MainBanner";
import About from "../components/About";
import PresidentMessage from "../components/PresidentMessage";
import ActivitiesAndTeam from "../components/LatestActivity";
import OurObjectives from "../components/OurObjectives";
import GalleryPreview from "../components/GalleryPreview";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#f0f4f8", minHeight: "100vh", overflowX: "hidden" }}>
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
