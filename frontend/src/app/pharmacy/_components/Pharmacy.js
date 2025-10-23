import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from '@/app/utilities/_components/ProductCard';

function Pharmacy() {

  const data = [
    {
      imageSrc: "/product1.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$21.00ریال",
      secondaryText2: "$29.00ریال",
    },
    {
      imageSrc: "/product2.png",
      primaryText: "Cosmo White Eye Contour",
      secondaryText1: "$195.50ریال",
      secondaryText2: "$159.00ریال",
    },
    {
      imageSrc: "/product3.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$132.25ریال",
      secondaryText2: "$109.00ریال",
    },
    {
      imageSrc: "/product4.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$111.55ریال",
      secondaryText2: "$99.00ریال",
    },
    {
      imageSrc: "/product5.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$241.00ریال",
      secondaryText2: "$219.00ریال",
    },
    {
      imageSrc: "/product5.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$241.00ریال",
      secondaryText2: "$219.00ریال",
    },
    {
      imageSrc: "/product3.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$132.25ریال",
      secondaryText2: "$109.00ریال",
    },
    {
      imageSrc: "/product4.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$111.55ریال",
      secondaryText2: "$99.00ریال",
    },
    {
      imageSrc: "/product5.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$241.00ریال",
      secondaryText2: "$219.00ریال",
    },
    {
      imageSrc: "/product5.png",
      primaryText: "La Roche Posa Hyaluronic Acid B5",
      secondaryText1: "$241.00ریال",
      secondaryText2: "$219.00ریال",
    },
  ];

  return (
    <Box>
      <Box sx={{
        width: "100%",
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: "200px",
        backgroundImage: 'url("/pharmacyHeroSec.webp")'
      }}>
      </Box>
      <Typography sx={{ fontSize: "36px", lineHeight: 2 }}>All Products</Typography>
      <Typography sx={{ width: "45%", mb: 6, lineHeight: 1.5 }}>
        With a wide range of prescription medications, over-the-counter products, and health essentials, our pharmacy is your trusted partner in health and wellness.</Typography>
        <Typography>{data.length} products</Typography>
      <Grid container spacing={2} sx = {{mb : 10}}>
        {data.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <ProductCard cardData={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Pharmacy;
