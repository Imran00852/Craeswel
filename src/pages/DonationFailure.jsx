import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DonationFailure = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff5f5",
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
          background: "linear-gradient(135deg, #ffebee, #fff3e0)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#c62828" }}
        >
          ❌ Payment Failed
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, mb: 4, color: "#b71c1c" }}>
          Oops! Something went wrong with your transaction.
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Don’t worry — your account has not been charged. You can try again or
          choose a different payment method.
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#c62828",
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              "&:hover": { bgcolor: "#b71c1c" },
            }}
            onClick={() => navigate("/donate")}
          >
            Retry Payment
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              borderColor: "#c62828",
              color: "#c62828",
              "&:hover": {
                bgcolor: "#ffebee",
                borderColor: "#b71c1c",
                color: "#b71c1c",
              },
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DonationFailure;
