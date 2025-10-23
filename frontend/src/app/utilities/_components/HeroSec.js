import React from 'react';
import { Typography, Box } from '@mui/material';

function HeroSec({ heading, description, imageUrl }) {
    return (
        <Box>
            <Box>
                <Typography sx = {{textAlign : "center", fontSize : "36px", fontWeight : 500,lineHeight : 3 }}>{heading}</Typography>
                <Typography sx = {{width : "45%", textAlign : "center", margin : "auto", mb : 6, lineHeight : 2}}>{description}</Typography>
            </Box>
            <Box sx={{
                width: "100%",
                backgroundPosition: 'center',
                backgroundSize: "cover",
                height: "100vh",
                backgroundImage: `url(${imageUrl})`
            }}>
            </Box>
        </Box>
    );
}

export default HeroSec;
