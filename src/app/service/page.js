import React from 'react';
import AppointmentBook from '../utilities/_components/AppointmentBook';
import OurTeam from './_components/OurTeam';
import GetService from './_components/GetService';
import { Box } from '@mui/material';

function page() {
  return (
    <Box>
      <GetService />
      <AppointmentBook />
      <OurTeam />
    </Box>
  );
}

export default page;
