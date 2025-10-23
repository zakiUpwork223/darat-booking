import React from "react";
import Box from "@mui/material/Box";
import DoctorSchedules from "./_components/DoctorSchedules";

function page() {
  return (
    <Box sx={{ width: "75%", overflowY: "auto" }}>
      <DoctorSchedules />
    </Box>
  );
}

export default page;
