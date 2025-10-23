"use client";
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function AppointmentBook() {
    const router = useRouter();
    const HandleClickable = () => {
        router.push("/bookappointment")
    };
    return (
        <Box sx={{ backgroundColor: "#000000", textAlign: "center", pb: 6 }}>
            <Typography sx={{ fontSize: "46px", fontWeight: 500, lineHeight: 3, color: "white" }}>Book an Appointment</Typography>
            <Typography sx={{ width: "45%", margin: "auto", mb: 6, lineHeight: 2, color: "white" }}>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and let your users know a little more about you.</Typography>
            <Button
                sx={{
                    width: "10%",
                    border: "1px solid white",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    "&:hover": {
                        backgroundColor: "black",
                    },
                    "&:active": {
                        backgroundColor: "black",
                    },
                }}
                onClick={HandleClickable}
            >
                Book Now
            </Button>
        </Box>
    );
}

export default AppointmentBook;
