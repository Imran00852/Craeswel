import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  usePaymentFailedMutation,
} from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DonateNow = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [paymentFailed] = usePaymentFailedMutation();

  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // Create Order
      const { data: orderRes } = await createOrder({
        fullName,
        email,
        phone,
        amount,
      });

      if (!orderRes?.order) {
        toast.error("Failed to create order");
        return;
      }

      // Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.order.amount,
        currency: "INR",
        name: "Craeswel",
        description: "Donation",
        order_id: orderRes.order.id,
        handler: async function (response) {
          try {
            setLoading(true);
            const res = await verifyPayment(response).unwrap();
            if (res?.success) {
              navigate("/donation-success", {
                state: { donation: res.donation },
              });
            } else {
              toast.error("⚠️ Payment verification failed.");
            }
          } catch (err) {
            toast.error("Verification request failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: fullName,
          email,
          contact: phone,
        },
        theme: { color: "#1A365D" },
        modal: {
          ondismiss: async () => {
            await paymentFailed({ razorpay_order_id: orderRes.order.id });
            toast.error("Payment cancelled");
            navigate("/donation-failure");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Donate Now | Craeswel Foundation</title>
        <meta
          name="description"
          content="Support Craeswel Foundation by donating online. Your contributions help us rescue, feed, and provide shelter to dogs and cats in need."
        />
        <meta
          name="keywords"
          content="donate, animal welfare, dog shelter, cat shelter, Craeswel Foundation, NGO donations, help animals, charity"
        />
        <meta property="og:title" content="Donate Now - Craeswel Foundation" />
        <meta
          property="og:description"
          content="Make a donation to support Craeswel Foundation’s mission of helping dogs and cats in need."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://craeswelfoundation.org/donate"
        />
        <meta
          property="og:image"
          content="https://craeswelfoundation.org/donation-banner.jpg"
        />
      </Helmet>

      {/* Loader */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: 9999, flexDirection: "column" }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verifying your payment…
        </Typography>
      </Backdrop>

      {/* Donation Form */}
      <Box
        sx={{
          bgcolor: "#f7f9fc",
          py: 6,
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 2, maxWidth: 500, width: "100%" }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            mb={3}
            color="#1A365D"
            textTransform={"uppercase"}
          >
            Donate Now
          </Typography>

          <form onSubmit={handlePayment}>
            <TextField
              label="Full Name"
              fullWidth
              required
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Mobile Number"
              type="tel"
              fullWidth
              required
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              label="Donation Amount (₹)"
              type="number"
              fullWidth
              required
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 5, bgcolor: "#1A365D", color: "white" }}
              >
                Donate Now
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default DonateNow;
