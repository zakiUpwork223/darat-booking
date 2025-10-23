"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import ProCard from "@/app/pharmacy/_components/ProCard";
import { ToastContainer } from "react-toastify";
import { fetchItems, getCustomerDetailsByToken } from "../../pharmacy/_components/apiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from '@mui/material/Pagination';

export default function PharmacyProducts() {
    const [products, setProducts] = useState([]);
    const [customerID, setCustomerID] = useState();
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 3;
    const pagesVisited = pageNumber * productsPerPage;

    useEffect(() => {
        fetchItems(setProducts);

        if (typeof window !== 'undefined') {
            if (localStorage.getItem("token")) {
                getCustomerDetailsByToken(setCustomerID);
            }
            setTimeout(() => { setLoading(false) }, 1000)
        }
    }, []);

    const handleChangePage = (event, value) => {
        setPageNumber(value - 1);
    };

    return (
        <Box>
            <Container maxWidth="lg">
                <Box mt={4} mb={10}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Pharmacy Products
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
                        <>
                            <Grid container spacing={3} mt={3}>
                                {products.slice(pagesVisited, pagesVisited + productsPerPage).map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        {/* Product Card */}
                                        <ProCard product={product} customerID={customerID} />
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                <Pagination
                                    count={Math.ceil(products.length / productsPerPage)}
                                    page={pageNumber + 1} // +1 because Pagination starts indexing from 1
                                    onChange={handleChangePage}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
            <ToastContainer />
        </Box>
    );
}
