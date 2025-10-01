import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";

const MembershipSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const member = state?.member;

  return (
    <Box
      sx={{
        bgcolor: "#f7f9fc",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 600 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
          }}
        >
          {/* Success Icon */}
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "green", mb: 2 }}
          />

          <Typography variant="h4" fontWeight={700} color="green" gutterBottom>
            Membership Successful!
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            🎉 Congratulations {member?.fullName}, your membership has been
            successfully registered.
          </Typography>

          {/* Member Info */}
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Avatar
              src={member?.photo?.url}
              alt={member?.fullName}
              sx={{ width: 100, height: 100, border: "3px solid #1A365D" }}
            />
            <Typography variant="h6">{member?.fullName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {member?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {member?.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {member?.address}
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Payment Info */}
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount Paid: <b>₹{member?.amount}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Payment ID: {member?.razorpay_payment_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Order ID: {member?.razorpay_order_id}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            sx={{ mt: 3, fontWeight: 500 }}
          >
            📩 A copy of your receipt has been sent to <b>{member?.email}</b>.
          </Typography>

          {/* Button */}
          <Stack justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MembershipSuccess;
