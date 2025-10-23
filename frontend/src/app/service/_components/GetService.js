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
import { gettingAllServices } from "@/app/bookappointment/_components/apis";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

function GetServices() {
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

    const handleDoctor = (id) => {
        router.push(`/service/service-doctor?id=${encodeURIComponent(id)}`);
    };

    return (
        <Box sx={{ width: "80%", margin: "auto" }}
        >
            <Typography variant="h4" align="center" gutterBottom mt={5} mb={4}>
                Services
            </Typography>
            <Grid container spacing={2}>
                {services.map((service) => (
                    <Grid item key={service._id} xs={12} sm={6} md={3}>
                        <Card
                            sx={{ cursor: "pointer", height: "350px", mb: 10 }}
                            onClick={() => handleDoctor(service.id)}
                        >
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
                    mb : 10
                }}
            >
                {loading && <CircularProgress sx={{ color: "black" }} />}
            </Box>
        </Box>
    );
}

export default GetServices;
