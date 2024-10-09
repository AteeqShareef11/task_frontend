/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useCallback } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Grid,
  Box,
  Stack,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import useForm from "@/hooks/validation";
import vehicleServices from "@/app/services/vehicleServices";
import { useRouter } from "next/navigation";
import GoBack from "@/components/shared/goback";

const initialValues = {
  carModel: "",
  price: "",
  phone: "",
  city: "",
};

const validationRules = {
  carModel: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length < 3) {
      return "Car model must be at least 3 letters long";
    }
    return "";
  },
  price: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (isNaN(value) || value <= 0) {
      return "Price must be a positive number";
    }
    return "";
  },
  phone: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (!/^\d{11}$/.test(value)) {
      return "Phone number must be exactly 11 digits";
    }
    return "";
  },

  city: (value) => (value ? "" : "This field is required"),
};

export default function VehicleForm() {
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter()

  const { values, errors, handleOnChange, validateAllFields, setFormValues } = useForm(
    initialValues,
    validationRules
  );

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (pictures.length + acceptedFiles.length > maxPictures) {
      setError(`You can only add up to ${maxPictures} pictures`);
      return;
    }

    if (rejectedFiles.length > 0) {
      setError("Some files were rejected. Please upload valid image files.");
      return;
    }

    setPictures((prev) => [...prev, ...acceptedFiles]);
    setError("");
  }, [pictures, maxPictures]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: maxPictures - pictures.length,
    maxSize: 5 * 1024 * 1024,
  });

  const handleDeletePicture = (index) => {
    setPictures(pictures.filter((_, i) => i !== index));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("carModel", values.carModel);
    formData.append("price", values.price);
    formData.append("phone", values.phone);
    formData.append("city", values.city);
    formData.append("maxPics", maxPictures);
    pictures.forEach((picture) => {
      formData.append("pictures", picture);
    });

    try {
      await vehicleServices.createVehicle(formData);
      setSuccess("Vehicle information submitted successfully");
      setError("");
      setFormValues(initialValues);
      setPictures([]);
      router.push("/dashboard/vehicles");
    } catch (error) {
      setError(error?.message || "Error submitting vehicle information");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMaxPicturesChange = (e) => {
    let value = Number(e.target.value);
    if (value > 10) {
      value = 10;
    } else if (value < 1) {
      value = 1;
    }
    setMaxPictures(value);
    if (pictures.length > value) {
      setPictures(pictures.slice(0, value));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", justifyContent: 'center', alignItems: "center", minHeight: "90vh", overflow: 'auto', height: "100%" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '12px' }}>
        <Stack spacing={3}>
          <Box display="flex" alignItems='center' gap={2}>
            <GoBack />
            <Typography variant="h4" component="h1" align="center">
              Submit Vehicle Information
            </Typography>
          </Box>
          {error && <Alert severity="error" onClose={() => setError("")}>{error}</Alert>}
          {success && <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Car Model"
                  variant="outlined"
                  fullWidth
                  name="carModel"
                  error={Boolean(errors.carModel)}
                  helperText={errors.carModel}
                  value={values.carModel}
                  onChange={handleOnChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="price"
                  error={Boolean(errors.price)}
                  helperText={errors.price}
                  value={values.price}
                  onChange={handleOnChange}
                  required
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  name="phone"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  value={values.phone}
                  onChange={handleOnChange}
                  required
                  inputProps={{ maxLength: 11 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  name="city"
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                  value={values.city}
                  onChange={handleOnChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Max Number of Pictures"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="maxPictures"
                  value={maxPictures}
                  onChange={handleMaxPicturesChange}
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ fontSize: 40, color: '#757575' }} />
                  {
                    isDragActive ?
                      <Typography variant="body1" color="primary">
                        Drop the files here ...
                      </Typography> :
                      <Typography variant="body1" color="textSecondary">
                        Drag & drop images here, or click to select files
                      </Typography>
                  }
                  <Typography variant="caption" color="textSecondary">
                    (Only images, up to {maxPictures} files, max 5MB each)
                  </Typography>
                </Box>
              </Grid>
              {pictures.length > 0 && (
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {pictures.map((picture, index) => (
                      <Grid item xs={6} sm={4} key={index}>
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            paddingTop: '75%',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: 1,
                          }}
                        >
                          <img
                            src={URL.createObjectURL(picture)}
                            alt={`Preview ${index + 1}`}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <IconButton
                            aria-label="delete"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'rgba(255, 255, 255, 0.7)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                              },
                            }}
                            onClick={() => handleDeletePicture(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  sx={{
                    height: '50px',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: '#fff',
                    fontSize: '16px',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                    },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
