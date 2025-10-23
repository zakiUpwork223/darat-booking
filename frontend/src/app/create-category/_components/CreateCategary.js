"use client";
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import CloseIcon from "@mui/icons-material/Close";
import api from '../../../../lib/services/api';
export default function CreateCategory({ handleClose }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        attachment: null,
        name: '',
        description: '',
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, attachment: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.attachment);

            const imageResponse = await api.post("/image/upload/single",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Image Upload Response:", imageResponse.data);
            const imageUrl = imageResponse.data.url;

            const formDataToSendCategories = {
                ...formData,
                attachment: imageUrl,
            };

            const response = await api.post('/categories',
                formDataToSendCategories
            );

            console.log('New Category created:', response.data);
            toast.success('Category created successfully!');
            router.push('/pharmacy');
        } catch (error) {
            console.error('Error creating Category:', error);
            toast.error('An error occurred while creating the Category.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer", mt: 0.7 }} />
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom mt={5}>
                    Create Category
                </Typography>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper elevation={3}>
                                    <Box p={2}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="picture-upload"
                                            type="file"
                                            onChange={handleFileUpload}
                                        />
                                        {formData.attachment && (
                                            <Box mb={2}>
                                                <img
                                                    src={URL.createObjectURL(formData.attachment)}
                                                    alt="Uploaded"
                                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                />
                                            </Box>
                                        )}
                                        <label htmlFor="picture-upload">
                                            <Button variant="outlined" component="span" fullWidth>
                                                {formData.attachment ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                        </label>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Category Name"
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
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Create Category
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
