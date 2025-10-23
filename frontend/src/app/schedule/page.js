import React from "react";
import Box from "@mui/material/Box";
import ScheduleMain from "./_components/ScheduleMain";

function page() {
  return (
    <Box sx={{ width: "75%", overflowY: "auto" }}>
      <ScheduleMain />
    </Box>
  );
}

export default page;
