"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  Avatar,
  CardActions,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { fetchDoctor } from "./createSchedule";
import CustomModal from "@/app/utilities/_components/CustomModal";
import Schedule from "./Schedule";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const ScheduleMain = () => {
  const router = useRouter();
  const [openAddScheduleModal, setOpenAddScheduleModal] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchDoctor(setDoctorData);
      SetLoading(false);
    }
  }, []);


  const handleOpenAddScheduleModal = () => {
    setOpenAddScheduleModal(true);
  };

  const handleSchedules = (id) => {
    router.push(`/schedule/doctor-schedule?id=${encodeURIComponent(id)}`);
  };

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            style={{
              fontWeight: 600,
              color: "rgb(240, 187, 55)",
              fontFamily: "Arial",
              fontSize: "35px",
            }}
          >
            SCHEDULE
          </Typography>
          <Button
            sx={{
              backgroundColor: "rgb(240, 187, 55)",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "capitalize",
              color: "white",
              width: "150px",
              height: "40px",
              "&:hover": { backgroundColor: "rgb(240, 187, 55)" },
            }}
            onClick={handleOpenAddScheduleModal}
          >
            Add Schedule
          </Button>

          <CustomModal
            open={openAddScheduleModal}
            setOpenModal={setOpenAddScheduleModal}
          >
            <Schedule />
          </CustomModal>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mt: 20,
            }}
          >
            <CircularProgress sx={{ color: "black" }} />
          </Box>
        ) : (
          <Grid container spacing={3} mt={3}>
            {doctorData.map((doctor) => (
              <Grid item key={doctor.id} xs={12} sm={6} md={4} lg={4}>
                <Card
                  onClick={() => handleSchedules(doctor.id)}
                  sx={{
                    width: "100%",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: -10,
                      zIndex: 1,
                    }}
                  ></Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    padding="10px 20px"
                    gap="5px"
                  >
                    <Avatar
                      style={{
                        borderRadius: "50%",
                        cursor: "pointer",
                        width: 100,
                        height: 100,
                        margin: "auto",
                      }}
                      src={doctor.profilePic}
                      alt={doctor.name}
                    />
                    <Typography variant="body2" gutterBottom>
                      {doctor.name}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                      {doctor.degreeInstitute} / {doctor.degreeName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "rgb(240, 187, 55)",
                        padding: "3px 20px",
                        letterSpacing: 1.3,
                        borderRadius: "15px",
                      }}
                      variant="body1"
                      color="white"
                      gutterBottom
                    >
                      {doctor.specialization}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <b>Experience:</b> {doctor.totalExperience} Years
                    </Typography>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Button
                        startIcon={<EmailIcon />}
                        sx={{
                          fontSize: "10px",
                          textTransform: "none",
                          color: "goldenrod",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {doctor.email}
                      </Button>
                      <Button
                        startIcon={<CallIcon />}
                        sx={{
                          fontSize: "10px",
                          textTransform: "none",
                          color: "goldenrod",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {doctor.contactNumber}
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ScheduleMain;
