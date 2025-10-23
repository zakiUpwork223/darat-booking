import React from 'react';
import { Suspense } from 'react';
import ServiceDoctor from './_components/ServiceDoctor';
import { Box } from '@mui/material';

function page() {
    return (
        <Box>
            <Suspense fallback={<Box>Loading...</Box>}>
                <ServiceDoctor />
            </Suspense>
        </Box>
    );
}

export default page;
