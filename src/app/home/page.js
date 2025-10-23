"use client";
import React, { useEffect } from 'react';
import HeroSection from './_components/HeroSection';
import AppointmentBook from '../utilities/_components/AppointmentBook';
import PharmacyProducts from './_components/PharmacyProducts';
import { Box } from '@mui/material';
function Home() {
    return (
        <Box>
            <HeroSection />
            <AppointmentBook />
            <PharmacyProducts />
        </Box>
    );
}

export default Home;
