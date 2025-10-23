"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
    Box,
    Typography,
    Divider,
    Card,
    CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import { availableSlots } from "@/app/bookappointment/_components/apis";
import { useSearchParams } from "next/navigation";
import api from "../../../../../../lib/services/api";

const containerStyle = {
    mt: 2,
    display: "flex",
    width: "100%",
    flexWrap: "wrap", // Enable wrapping
    flexDirection: "row", // Arrange boxes in a row
    justifyContent: "space-between",
};

const boxStyle = {
    border: "1px solid black",
    padding: "4px",
    mt: 1,
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "100px",
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

const BookAppointment = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState([]);
    const [doctorAvailabilityMessage, setDoctorAvailabilityMessage] = useState("");
    const category = searchParams.get("category");

    const handleDateChange = async (newDate) => {
        setData([]);
        setLoading(true);
        const jsDate = newDate.toDate();
        const formattedDate = moment(jsDate).format("YYYY-MM-DDTHH:mm:ss");
        const body = {
            doctorId: searchParams.get("id"),
            dateSelected: formattedDate,
        };
        try {
            await availableSlots(body, setData);
            setLoading(false);
            if (data.length === 0) {
                setDoctorAvailabilityMessage("No Slot Available on this Date.");
            } else {
                setDoctorAvailabilityMessage(""); // Clear the message if data is available
            }
        } catch (error) {
            console.error(error);
            setDoctorAvailabilityMessage("Error fetching available slots."); // Set error message
        }
    };

    const value = searchParams.get("doctorId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/doctor");
                setDoctor(response.data);
                console.log("response:", response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [value]);

    const handleTimeClick = (selectedTime) => {
        setSelectedTime(selectedTime);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 10, mt: 10 }}>
            <Box sx={{ width: "25%" }}>
                {doctor.map((doctorData, index) => {
                    if (doctorData.id === value) {
                        return (
                            <Card key={index} sx={{ maxWidth: 300, margin: 2 }}>
                                <CardContent>
                                    <img
                                        src={doctorData.profilePic}
                                        alt="Doctor"
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {doctorData.name}
                                    </Typography>
                                    <Typography variant="body1" component="p" gutterBottom>
                                        Specialization: {doctorData.specialization}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        Experience: {doctorData.totalExperience}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    } else {
                        return null;
                    }
                })}
            </Box>
            <Box sx={{ width: "75%" }}>
                <Box
                    onClick={() => { }}
                    sx={{ display: "flex", gap: 1, cursor: "pointer" }}
                >
                    <Typography>
                        <ArrowBackIosNewIcon />
                    </Typography>
                    <Typography>Back</Typography>
                </Box>
                <Typography sx={{ fontSize: "28px", lineHeight: 3 }}>
                    {category} Specialist Booking
                </Typography>
                <Typography>
                    Check out our availability and book the date and time that works for
                    you
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 6 }}>
                    <Typography>Select a Date and Time</Typography>
                    <Typography>Timezone: Pakistan Standard Time (GMT+5)</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                sx={{
                                    "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
                                        color: "#fff",
                                        backgroundColor: "#e9be86",
                                        fontWeight: 500,
                                    },
                                }}
                                disablePast={true}
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Box sx={{ mt: 2 }}>
                            <Box sx={containerStyle}>
                                {data.length > 0 ? (
                                    data.map((doctorData, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                ...boxStyle,
                                                ...(selectedTime === doctorData && selectedBoxStyle),
                                            }}
                                            onClick={() => handleTimeClick(doctorData)}
                                        >
                                            <Typography sx={typographyStyle}>
                                                {moment.utc(doctorData).format("HH:mm")}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography sx={{ ml: 20, mt: 10 }}>{doctorAvailabilityMessage}</Typography>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                mt: 5,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                ml: 30,
                            }}
                        >
                            {loading && <CircularProgress sx={{ color: "black" }} />}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BookAppointment;
