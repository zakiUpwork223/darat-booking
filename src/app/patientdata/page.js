import React from "react";
import PatientsPage from "./_components/Patients";
import Box from "@mui/material/Box";
import Drawer from "../utilities/_components/Drawer";

function page() {
  return (
    <Box sx={{ width: "75%", overflowY: "auto" }}>
      <PatientsPage />
    </Box>
  );
}

export default page;
