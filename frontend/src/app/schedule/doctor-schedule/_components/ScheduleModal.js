"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { MobileTimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { updateSchedule } from "../../_components/createSchedule";

const ScheduleModal = ({ setOpenModal, schedule, setScheduleData }) => {
  const [selectedStartTime, setSelectedStartTime] = useState(moment.utc(schedule.startTime));
  const [selectedEndTime, setSelectedEndTime] = useState(moment.utc(schedule.endTime));
  const [duration, setDuration] = useState(schedule.slotDuration);

  const handleStartTimeChange = (date) => {
    setSelectedStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setSelectedEndTime(date);
  };
  const clearSelectedValues = () => {
    setSelectedStartTime(moment());
    setSelectedEndTime(moment());
    setDuration(0);
  };

  const handleButton =  () => {
    if (
      !selectedStartTime ||
      !selectedEndTime ||
      !duration
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const localStartTime = selectedStartTime.format("YYYY-MM-DDTHH:mm:ss");
    const localEndTime = selectedEndTime.format("YYYY-MM-DDTHH:mm:ss");

    const values = {
      startTime: localStartTime,
      endTime: localEndTime,
      slotDuration: duration,
    };

     updateSchedule(schedule.id, values);

    setScheduleData(prevSchedules => {
      return prevSchedules.map(schedules => {
        if (schedules.id === schedule.id) {
          return {
            ...schedule,
            slotDuration: values.slotDuration,
            startTime: values.startTime,
            endTime: values.endTime,
          };
        }
        return schedule;
      });
    });


    clearSelectedValues();

    setTimeout(() => {
      setOpenModal(false);
    }, 2500);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}>
        <CloseIcon
          onClick={() => {
            setOpenModal(false);
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
          p: 2,
          height: "70vh",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h6" textAlign="center">
          Edit Schedule
        </Typography>


        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileTimePicker
                sx={{ width: 200 }}
                label="Start Time"
                value={selectedStartTime}
                onChange={handleStartTimeChange}
                closeOnSelect={true}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileTimePicker
                sx={{ width: 200 }}
                label="End Time"
                value={selectedEndTime}
                onChange={handleEndTimeChange}
                minTime={selectedStartTime}
                closeOnSelect={true}
              />
            </LocalizationProvider>
          </Box>

          <Box>
            <TextField
              sx={{ width: 200 }}
              label="Duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Box>
        </Box>

        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            backgroundColor: "rgb(240, 187, 55)",
            "&:hover": {
              backgroundColor: "rgb(240, 187, 55)",
            },
          }} fullWidth
          onClick={handleButton}>
          Update Schedule
        </Button>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default ScheduleModal;
