"use client";
import React from 'react'
import ServicesProvided from './_components/ServicesProvided'
import Box from '@mui/material/Box';
function page() {

    return (
            <Box sx={{ width: "75%", overflowY: "auto" }}>
                <ServicesProvided />
            </Box>
       
    )
}

export default page
