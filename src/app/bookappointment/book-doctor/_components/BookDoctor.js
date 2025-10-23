"use client";
import React, { useState, useEffect } from "react";
import { getDoctors } from "../../_components/apis";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const BookDoctor = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const handleBookAppointment = (id, category, doctorId) => {
    route.push(
      `/bookappointment/book-doctor/make-appointment?id=${encodeURIComponent(
        id
      )}&category=${encodeURIComponent(category)}&doctorId=${encodeURIComponent(
        doctorId
      )}`
    );
  };

  useEffect(() => {
    const fetchData =  () => {
      const fetchedDoctors =  getDoctors(setDoctors, value);
      setLoading(false);
      if (fetchedDoctors.length === 0) {
        console.log("Doctor is not available");
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      <Typography
        sx={{
          fontSize: "38px",
          textAlign: "center",
          mt: 4,
          mb: 4,
          fontWeight: 600,
        }}
      >
        Book Doctor
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress  sx={{ color: "black" }}/>
        </Box>
      ) : doctors.length === 0 ? (
        <Typography variant="h5" align="center">
          Doctor is not Available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {doctors.map((doctor) => (
            <Grid item key={doctor.id} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <img
                    src={doctor.profilePic}
                    alt="Service"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                  <Typography variant="h6" component="h2" gutterBottom>
                    {doctor.name}
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    Specialization: {doctor.specialization}
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    Experience: {doctor.totalExperience}
                  </Typography>

                  <Button
                    sx={{
                      mt: 2,
                      width: "100%",
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
                    onClick={() =>
                      handleBookAppointment(
                        doctor.id,
                        doctor.specialization,
                        doctor.id
                      )
                    }
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BookDoctor;
