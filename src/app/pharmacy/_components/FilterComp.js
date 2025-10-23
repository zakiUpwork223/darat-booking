"use client";
import React, { useState } from 'react';
import { Typography, Box, Divider, Slider } from '@mui/material';

function FilterComp() {
    const [priceRange, setPriceRange] = useState([99.00, 650.00]);
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <Box>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Filter by</Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography>Price</Typography>
                <Typography>-</Typography>
            </Box>
            <Slider sx={{ color: "black", mt: 1, fontSize: "6px" }}
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `ریال${value}`}
                min={99}
                max={650}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography>{`ریال${priceRange[0]}`}</Typography>
                <Typography>{`ریال${priceRange[1]}`}</Typography>
            </Box>
            <Divider />
        </Box>
    );
}

export default FilterComp;
