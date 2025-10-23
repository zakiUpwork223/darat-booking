"use client";
import React from 'react'

import Box from '@mui/material/Box';
import Products_provide from './_components/Products_provide';
import { Suspense } from 'react';

function page() {

    return (

      
            <Box sx={{ width: "75%", overflowY: "auto" }}>
                <Suspense fallback={<Box>Loading...</Box>}>
                    <Products_provide />
                </Suspense>
            </Box>
    )  
}

export default page
