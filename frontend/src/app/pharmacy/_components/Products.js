"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import ProCard from "./ProCard";
import { ToastContainer } from "react-toastify";
import { fetchItems, getCustomerCart } from "./apiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCustomerCart } from "../../../../lib/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
export default function ProductData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoader] = useState(true);
  const dispatch= useDispatch();

  useEffect(() => {
    fetchItems(setProducts);
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        dispatch(fetchCustomerCart());
      }
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, []);

  return (
    <Box>
      <Container maxWidth="lg">
        <Box mt={4} mb={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Products
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                mt: 20,
              }}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Box>
          ) : (
            <Grid container spacing={3} mt={3}>

              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
              
                  <ProCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
       
      </Container>
      <ToastContainer />
    </Box>
  );
}
