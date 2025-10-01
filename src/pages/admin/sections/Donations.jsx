import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  CircularProgress,
  Box,
  TableContainer,
} from "@mui/material";
import {
  useAllDonationsQuery,
  useLazyGetDonationReceiptQuery,
} from "../../../redux/api/api";

const Donations = () => {
  const { data, isLoading, isError } = useAllDonationsQuery();
  const [getReceipt] = useLazyGetDonationReceiptQuery();

  const handleDownload = async (id) => {
    try {
      const { blob, filename } = await getReceipt(id).unwrap();

      // create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download receipt", err);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={5}>
        Failed to load donations.
      </Typography>
    );
  }

  const donations = data?.donations || [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Donations
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f4f6f8" }}>
              <TableCell sx={{ fontWeight: 600 }}>Donor</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Receipt
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.map((d, i) => (
              <TableRow
                key={d._id}
                sx={{
                  bgcolor: i % 2 === 0 ? "white" : "#fafafa",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <TableCell>{d.fullName}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.phone}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  ₹ {d.amount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={d.status}
                    color={
                      d.status === "paid"
                        ? "success"
                        : d.status === "failed"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{d.razorpayPaymentId || "-"}</TableCell>
                <TableCell>{d.razorpayOrderId}</TableCell>
                <TableCell>
                  {new Date(d.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleDownload(d._id)}
                  >
                    Download PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {donations.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  No donations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Donations;
