import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  useAllGalleryPhotosQuery,
  useNewPhotoMutation,
  useDeletePhotoMutation,
} from "../../../redux/api/api";
import { toast } from "react-hot-toast";

const Media = () => {
  const { data, isLoading, refetch } = useAllGalleryPhotosQuery();
  const [newPhoto, { isLoading: isAdding }] = useNewPhotoMutation();
  const [deletePhoto, { isLoading: isDeleting }] = useDeletePhotoMutation();

  const [uploading, setUploading] = useState(false);

  // Handle add photo
  const handleAddPhoto = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      await newPhoto(formData).unwrap();
      toast.success("Photo(s) uploaded successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to upload photo(s)");
    } finally {
      setUploading(false);
    }
  };

  // Handle delete photo
  const handleDelete = async (id) => {
    try {
      await deletePhoto(id).unwrap();
      toast.success("Photo deleted successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.msg || "Failed to delete photo");
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading gallery...
        </Typography>
      </Stack>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Gallery
      </Typography>

      {/* Upload Button */}
      <Button
        variant="contained"
        component="label"
        startIcon={<AddPhotoAlternateIcon />}
        sx={{ mb: 3, borderRadius: 3 }}
        disabled={uploading}
      >
        {uploading || isAdding ? "Uploading..." : "Add Photos"}
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleAddPhoto}
        />
      </Button>

      {/* Photos Grid */}
      <Grid container spacing={2}>
        {data?.photos?.map((photo) => (
          <Grid item key={photo._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                position: "relative",
                overflow: "hidden",
                width: 160, // fixed card size
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                image={photo.url}
                alt="Gallery photo"
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />

              {/* Delete Button */}
              <IconButton
                onClick={() => handleDelete(photo._id)}
                color="error"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "white",
                  "&:hover": { background: "#f5f5f5" },
                }}
                disabled={isDeleting}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Media;
