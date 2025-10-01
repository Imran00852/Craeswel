import { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  useAllTeamMembersQuery,
  useAddTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from "../../../redux/api/api";

import { toast } from "react-hot-toast";

const Team = () => {
  const { data, isLoading, refetch } = useAllTeamMembersQuery();
  const [addTeamMember] = useAddTeamMemberMutation();
  const [deleteTeamMember, { isLoading: deleting }] =
    useDeleteTeamMemberMutation();

  const team = data?.teamMembers || [];

  // --- Dialog state
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // --- New member form state
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    photo: "",
    photoFile: null,
  });

  // --- Loading state for add
  const [adding, setAdding] = useState(false);

  // --- Form handlers
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setNewMember({
      name: "",
      role: "",
      email: "",
      phone: "",
      address: "",
      photo: "",
      photoFile: null,
    });
  };

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember({
        ...newMember,
        photoFile: file,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const handleAdd = async () => {
    if (!newMember.name || !newMember.role) {
      toast.error("Please fill in required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", newMember.name);
    formData.append("role", newMember.role);
    formData.append("email", newMember.email);
    formData.append("phoneNumber", newMember.phone);
    formData.append("address", newMember.address);
    if (newMember.photoFile) formData.append("photo", newMember.photoFile);

    try {
      setAdding(true); // start loading
      await addTeamMember(formData).unwrap();
      toast.success("Team member added successfully!");
      handleCloseForm();
      refetch();
    } catch (err) {
      console.error("Add failed:", err);
      toast.error(err?.data?.msg || "Failed to add member");
    } finally {
      setAdding(false); // stop loading
    }
  };

  // --- Delete
  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id).unwrap();
      toast.success("Team member deleted successfully!");
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err?.response?.data?.msg || "Failed to delete member");
    }
  };

  // --- Details dialog
  const handleOpenDetails = (member) => {
    setSelectedMember(member);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedMember(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Team Management
      </Typography>

      {/* Add button */}
      <Button
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
        sx={{ mb: 3, borderRadius: 3 }}
        onClick={handleOpenForm}
      >
        Add Team Member
      </Button>

      {/* Team Grid */}
      <Grid container spacing={2}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          team.map((t) => (
            <Grid item xs={12} md={4} key={t._id}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  cursor: "pointer",
                  position: "relative",
                  "&:hover": { boxShadow: 6 },
                }}
                onClick={() => handleOpenDetails(t)}
              >
                {/* Delete button */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(t._id);
                  }}
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "white",
                    "&:hover": { background: "#f5f5f5" },
                  }}
                  disabled={deleting}
                >
                  <DeleteIcon />
                </IconButton>

                <Avatar
                  sx={{
                    margin: "auto",
                    mb: 1,
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                  }}
                  src={t.photo?.url || undefined}
                >
                  {t.photo ? "" : t.fullName[0]}
                </Avatar>
                <CardContent>
                  <Typography variant="h6">{t.fullName}</Typography>
                  <Typography color="textSecondary">{t.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Add Member Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Add Team Member
          <IconButton onClick={handleCloseForm}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              name="name"
              value={newMember.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Role"
              name="role"
              value={newMember.role}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={newMember.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={newMember.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={newMember.address}
              onChange={handleChange}
              fullWidth
            />

            {/* Photo upload */}
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
            {newMember.photo && (
              <Avatar
                src={newMember.photo}
                sx={{ width: 80, height: 80, mx: "auto" }}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={adding}
            startIcon={
              adding ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {adding ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Member Details Dialog */}
      <Dialog
        open={openDetails}
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            boxShadow: 8,
            background: "linear-gradient(135deg, #ffffff 0%, #f9fafc 100%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Member Details
          </Typography>
          <IconButton onClick={handleCloseDetails}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedMember && (
            <Stack spacing={3} sx={{ mt: 2, textAlign: "center" }}>
              {/* Square Image */}
              <Avatar
                variant="square"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  mx: "auto",
                  boxShadow: 4,
                }}
                src={selectedMember.photo?.url || undefined}
              >
                {selectedMember.photo ? "" : selectedMember.fullName[0]}
              </Avatar>

              {/* Member Info */}
              <Typography variant="h5" fontWeight="bold">
                {selectedMember.fullName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {selectedMember.role}
              </Typography>

              {/* Details Section */}
              <Stack
                spacing={1.5}
                sx={{
                  background: "#fff",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 1,
                  textAlign: "left",
                }}
              >
                <Typography>
                  <b>Email:</b> {selectedMember.email}
                </Typography>
                <Typography>
                  <b>Phone:</b> {selectedMember.phoneNumber}
                </Typography>
                <Typography>
                  <b>Address:</b> {selectedMember.address}
                </Typography>
              </Stack>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
