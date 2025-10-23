import React from 'react';
import Signup from './_components/Signup';
import { Suspense } from 'react';
import { Box } from '@mui/material';

function page() {
    return (
        <Box>
            <Suspense fallback={<Box>Loading...</Box>}>
                <Signup />
            </Suspense>
        </Box>
    );
}
export default page;
