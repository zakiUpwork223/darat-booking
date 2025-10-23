import React from 'react';
import HeroSec from '@/app/utilities/_components/HeroSec';
import { Box } from '@mui/material';

function HeroSection() {
    return (
        <Box sx = {{mt : 5}}>
            <Box sx={{
                width: "100%",
                backgroundPosition: 'center',
                backgroundSize: "cover",
                height: "100vh",
                backgroundImage: 'url("/herosec.webp")'
            }}>
            </Box>

            <HeroSec
                heading="Dr Wafa Clinics "
                description="Dr. Wafa Talabah Medical Clinics Complex represents the first destination in the world of medicine and beauty in Medina with comprehensive medical services. It includes a full range of clinics and services that include the latest technology, equipment and expertise. These modern clinics are designed to provide comfort to the patient, as well as ease of registration and examination at an affordable cost. We have a qualified medical staff with the highest levels of skill and experience, including doctors, assistants, specialists and nurses, to complete the excellent medical care services provided to our patients and clients."
                imageUrl="/herosec1.webp"
            />
        </Box>
    );
};
export default HeroSection;
