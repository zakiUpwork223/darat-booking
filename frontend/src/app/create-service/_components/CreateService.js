"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { useRouter } from 'next/navigation';
import CloseIcon from "@mui/icons-material/Close";
import api from '../../../../lib/services/api';

export default function CreateService({ handleClose }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        picture: '',
        name: '',
        description: '',
        serviceFee: 0,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, picture: imageUrl });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', file);

            const imageResponse = await api.post(
                "image/upload/single",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Image Upload Response:", imageResponse.data);
            const imageUrl = imageResponse.data;

            const formDataWithImage = {
                ...formData,
                picture: imageUrl,
            };

            const response = await api.post(
                'medical_services',
                formDataWithImage
            );

            console.log('New service created:', response.data);
            toast.success('Service created successfully!');
            setError(null);
            handleClose(); // Close the form and modal after successful submission
        } catch (error) {
            console.error('Error creating service:', error);
            setSuccess(false);
            setError(error.message || 'An error occurred while creating the service.');
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer", mt: 0.7 }} />
            <Container maxWidth="sm" >
                <Typography variant="h4" align="center" gutterBottom mt={5} >
                    Create Service
                </Typography>
                <Box style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box elevation={3}>
                                    <Box>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="picture-upload"
                                            type="file"
                                            onChange={handleFileUpload}
                                        />

                                        {formData.picture && (
                                            <Box>
                                                <img
                                                    src={formData.picture}
                                                    alt="Uploaded"
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                />
                                            </Box>
                                        )}
                                        <Box mt={2}>
                                            <label htmlFor="picture-upload">
                                                <Button variant="outlined" component="span" fullWidth>
                                                    {formData.attachment ? 'Change Image' : 'Upload Image'}
                                                </Button>
                                            </label>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Service Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    label="Service Fee"
                                    name="serviceFee"
                                    type="number"
                                    value={formData.serviceFee}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <Button onClick={handleSubmit} sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    backgroundColor: "rgb(240, 187, 55)",
                                    "&:hover": {
                                        backgroundColor: "rgb(240, 187, 55)",
                                    },
                                }} fullWidth>
                                    Create Service
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <ToastContainer />
                </Box>
            </Container>
        </>
    );
}
