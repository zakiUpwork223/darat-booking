"use client";
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
import { createSchedule } from "./createSchedule";
import { fetchDoctor, fetchServices } from "./createSchedule";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";

const Schedule = ({ setOpenModal }) => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [copyOfDoctors, setCopyOfDoctors] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState(moment());
  const [selectedEndTime, setSelectedEndTime] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [duration, setDuration] = useState(15);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchServices(setServices);
        await fetchDoctor(setDoctors, setCopyOfDoctors);
      } catch (error) {
        console.error("Error fetching services and doctors:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectService = async (event) => {
    const value = event.target.value;
    const type = services.filter((ser) => ser.id === value);
    setSelectedService(value);

    const filterDoctor = copyOfDoctors.filter(
      (doctors) => doctors.specialization === type[0].name
    );

    setDoctors(filterDoctor);
  };

  const handleSelectDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleStartTimeChange = (date) => {
    setSelectedStartTime(date);
  };
 
  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleEndTimeChange = (date) => {
    setSelectedEndTime(date);
  };
  const clearSelectedValues = () => {
    setSelectedService("");
    setSelectedDoctor("");
    setSelectedStartTime(moment());
    setSelectedEndTime(moment());
    setSelectedDate(moment());
    setDuration(0);
    
  };

  const handleButton = async () => {
    if (
      !selectedService ||
      !selectedDoctor ||
      !selectedStartTime ||
      !selectedEndTime ||
      !duration
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const localStartTime = selectedStartTime.format("YYYY-MM-DDTHH:mm:ss");
    const localEndTime = selectedEndTime.format("YYYY-MM-DDTHH:mm:ss");
    const day = selectedDate.format("YYYY-MM-DDT00:00:00");

    const values = {
      doctorId: selectedDoctor,
      serviceId: selectedService,
      scheduleDate: day,
      startTime: localStartTime,
      endTime: localEndTime,
      slotDuration: duration,
    };

    await createSchedule(values);
    clearSelectedValues();

    setTimeout(() => {
      setOpenModal(false);
    }, 2500);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
        <CloseIcon onClick={() => { setOpenModal(false) }} />
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
        <Typography variant="h6" textAlign="center">Add Schedule</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select Service</InputLabel>
              <Select
                labelId="dropdown-label"
                label="select service"
                id="dropdown"
                value={selectedService}
                onChange={handleSelectService}
              >
                {services.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select Doctor</InputLabel>
              <Select
                labelId="dropdown-label"
                label="Select Doctor"
                id="dropdown"
                value={selectedDoctor}
                onChange={handleSelectDoctor}
              >
                {doctors.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
          <Box sx={{ minWidth: 200 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                
                sx={{ width: 200 }}
                label="Select Date"
                value={selectedDate}
                onChange={handleDate}
                closeOnSelect={true}
              />
            </LocalizationProvider>
          </Box>
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

        <Button sx={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "rgb(240, 187, 55)",
          "&:hover": {
            backgroundColor: "rgb(240, 187, 55)",
          },
        }} fullWidth onClick={handleButton}>
          Create Schedule
        </Button>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Schedule;
