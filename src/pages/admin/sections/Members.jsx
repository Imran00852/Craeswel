import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useAllMembersQuery,
  useUpdateMemberMutation,
  useGenerateIdCardMutation,
} from "../../../redux/api/api";

const Members = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading, error, isError, refetch } = useAllMembersQuery();
  const [updateMember, { isLoading: isUpdating }] = useUpdateMemberMutation();
  const [generateIdCard, { isLoading: isGenerating }] =
    useGenerateIdCardMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.msg || "Failed to fetch members");
    }
  }, [error, isError]);

  // Edit state
  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleEditClick = (member) => {
    setEditingMember({ ...member });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMember(null);
  };

  const handleSave = async () => {
    try {
      await updateMember({
        id: editingMember._id,
        data: {
          fullName: editingMember.fullName,
          email: editingMember.email,
          phoneNumber: editingMember.phoneNumber,
          address: editingMember.address,
          paymentStatus: editingMember.paymentStatus,
        },
      }).unwrap();

      toast.success("Member updated successfully");
      handleClose();
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to update member");
    }
  };

  const handleGenerateIdCard = async (memberId) => {
    try {
      await generateIdCard(memberId).unwrap();
      toast.success("ID Card generated and sent via email!");
    } catch (err) {
      toast.error("Failed to generate ID Card");
    }
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading members...
        </Typography>
      </Stack>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Members Management
      </Typography>
      <TableContainer component={Paper}>
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              {!isMobile && <TableCell>Email</TableCell>}
              {!isMobile && <TableCell>Phone</TableCell>}
              {!isMobile && <TableCell>Address</TableCell>}
              <TableCell>Payment Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.members?.map((m) => (
              <TableRow key={m._id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={m.photo?.url}>
                      {!m.photo?.url && m.fullName[0]}
                    </Avatar>
                    <Stack>
                      <Typography variant="body1">{m.fullName}</Typography>
                      {isMobile && (
                        <>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                          >
                            {m.email}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                          >
                            {m.phoneNumber}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                          >
                            {m.address}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Stack>
                </TableCell>

                {!isMobile && <TableCell>{m.email}</TableCell>}
                {!isMobile && <TableCell>{m.phoneNumber}</TableCell>}
                {!isMobile && <TableCell>{m.address}</TableCell>}

                <TableCell>
                  <Typography
                    color={m.paymentStatus === "Paid" ? "green" : "red"}
                    fontWeight="bold"
                    variant={isMobile ? "caption" : "body2"}
                  >
                    {m.paymentStatus}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={isMobile ? 1 : 2}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isGenerating}
                      onClick={() => handleGenerateIdCard(m._id)}
                    >
                      {isGenerating ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Generate ID Card"
                      )}
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleEditClick(m)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Member</DialogTitle>
        {editingMember && (
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Full Name"
                value={editingMember.fullName}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    fullName: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={editingMember.email}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, email: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={editingMember.phoneNumber || ""}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    phoneNumber: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Address"
                value={editingMember.address || ""}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    address: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Payment Status"
                select
                value={editingMember.paymentStatus}
                onChange={(e) =>
                  setEditingMember({
                    ...editingMember,
                    paymentStatus: e.target.value,
                  })
                }
                fullWidth
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="inherit" disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Members;
