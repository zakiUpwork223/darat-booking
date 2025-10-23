"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ecommerce-app001-cf0c1431dc54.herokuapp.com/items');
      setProductsData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Product Cards</title>
        <meta name="description" content="Product Cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          {productsData.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.attachment}
                  alt={product.name}
                />
                <CardContent style={{ height: '220px', display: 'flex', flexDirection: 'column' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attachment: {product.attachment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category ID: {product.category_id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Variants:
                  </Typography>
                  <ul>
                    {product.variants && product.variants.map((variant, index) => (
                      <li key={index}>
                        <Typography variant="body2" color="text.secondary">
                          Size: {variant.size}, Price: ${variant.price}, Stock: {variant.stock}
                        </Typography>
                        {variant.colors && variant.colors.map((color, colorIndex) => (
                          <Typography key={colorIndex} variant="body2" color="text.secondary">
                            Color: {color.color}
                          </Typography>
                        ))}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
