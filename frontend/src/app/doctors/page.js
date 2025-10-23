import React from 'react';
import Box from '@mui/material/Box';
import DoctorsPage from './_components/DoctorsPage';

function Page() {
    return (
     
            <Box sx={{ width: "75%", overflowY: "auto" }}>
                <DoctorsPage />
            </Box>
     
    );
}

export default Page;
