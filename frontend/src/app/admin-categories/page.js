"use client";
import React from "react";
import Box from "@mui/material/Box";
import Categories from "./_components/Categories";
function page() {
  return (
    <Box sx={{ width: "75%", overflowY: "auto" }}>
      <Categories />
    </Box>
  );
}

export default page;
