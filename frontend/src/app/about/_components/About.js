import React from 'react';
import HeroSec from '@/app/utilities/_components/HeroSec';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

function About() {
    return (
        <div>
            <HeroSec
                heading="Our clinics"
                description="Over the years, Dr. Wafaa Tolba Clinics have focused their efforts on developing individual-oriented services that will enrich the quality of life and enhance our society. Our clinics are Dermatology, Dentistry, Gynecology, Internal Medicine, Cosmetic Clinic, Radiology, and Laboratory tests are equipped with state-of-the-art equipment and technology to provide you with the best services in the Kingdom."
                imageUrl="/herosec2.webp"
            />
            <Box sx={{ width: "100%", display: "flex" }}>
                <Box sx={{ backgroundColor: "black", color: "white", width: "50%" }}>

                    <Typography sx={{ fontSize: "60px", padding: 15, width: "40%" }}>Our Mission & Vision</Typography></Box>
                <Box sx={{ width: "50%", padding: 5 }}>
                    <Box>
                        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>Mission</Typography>
                        <Typography sx={{ fontSize: "18px", lineHeight: 2 }}>At Dr. Wafaa Tulba Clinics, we are dedicated to transforming lives through comprehensive healthcare, advanced treatments, and personalized attention, fostering a healthier and happier community</Typography>
                    </Box>
                    <Box><Typography sx={{ fontSize: "18px", fontWeight: 700, mt: 3 }}>Vision</Typography>
                        <Typography sx={{ fontSize: "18px", lineHeight: 2 }}>Our vision is to be the premier healthcare destination, redefining excellence in patient-centered care, aligning with the 2030 Vision, while continually pioneering innovation and setting new benchmarks for comprehensive wellness.</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
                <img src='/mission1.webp' alt='mission1' width="33%" height="auto" />
                <img src='/mission2.webp' alt='mission1' width="34%" height="auto" />
                <img src='/mission3.webp' alt='mission1' width="33%" height="auto" />

            </Box>
        </div>
    );
}

export default About;
