"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Typography, Box, Button, Divider, IconButton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const containerStyle = {
  mt: 2,
  display: "flex",
  width: "100%",
  flexWrap: "wrap", // Enable wrapping
  flexDirection: "row", // Arrange boxes in a row
  justifyContent: "space-between"
};

const boxStyle = {
  border: "1px solid black",
  padding: "4px",
  mt: 1,
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "calc(50% - 8px)",
  flexBasis: "calc(50% - 8px)",
  boxSizing: "border-box",
  "&:hover": {
    backgroundColor: "lightgray",
  },
};

const selectedBoxStyle = {
  backgroundColor: "lightgray",
};

const typographyStyle = {
  textAlign: "center",
};

const appointmentTimes = {
  "2024-02-15": ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm",
    "10:00 am"],
  "2024-02-16": ["10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm"],
  "2024-02-17": ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm"],
  "2024-02-18": ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm"],
  "2024-02-19": ["10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm"],
  "2024-02-20": ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm"],
  "2024-02-21": ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm"],
  "2024-02-22": ["10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm"],
  "2024-02-23": ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm"],
  "2024-02-24": ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm"],
  "2024-02-25": ["10:00 am", "11:00 am", "12:00 pm", "01:00 pm", "02:00 pm"],
  "2024-02-26": ["09:00 am", "10:00 am", "11:00 am", "12:00 pm", "01:00 pm"],
  "2024-02-27": ["08:00 am", "09:00 am", "10:00 am", "11:00 am", "12:00 pm"],
};

const appointments = [
  {
    id: 1,
    Heading: "Examination of a General Practitioner",
    date: "15 February 2024",
    time: "10:00 am",
    doctorName: "قداد بن عمار",
    doctor: "Dr. Rasha",
    duration: "15 min",
    cost: "SAR 50"
  },
];

function CardDetails({ Heading }) {
  const router = useRouter();
  const handleonClick = () => {
    router.push("./bookappointment")
  }

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTimes, setSelectedDateTimes] = useState([]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleDateClick = (newValue) => {
    setValue(newValue);
    const selectedDate = newValue.format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    setSelectedDateTimes(appointmentTimes[selectedDate] || []);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleNextClick = () => {
    setIsNextClicked(true);``

  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const [value, setValue] = useState(null);

  const toggleInnerData = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleNext = () => {
    router.push('./productdetail/client-detail')
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, mt: 10 }}>
        <Box>
          <Box onClick={handleonClick} sx={{ display: "flex", gap: 1, cursor: "pointer" }}>
            <Typography><ArrowBackIosNewIcon /></Typography>
            <Typography>Back</Typography>
          </Box>
          <Typography sx={{ fontSize: "28px", lineHeight: 3 }}>{Heading}</Typography>
          <Typography>Check out our availability and book the date and time that works for you</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 6 }}>
            <Typography>Select a Date and Time</Typography>
            <Typography>Timezone: Pakistan Standard Time (GMT+5)</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: "flex" }}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={value} onChange={handleDateClick} />
              </LocalizationProvider>
            </Box>
            {selectedDateTimes.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{value.format("dddd, D MMMM")}</Typography>
                <Box sx={containerStyle}>
                  {selectedDateTimes.map((time, index) => (
                    <Box
                      key={index}
                      sx={{ ...boxStyle, ...(selectedTime === time && selectedBoxStyle) }}
                      onClick={() => handleTimeClick(time)}
                    >
                      <Typography sx={typographyStyle}>{time}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 12 }}>
          <Box sx={{ justifyContent: "space-around", display: "flex", cursor: "pointer" }}>
            <Box>
              <Box onClick={toggleInnerData} sx={{ display: "flex", gap : 5 }}>
                <Typography>Service Details</Typography>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
              <Box style={{ overflow: "hidden", maxHeight: isOpen ? "400px" : "0", transition: "max-height 0.8s ease-in-out" }}>
                {appointments.map((appointment, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <Typography>{Heading}</Typography>
                    <Typography>{selectedDate} at {selectedTime}</Typography>
                    <Typography>{appointment.doctorName}</Typography>
                    <Typography>{appointment.doctor}</Typography>
                    <Typography>{appointment.duration}</Typography>
                    <Typography>From {appointment.cost}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Button
            sx={{
              backgroundColor: "black",
              width: "100%",
              mt: 3,
              border: "1px solid white",
              borderRadius: "4px",
              color: "white",
              fontSize: "18px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "black",
              },
              "&:active": {
                backgroundColor: "black",
              },
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CardDetails;
