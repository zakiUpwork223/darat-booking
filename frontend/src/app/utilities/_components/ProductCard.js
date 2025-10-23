import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

function ProductCard({ cardData, showBorder }) {
  return (
    <Box sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        src={cardData.imageSrc}
        sx={{
          maxWidth: '100%',
          height: 'auto',
          '@media (min-width: 600px)': {
            maxWidth: '80%',
          },
          '@media (min-width: 800px)': {
            maxWidth: '100%',
          },
          '@media (min-width: 1280px)': {
            maxWidth: '100%',
          },
        }}
      />

      <CardContent style={{ display: 'flex', flexDirection: 'column', border: showBorder ? '1px solid black' : 'none' }}>
        <Typography sx={{ fontSize: { xl: "18px", lg: "17px", md: "15px", sm: "12px", xs: "12px" } }}>
          {cardData.primaryText}
        </Typography>
        <Box style={{ display: 'flex', gap: 15 }}>
          <Typography sx={{ fontSize: { xl: "18px", lg: "17px", md: "14px", sm: "12px", xs: "10px" } }}>
            <s>{cardData.secondaryText1}</s>
          </Typography>
          <Typography sx={{ fontSize: { xl: "18px", lg: "17px", md: "14px", sm: "12px", xs: "10px" } }}>
            {cardData.secondaryText2}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
}

export default ProductCard;
