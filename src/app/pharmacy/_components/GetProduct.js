"use client";
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/services/api';
export default function GetProduct() {
    const router = useRouter();
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        api.get('categories')
            .then(response => {
                setCategoriesData(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleProduct = (data) => {
        router.push(`/products/?id=${encodeURIComponent(data)}`)
    }



    return (
        <div>

            <Container maxWidth="md">
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
                                <Button onClick={() => handleProduct(category.id)} type="submit" variant="contained" color="primary" fullWidth>
                                    See Product
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </div>
    );
}
