"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { gettingAllServices } from "./apis";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";


function Services() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await gettingAllServices(setServices);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleBookNow = (id) => {
    router.push(`/bookappointment/book-doctor/?id=${encodeURIComponent(id)}`);
  };

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
        Our Services
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item key={service._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "400px" }}>
              <CardContent>
                <img
                  src={service.picture}
                  alt="Service"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
                <Typography variant="h6" component="h2" gutterBottom>
                  {service.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  {service.description}
                </Typography>
                {/* <Typography variant="body1" component="p">
                  Service Fee: ${service.serviceFee}
                </Typography> */}
                <Button
                  sx={{
                    width : "50%",
                    mt: 1,
                    border: "1px solid white",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor: "black",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={() => handleBookNow(service.id)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: 6,
        }}
      >
        {loading && <CircularProgress sx={{ color: "black" }} />}
      </Box>
    </Box>
  );
}

export default Services;
