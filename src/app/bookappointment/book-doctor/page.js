import React from 'react';
import BookDoctor from './_components/BookDoctor';
import { Suspense } from 'react';
import { Box } from '@mui/material';

function page() {
  return (
    <Box>
      <Suspense fallback={<Box>Loading...</Box>}>
        <BookDoctor />
      </Suspense>
    </Box>
  );
}

export default page;