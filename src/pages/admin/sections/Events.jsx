import { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  useAllEventsQuery,
  useNewEventMutation,
  useGetSingleEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../../redux/api/api";
import { toast } from "react-hot-toast";

const Events = () => {
  const { data, isLoading, refetch } = useAllEventsQuery();
  const [newEvent, { isLoading: isAdding }] = useNewEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  // Add Modal
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [attachments, setAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Edit Modal
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const [editAttachments, setEditAttachments] = useState([]);
  const [editPreviews, setEditPreviews] = useState([]);

  // Handle input change
  const handleChange = (e, isEdit = false) => {
    if (isEdit) {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Handle multiple image uploads
  const handleImageChange = (e, isEdit = false) => {
    const files = Array.from(e.target.files);
    if (isEdit) {
      setEditAttachments(files);
      setEditPreviews(files.map((file) => URL.createObjectURL(file)));
    } else {
      setAttachments(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    }
  };

  // ---------------- ADD EVENT ----------------
  const handleAdd = () => {
    setForm({ title: "", description: "" });
    setAttachments([]);
    setPreviews([]);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      return toast.error("Please fill all required fields");
    }
    if (attachments.length < 1) {
      return toast.error("Please upload at least 1 attachment");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    attachments.forEach((file) => formData.append("files", file));

    try {
      await newEvent(formData).unwrap();
      toast.success("Event added successfully");
      setOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to add event");
    }
  };

  // ---------------- EDIT EVENT ----------------
  const handleEdit = (event) => {
    setEditId(event._id);
    setEditForm({ title: event.title, description: event.description });
    setEditPreviews(event.attachment?.map((att) => att.url) || []);
    setEditAttachments([]);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editForm.title || !editForm.description) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);
    editAttachments.forEach((file) => formData.append("files", file));

    try {
      await updateEvent({ id: editId, data: formData }).unwrap();
      toast.success("Event updated successfully");
      setEditOpen(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to update event");
    }
  };

  // ---------------- DELETE EVENT ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id).unwrap();
      toast.success("Event deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to delete event");
    }
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading events...
        </Typography>
      </Stack>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Event Management
      </Typography>
      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 2, borderRadius: 3 }}
      >
        + Add Event
      </Button>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Attachments</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.events?.map((e) => (
              <TableRow key={e._id}>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {e.attachment?.map((att, idx) => (
                      <img
                        key={idx}
                        src={att.url}
                        alt={e.title}
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: 5,
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>{e.title}</TableCell>
                <TableCell>{e.description}</TableCell>
                <TableCell>
                  {new Date(e.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(e)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(e._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ mt: 2 }}
          >
            Upload Attachments
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e)}
            />
          </Button>
          <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="preview"
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isAdding}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={isAdding}>
            {isAdding ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            value={editForm.title}
            onChange={(e) => handleChange(e, true)}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={editForm.description}
            onChange={(e) => handleChange(e, true)}
          />
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
            sx={{ mt: 2 }}
          >
            Upload New Attachments
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e, true)}
            />
          </Button>
          <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
            {editPreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="preview"
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Events;
