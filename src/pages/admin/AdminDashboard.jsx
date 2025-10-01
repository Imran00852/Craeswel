import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import EventIcon from "@mui/icons-material/Event";
import CollectionsIcon from "@mui/icons-material/Collections";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { adminNotExists } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { text: "Members", icon: <PeopleIcon />, path: "/admin/members" },
  {
    text: "Donations",
    icon: <VolunteerActivismIcon />,
    path: "/admin/donations",
  },
  { text: "Events", icon: <EventIcon />, path: "/admin/events" },
  { text: "Gallery", icon: <CollectionsIcon />, path: "/admin/media" },
  { text: "Team", icon: <GroupsIcon />, path: "/admin/team" },
  { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
];

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
        withCredentials: true,
      });
      toast.success(data?.msg);
      dispatch(adminNotExists());
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #1A365D, #2A4365)",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 2,
        }}
      >
        <PetsIcon fontSize="large" />
        <SchoolIcon fontSize="large" />
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box flexGrow={1} />
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          background: "linear-gradient(180deg, #1A365D, #2A4365)",
        }}
      >
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          © 2025 NGO Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden !important",
      }}
    >
      <CssBaseline />
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#1A365D",
          boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap fontWeight="bold">
            {menuItems.find((m) => location.pathname === m.path)?.text ||
              "Dashboard"}
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{ fontWeight: "bold", borderRadius: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClick={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: "56px", sm: "64px" },
          height: {
            xs: "calc(100vh - 56px)",
            sm: "calc(100vh - 64px)",
          },
          backgroundColor: "#f8f9fa",
          overflowY: "auto !important",
          "&::-webkit-scrollbar": {
            width: "0px !important",
            height: "0px !important",
          },
          scrollbarWidth: "none !important",
          msOverflowStyle: "none",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
