import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { server } from "../constants/config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to backend
      const res = await axios.post(`${server}/api/v1/admin/contact`, formData);

      if (res.data.success) {
        setOpenSnackbar(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorSnackbar(true);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
      setErrorSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have a question or want to collaborate? Drop us a message and we’ll
          get back to you!
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={5}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ bgcolor: "#1A365D" }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Message sent successfully! We'll reach out to you soon.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to send message. Please try again later.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
