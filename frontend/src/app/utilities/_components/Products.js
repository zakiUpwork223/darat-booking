"use client";
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ProductCard from './ProductCard';

function Products({ heading, cardData, onClickHandler, description }) {
  const cardsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mt: { xl: 8, lg: 8, md: 6, sm: 5, xs: 4 } }}>
        <Typography sx={{ fontSize: { xl: "58px", lg: "48px", md: "38px", sm: "30px", xs: "18px" } }}>{heading}</Typography>
        <Typography sx={{ fontSize: { xl: "18px", lg: "16px", md: "14px", sm: "12px", xs: "10px" } }}>{description}</Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: { xl: 8, lg: 8, md: 5, sm: 3, xs: 2 }, mb: 8, width: "90%", margin: "auto" }}>
        {currentCards.map((data, index) => (
          <Grid item key={index} xs={6} sm={4} md={4} lg={3} xl={3} >
            <Box key={index} onClick={() => onClickHandler(data.route)}>
              <ProductCard cardData={data} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(cardData.length / cardsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ mt : 3, mb: 5, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}

export default Products;
