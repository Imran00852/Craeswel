import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { adminExists, adminNotExists } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { set } from "mongoose";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/api/v1/admin/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      toast.success(data?.msg);
      dispatch(adminExists(data?.admin));
      navigate("/admin");
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
      dispatch(adminNotExists());
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f7f9fc",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Helmet>
        <title>Admin Login | Craeswel Foundation</title>
        <meta
          name="description"
          content="Login to the Craeswel Foundation admin panel to manage donations, events, and website content."
        />
        <meta name="robots" content="noindex, nofollow" />
        {/* 👆 Prevents search engines from indexing login page */}
      </Helmet>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
          color="#1A365D"
          textTransform="uppercase"
        >
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              px: 5,
              bgcolor: "#1A365D",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#2A4365",
              },
            }}
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
