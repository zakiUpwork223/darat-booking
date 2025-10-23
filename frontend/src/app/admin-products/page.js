"use client";
import React from "react";
import Box from "@mui/material/Box";
import Products from "./_components/Products";
function page() {
  return (
    <Box sx={{ width: "75%", overflowY: "auto" }}>
      <Products />
    </Box>
  );
}

export default page;
