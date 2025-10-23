"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, Avatar } from "@mui/material";
import {
  individualDoctorSchedule,
  deleteSchedule,
} from "../../_components/createSchedule";
import moment from "moment";
import CustomModal from "@/app/utilities/_components/CustomModal";
import { useSearchParams } from "next/navigation";
import ScheduleMenu from "./ScheduleMenu";
import ScheduleModal from "./ScheduleModal";
import CircularProgress from "@mui/material/CircularProgress";

const DoctorSchedules = () => {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const [scheduleData, setScheduleData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalScheduleId, setModalScheduleId] = useState(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          individualDoctorSchedule(setScheduleData, id);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleOpenEditModal = (scheduleId) => {
    setModalScheduleId(scheduleId);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setModalScheduleId(null);
  };

  const handleDelete = (id) => {
    deleteSchedule(id);
    setScheduleData((prevScheduleData) =>
      prevScheduleData.filter((schedule) => schedule.id !== id)
    );
  };

  return (
    <Box>
      <Typography
        sx={{ display: "flex", justifyContent: "center", fontSize: "32px", fontWeight: 500, mt: 4 }}
      >
        Schedules
      </Typography>

      <Grid container spacing={3} mt={3}>
        {scheduleData.map((schedule) => (
          <Grid item key={schedule.id} xs={12} sm={6} md={3} lg={3}>
            <Card
              sx={{
                width: "100%",
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
                  right: -5,
                  zIndex: 1,
                }}
              >
                <ScheduleMenu
                  onClickDelete={() => handleDelete(schedule.id)}
                  onClickEdit={() => handleOpenEditModal(schedule.id)}
                />
                <CustomModal
                  open={openEditModal && modalScheduleId === schedule.id}
                  setOpenModal={handleCloseEditModal}
                >
                  <ScheduleModal
                    schedule={schedule}
                    setScheduleData={setScheduleData}
                    scheduleData={scheduleData}
                  />
                </CustomModal>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="5px"
                padding="20px"
              >
                <Avatar
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    margin: "auto",
                  }}
                  src={schedule.doctorId.profilePic}
                />
                <Typography variant="body2" gutterBottom>
                  {schedule.doctorId.name}
                </Typography>
                <Typography gutterBottom variant="body2">
                  StartTime / EndTime
                </Typography>
                <Typography gutterBottom variant="body2">
                  {moment.utc(schedule.startTime).format("HH:mm")} /
                  {moment.utc(schedule.endTime).format("HH:mm")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Duration / {schedule.slotDuration} mins
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
                  {schedule.weekday}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 20
        }}
      >
        {loading && <CircularProgress sx={{ color: "black" }} />}
      </Box>
    </Box>
  );
};

export default DoctorSchedules;
