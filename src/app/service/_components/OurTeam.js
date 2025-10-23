import React from 'react';
import ServiceCard from '@/app/utilities/_components/ServiceCard';
import { Box, Grid, Typography } from '@mui/material';

const TeamsData = [
    {Name: 'Dr. Hello Abbas', Designation: 'Dermatologist', imageUrl: '/team1.webp' },
    { Name: 'Dr. Ahmad', Designation: 'Dermatologist', imageUrl: '/team2.webp' },
    { Name: 'Dr. Maha Fouad', Designation: 'Dermatologist', imageUrl: '/team3.webp' },
    { Name: 'Dr. Khalouf', Designation: 'Dentist', imageUrl: '/team4.webp' },
];

function OurTeam() {
    return (
        <Box>
            <Box>
                <Box>
                    <Typography sx={{ textAlign: "center", fontSize: "46px", fontWeight: 500, lineHeight: 3 }}>Our Team</Typography>
                    <Typography sx={{ width: "45%", textAlign: "center", margin: "auto", mb: 6, lineHeight: 2 }}>
                        Meet our expert team of dedicated doctors, each bringing their unique expertise and passion to deliver top-notch medical care. With years of experience and a commitment to patient well-being, our doctors specialize in dermatology, dentistry, gynecology, internal medicine, and more. Rest assured that you're in capable hands with our accomplished medical professionals who are at the forefront of delivering the latest advancements in healthcare.</Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "#F1F1F1CC" }}>
                <Grid sx={{ width: "80%", margin: "auto", pt: 10, pb: 10 }} container spacing={2}>
                    {TeamsData.map((Teams, index) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                            <ServiceCard
                                serviceName={Teams.Name}
                                Designation={Teams.Designation}
                                imageUrl={Teams.imageUrl}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default OurTeam;
