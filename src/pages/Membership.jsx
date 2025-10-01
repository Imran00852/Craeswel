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
  useCreateMemberOrderMutation,
  useVerifyMemberPaymentMutation,
} from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [createMemberOrder] = useCreateMemberOrderMutation();
  const [verifyMemberPayment] = useVerifyMemberPaymentMutation();

  const navigate = useNavigate();

  // ✅ Centralized error handler
  const showError = (err, fallback = "Something went wrong") => {
    if (err?.data?.msg) {
      toast.error(err.data.msg);
    } else if (err?.message) {
      toast.error(err.message);
    } else {
      toast.error(fallback);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Step 1: Create Razorpay order
      const res = await createMemberOrder({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        address: formData.address,
      }).unwrap();

      const { order, key } = res;

      // 🔹 Step 2: Open Razorpay Checkout
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Membership Registration",
        description: "Complete your membership payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            setLoading(true);

            // 🔹 Step 3: After payment, verify + send data & photo
            const verifyData = new FormData();
            verifyData.append("razorpay_order_id", response.razorpay_order_id);
            verifyData.append(
              "razorpay_payment_id",
              response.razorpay_payment_id
            );
            verifyData.append(
              "razorpay_signature",
              response.razorpay_signature
            );

            verifyData.append("fullName", formData.fullName);
            verifyData.append("email", formData.email);
            verifyData.append("phoneNumber", formData.phone);
            verifyData.append("address", formData.address);
            verifyData.append("photo", formData.profilePic);

            const result = await verifyMemberPayment(verifyData).unwrap();

            if (result?.success) {
              toast.success(
                "🎉 Congratulations! Member registered successfully."
              );
              navigate("/membership-success", {
                state: { member: result.member },
              });
            } else {
              toast.error("⚠️ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            showError(err, "Verification request failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#1A365D" },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
            navigate("/membership-failure");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      showError(err, "Payment failed");
    }
  };

  return (
    <>
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

      {/* Form */}
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
            Membership Registration
          </Typography>

          <form onSubmit={handlePayment}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              required
              margin="normal"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="phone"
              label="Mobile Number"
              type="tel"
              fullWidth
              required
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              name="address"
              label="Address"
              fullWidth
              multiline
              rows={2}
              required
              margin="normal"
              value={formData.address}
              onChange={handleChange}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ my: 2 }}
            >
              Upload Your Photo
              <input
                type="file"
                hidden
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>

            {preview && (
              <Box textAlign="center" mb={2}>
                <img
                  src={preview}
                  alt="Profile Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}

            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 5, bgcolor: "#1A365D", color: "white" }}
              >
                Pay ₹500 & Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Membership;
