import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // full screen
        width: "100%",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", // subtle gradient
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#1A365D",
          mb: 3,
          animation: "spin 1.5s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: "#1A365D", letterSpacing: "0.5px" }}
      >
        Loading, please wait...
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
        Fetching latest content ✨
      </Typography>
    </Box>
  );
};

export default Loader;
