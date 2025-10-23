import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Grid container>
      {product.length > 0 ? (
        // Removed unnecessary curly braces here
        product.map((product, index) => (
          <Grid item key={index} xs={12} lg={3} sm={6}>
            <Card
              sx={{
                height: 350,
                width: 350,
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              <CardMedia
                component="img"
                src={product.attachment}
                height="70%"
                alt={product.name}
                sx={{
                  flex: "1",
                  "@media (min-width: 600px)": {
                    maxWidth: "80%",
                  },
                  "@media (min-width: 800px)": {
                    maxWidth: "100%",
                  },
                  "@media (min-width: 1280px)": {
                    maxWidth: "100%",
                  },
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{
                    "&:hover": {
                      color: `#333`,
                    },
                  }}
                >
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
            <Typography variant="h6" >No Product Found</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default ProductCard;
