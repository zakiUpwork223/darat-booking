import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  CardMedia,
  Grid,
} from "@mui/material";
const DoctorCard = ({ doctor }) => {
  return (
    <Grid container spacing={1}>
      {doctor.length > 0 ? (
        doctor.map((doctorData, index) => {
          return (
            <Grid item xs={12} lg={3} sm={12} m={4}>
              <Card key={index} sx={{ maxWidth: 300, margin: 2 }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    src={doctorData.profilePic}
                    height={300}
                    alt={doctorData.name}
                  />
                  <Typography variant="h6" component="h2" gutterBottom>
                    {doctorData.name}
                  </Typography>
                  <Typography variant="body1" component="p" gutterBottom>
                    Specialization: {doctorData.specialization}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Experience: {doctorData.totalExperience}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
            <Typography variant="h6" >No Doctor Found</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default DoctorCard;
