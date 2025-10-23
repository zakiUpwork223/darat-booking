"use client";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getDoctors } from "@/app/bookappointment/_components/apis";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ServiceDoctor = () => {
  const route = useRouter();

  const router = useSearchParams();
  const value = router.get("id");

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getDoctors(setDoctors, value);
    };
    fetchData();
  }, []);
  return (

    <Box sx={{ width: "80%", margin: "auto" }}>
       <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
                Doctors
            </Typography>
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
                <Typography variant="body1" component="p" gutterBottom>
                  Specialization: {doctor.specialization}
                </Typography>
                <Typography variant="body1" component="p">
                  Experience: {doctor.totalExperience}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box >
  );
};

export default ServiceDoctor;
