import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  useAdminSignupMutation,
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../../redux/api/api";

const Settings = () => {
  const { data, isError, error, isLoading } = useGetAdminsQuery();
  const [signUp] = useAdminSignupMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [open, setOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new admin
  const handleAdd = () => {
    setEditingAdmin(null);
    setForm({ name: "", email: "", password: "" });
    setOpen(true);
  };

  // Edit existing admin
  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setForm({ ...admin, password: "" });
    setOpen(true);
  };

  // Signup
  const handleSave = async () => {
    setOpen(false);
    const toastId = toast.loading("Processing...");
    try {
      const { data } = await signUp(form);
      toast.success(data.msg, { id: toastId });
    } catch (error) {
      toast.error(error?.data?.msg || error.message, { id: toastId });
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await deleteAdmin(id).unwrap();
      toast.success(res.msg, { id: toastId });
    } catch (error) {
      toast.error(error?.data?.msg || error.message, { id: toastId });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.msg || error.message);
    }
  }, [error, isError]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Management
      </Typography>

      {/* Add Admin Button */}
      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 2, borderRadius: 3 }}
      >
        + Add Admin
      </Button>

      {/* Loader when fetching admins */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress sx={{ color: "#1A365D" }} />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 3 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Admin Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.admins?.length > 0 ? (
                data.admins.map((a) => (
                  <TableRow key={a._id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(a)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(a._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No admins found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editingAdmin ? "Edit Admin" : "Add Admin"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Admin Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !form.name || !form.email || (!editingAdmin && !form.password)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
