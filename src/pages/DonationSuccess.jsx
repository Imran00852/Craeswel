import { Box, Typography, Paper, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const DonationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donation } = location.state || {};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 600,
          width: "100%",
          background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#2e7d32" }}
        >
          🎉 Payment Successful
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, mb: 4, color: "#1A365D" }}>
          Thank you, <b>{donation?.fullName || "Donor"}</b>, for your generous
          donation of{" "}
          <span style={{ color: "#2e7d32", fontWeight: 600 }}>
            ₹{donation?.amount}
          </span>{" "}
          🙏
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Your support helps us continue our mission. We truly appreciate your
          kindness and contribution.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#1A365D",
            px: 5,
            py: 1.5,
            borderRadius: "12px",
            "&:hover": { bgcolor: "#14284a" },
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default DonationSuccess;
