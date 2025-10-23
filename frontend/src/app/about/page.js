import React from 'react';
import About from './_components/About';
import AppointmentBook from '../utilities/_components/AppointmentBook';
import { Box } from '@mui/material';
function page() {
  return (
    <Box>
      <About />
      <AppointmentBook />
    </Box>
  );
}

export default page;
