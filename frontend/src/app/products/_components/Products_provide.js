"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import AddProductModal from '@/app/create-product/_components/AddProductModal';

export default function Products_provide() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const id = searchParams.get('id');


  useEffect(() => {
    async function fetchData() {
      try {
        console.log("id params", id)
        const response = await axios.get(`https://ecommerce-be-da0999feadff.herokuapp.com/items`);
        console.log(response.data[0].category_id.id)
        const filterData = response.data.filter((data) => data.category_id.id == id);
        console.log(filterData)
        setProducts(filterData);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
    }
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://ecommerce-be-da0999feadff.herokuapp.com/items/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleAddService = () => {
    router.push('/create-product')
  }

  return (
    <>
      <AddProductModal
        open={openAddProductModal}
        handleClose={() => setOpenAddProductModal(false)}
      />
      <Container maxWidth="md">
        <Box mt={5} mb={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Products
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                      <img
                        src={product.attachment}
                        alt={product.name}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
                      {product.description}
                    </Typography>
                    {product.variantId && product.variantId.map((variant, index) => (
                      <div key={index}>
                        <Typography variant="body1" component="p">
                          <b>Price:</b> {variant.price}
                        </Typography>
                        <Typography variant="body1" component="p">
                          <b>Size:</b> {variant.size}
                        </Typography>
                        <Typography variant="body1" component="p">
                          <b>Stock:</b> {variant.stock}
                        </Typography>
                        {variant.colors && variant.colors.length > 0 && (
                          <ul>
                            {variant.colors.map((color, idx) => (
                              <li key={idx}>
                                Color: {color.color}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </CardContent>
                  <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          {error && (
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );

}
