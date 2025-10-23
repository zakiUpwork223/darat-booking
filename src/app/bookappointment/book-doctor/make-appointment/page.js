import React from 'react'
import BookAppointment from './_components/BookAppointment'
import { Box } from '@mui/material'
import { Suspense } from 'react';

const page = () => {
  return (
    <Box>
      <Suspense fallback={<Box>Loading...</Box>}>
        <BookAppointment />
      </Suspense>
    </Box>
  )
}

export default page