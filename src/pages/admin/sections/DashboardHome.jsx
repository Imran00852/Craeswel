import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  People as PeopleIcon,
  VolunteerActivism as DonationIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useDashboardStatsQuery } from "../../../redux/api/api";

const DashboardHome = () => {
  const { data, isLoading, isError, error } = useDashboardStatsQuery();

  if (isLoading) return <Typography>Loading dashboard...</Typography>;
  if (isError) return <Typography>Error: {error?.message}</Typography>;

  const stats = data?.stats || {};

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        📊 Admin Dashboard
      </Typography>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          mb: 4,
        }}
      >
        {[
          {
            title: "Total Members",
            value: stats.totalMembers,
            color: "#1976d2",
            icon: <PeopleIcon />,
          },
          {
            title: "Total Donations",
            value: `₹${stats.totalDonations}`,
            color: "#9c27b0",
            icon: <DonationIcon />,
          },
          {
            title: "This Month's Donations",
            value: `₹${stats.thisMonthsDonation}`,
            color: "#ed6c02",
            icon: <TrendingUpIcon />,
          },
        ].map((card, i) => (
          <Paper
            key={i}
            sx={{
              p: 3,
              flex: "1 1 280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              boxShadow: 4,
              background: `linear-gradient(135deg, ${card.color}10, ${card.color}30)`,
              textAlign: "center",
            }}
          >
            <Avatar sx={{ bgcolor: card.color, mb: 1, width: 48, height: 48 }}>
              {card.icon}
            </Avatar>
            <Typography variant="subtitle1" color="text.secondary">
              {card.title}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color={card.color}>
              {card.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Main Content Sections */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {/* Recent Donations */}
        <Paper
          sx={{
            p: 3,
            flex: "1 1 320px",
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            🙌 Recent Donations
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            {stats.recentDonations?.map((d, i) => (
              <React.Fragment key={d._id}>
                <ListItem>
                  <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                    {d.fullName[0]}
                  </Avatar>
                  <ListItemText
                    primary={`${d.fullName} - ₹${d.amount}`}
                    secondary={new Date(d.createdAt).toLocaleDateString()}
                  />
                </ListItem>
                {i < stats.recentDonations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Recent Members */}
        <Paper
          sx={{
            p: 3,
            flex: "1 1 320px",
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            👥 Recent Members
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            {stats.recentMembers?.map((m, i) => (
              <React.Fragment key={m._id}>
                <ListItem>
                  <Avatar src={m.photo?.url} sx={{ bgcolor: "#9c27b0", mr: 2 }}>
                    {m.fullName[0]}
                  </Avatar>
                  <ListItemText
                    primary={m.fullName}
                    secondary={`${m.email} • Joined: ${new Date(
                      m.createdAt
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
                {i < stats.recentMembers.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Top Donors */}
        <Paper
          sx={{
            p: 3,
            flex: "1 1 320px",
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            🌟 Top Donors
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            {stats.topDonors?.map((d, i) => (
              <React.Fragment key={d._id}>
                <ListItem>
                  <Avatar sx={{ bgcolor: "#ed6c02", mr: 2 }}>
                    <StarIcon />
                  </Avatar>
                  <ListItemText
                    primary={d.fullName}
                    secondary={`Donated: ₹${d.amount}`}
                  />
                </ListItem>
                {i < stats.topDonors.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Recent Activity */}
        <Paper
          sx={{
            p: 3,
            flex: "1 1 500px",
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            🔔 Recent Activity
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            <ListItem>
              <Avatar sx={{ bgcolor: "#0288d1", mr: 2 }}>
                <NotificationsIcon />
              </Avatar>
              <ListItemText
                primary={`New member ${stats.recentActivities?.latestMember} joined`}
                secondary={new Date(
                  stats.recentMembers?.[0]?.createdAt || Date.now()
                ).toLocaleDateString()}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Avatar sx={{ bgcolor: "#0288d1", mr: 2 }}>
                <NotificationsIcon />
              </Avatar>
              <ListItemText
                primary={`Received ₹${stats.recentActivities?.latestDonation?.amount} donation from ${stats.recentActivities?.latestDonation?.name}`}
                secondary={new Date(
                  stats.recentDonations?.[0]?.createdAt || Date.now()
                ).toLocaleDateString()}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Avatar sx={{ bgcolor: "#0288d1", mr: 2 }}>
                <NotificationsIcon />
              </Avatar>
              <ListItemText
                primary={`Event "${stats.recentActivities?.latestEvent}" completed`}
                secondary={new Date().toLocaleDateString()}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Monthly Growth */}
        <Paper
          sx={{
            p: 3,
            flex: "1 1 500px",
            borderRadius: 3,
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            📈 Monthly Growth
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✅ <b>{stats.monthlyGrowth?.newMembersThisMonth}</b> New Members
            joined this month
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            💰 <b>₹{stats.monthlyGrowth?.thisMonthsDonation}</b> Donations
            received this month
          </Typography>
          <Typography variant="body1">
            🎉 <b>{stats.monthlyGrowth?.newEventsThisMonth}</b> Events
            successfully conducted
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardHome;
