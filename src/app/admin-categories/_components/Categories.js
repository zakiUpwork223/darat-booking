"use client";
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AddCategoryModal from '@/app/create-category/_components/AddCategoryModal';
import CloseIcon from "@mui/icons-material/Close";


export default function Categories() {
    const router = useRouter();
    const [categoriesData, setCategoriesData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

    useEffect(() => {
        axios.get('https://ecommerce-be-da0999feadff.herokuapp.com/categories')
            .then(response => {
                setCategoriesData(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleProduct = (data) => {
        router.push(`/admin-products/?id=${encodeURIComponent(data)}`)
    }



    return (
        <div>
            <AddCategoryModal
                open={openAddCategoryModal}
                handleClose={() => setOpenAddCategoryModal(false)}
            />
            <Container maxWidth="md">
                <Box mt={5} mb={10}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Categories
                    </Typography>
                    <div style={{ marginBottom: '20px' }}>
                        <Grid container spacing={2}>
                            {categoriesData.map((category) => (
                                <Grid item key={category.name} xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={category.attachment}
                                            alt={category.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" color="text.primary">{category.name}</Typography>
                                            <Typography variant="body2" color="text.primary">{category.description}</Typography>
                                        </CardContent>
                                    </Card>
                                    <Button
                                        onClick={() => handleProduct(category.id)}
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "rgb(240, 187, 55)",
                                            "&:hover": {
                                                backgroundColor: "rgb(240, 187, 55)"
                                            }
                                        }}
                                        fullWidth
                                    >
                                        See Product
                                    </Button>

                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Box>
            </Container>
        </div >
    );
}
