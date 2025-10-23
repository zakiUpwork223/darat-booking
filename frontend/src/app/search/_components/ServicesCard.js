import {Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const ServicesCard = ({ services }) => {
  return (
    <Grid container spacing={2}>
      {services.length > 0 ? (
        services.map((serviceData, index) => (
          <Grid item key={index} xs={12} lg={3} sm={6}>
            <Card
              sx={{
                height: 350,
                width: 300,
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              <CardMedia
                component="img"
                height={200}
                image={serviceData.picture}
                alt={serviceData.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {serviceData.name}
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                  {serviceData.description}
                </Typography>
                <Typography variant="body1" component="p">
                  Available Appointments: {serviceData.schedule.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
            <Typography variant="h6" >No Services Found</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default ServicesCard;
