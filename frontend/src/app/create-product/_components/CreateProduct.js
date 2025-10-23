"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Container, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from "@mui/icons-material/Close";
import api from '../../../../lib/services/api';
export default function CreateProduct({ handleClose }) {
    const [formData, setFormData] = useState({
        attachment: '',
        name: '',
        description: '',
        category_id: "e6e65760-68f8-4a66-bf82-425051ce3e5f",
        variants: [
            {
                size: '',
                price: 0,
                stock: 0
            }
        ]
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('Fetching categories...');
        api.get("categories")
            .then(response => {
                console.log('Categories response:', response);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleFileUpload = (e) => {
        console.log('File uploaded:', e.target.files[0]);
        const file = e.target.files[0];
        setFormData({ ...formData, attachment: file });
    };

    const handleChange = (e) => {
        console.log('Field changed:', e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const updatedVariants = [...formData.variants];

        const newValue = name === 'price' || name === 'stock' ? parseFloat(value) : value;
        updatedVariants[index] = { ...updatedVariants[index], [name]: newValue };
        setFormData({ ...formData, variants: updatedVariants });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Form submitted:', formData);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.attachment);

            const imageResponse = await api.post("image/upload/single",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log("Image Upload Response:", imageResponse.data);
            const imageUrl = imageResponse.data;

            const formDataToSendItems = {
                name: formData.name,
                attachment: imageUrl,
                categoryId: formData.category_id,
                description: formData.description,
                variants: formData.variants
            };

            console.log("formDataToSendItems:", formDataToSendItems);
            const response = await api.post('items', formDataToSendItems);

            console.log('New product created:', response.data);
            toast.success('Product created successfully!');
            handleClose();
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('An error occurred while creating the product.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer", mt: 0.7 }} />
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom mt={3}>
                    Create Product
                </Typography>
                <Box style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* File Upload */}
                        <Box elevation={3} mb={2}>
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
                        </Box>
                        {/* Product Details */}
                        <Box display="flex" flexDirection="row" gap={2}>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                select
                                label="Category"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                fullWidth
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {/* Variants */}
                        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
                            {formData.variants.map((variant, index) => (
                                <Box key={index} display="flex" flexDirection="row" gap={2}>
                                    <TextField
                                        label="Size"
                                        name="size"
                                        value={variant.size}
                                        onChange={(e) => handleVariantChange(index, e)}
                                    />
                                    <TextField
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, e)}
                                    />
                                    <TextField
                                        label="Stock"
                                        name="stock"
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(index, e)}
                                    />
                                </Box>
                            ))}
                        </Box>
                        {/* Submit Button */}
                        <Button
                            sx={{
                                mt : 2,
                                color: "white",
                                fontWeight: "bold",
                                backgroundColor: "rgb(240, 187, 55)",
                                "&:hover": {
                                    backgroundColor: "rgb(240, 187, 55)",
                                },
                            }} fullWidth
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </Box>
                </Box>
                <ToastContainer />
            </Container >
        </>
    );
}