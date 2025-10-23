"use client";
import React from "react";
import { Card, Divider, Typography } from "@mui/material";
import { Box, styled, CardActions, Button } from "@mui/material";
import { keyframes } from "@emotion/react";

const Info = () => {
  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const AccountContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    "&:hover": {
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    },
    animation: `${fadeIn} 0.5s ease`,
  });

  const DriverImage = styled("img")({
    width: "95%",
    borderRadius: "10px",
  });

  return (
    <Card
      sx={{
        borderRadius: "20px",
        boxShadow: "10px ",
        width: "100%",
      }}
    >
      <AccountContainer>
        <DriverImage src="/herosec.webp" alt="Driver Image" />

        <Typography sx={{ fontSize: "19px", mt: 2 }} gutterBottom>
          <b>Darat Booking Engine</b>
        </Typography>
        <Typography gutterBottom variant="body1">
          <b>Call:</b> +023 32034 44
        </Typography>
      </AccountContainer>
      <Divider />
      {/* <Typography
        sx={{
          fontSize: "23px",
          textAlign: "center",
          mb :2,
          mt : 2
        }}
      >
        Hospital Profile
      </Typography> */}
    </Card>
  );
};

export default Info;
