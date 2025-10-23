import React from 'react';
import ServiceCard from '@/app/utilities/_components/ServiceCard';
import { Box, Grid, Typography } from '@mui/material';

const servicesData = [
    { serviceName: 'Dermatology', imageUrl: '/service3.webp' },
    { serviceName: 'Dentistry', imageUrl: '/service5.webp' },
    { serviceName: 'Gynaecology', imageUrl: '/service6.webp' },
    { serviceName: 'Cosmetology', imageUrl: '/service7.webp' },
];

function ServicesProvide() {
    return (
        <Box>
            <Box>
                <Box>
                    <Typography sx={{ textAlign: "center", fontSize: "46px", fontWeight: 500, lineHeight: 3 }}>Our Clinics</Typography>
                    <Typography sx={{ width: "45%", textAlign: "center", margin: "auto", mb: 6, lineHeight: 2 }}>
                        Our dedicated team of experts provides a wide range of services, including advanced dermatology treatments, comprehensive dental care, rejuvenating cosmetic solutions, personalized slimming programs, internal medicine expertise, women's health support, and precise lab tests. With a commitment to excellence and the latest technology, we ensure compassionate care and optimal results for each individual's unique needs. Your journey towards health and beauty starts here, guided by our unwavering dedication to your wellness.</Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "#F1F1F1CC" }}>
                <Grid sx={{ width: "80%", margin: "auto", pt: 10, pb: 10 }} container spacing={2}>
                    {servicesData.map((service, index) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                            <ServiceCard serviceName={service.serviceName} imageUrl={service.imageUrl} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default ServicesProvide;
