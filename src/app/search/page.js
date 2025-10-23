"use client";
import React, { Suspense } from "react";
import { Box } from "@mui/material";
import Search from "./_components/Search";

const Page = () => {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    </Box>
  );
};

export default Page;
