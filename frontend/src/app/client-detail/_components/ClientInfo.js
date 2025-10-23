"use client";
import React from 'react'
import { useState } from 'react';
import { Typography, Box, Divider, TextField, Button, Select, MenuItem } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSearchParams } from 'next/navigation';

const appointments = [
  {
    id: 1,
    // Heading: "Examination of a General Practitioner",
    date: "15 February 2024",
    time: "10:00 am",
    doctorName: "قداد بن عمار",
    doctor: "Dr. Rasha",
    duration: "15 min",
    cost: "SAR 50"
  },
];

function ClientInfo() {

  const params = useSearchParams()
  const head = params.get('head')

  const router = useRouter();

  const clickhandle = () => {
    router.push("/login")
  }
  const handleonClick = () => {
    router.push("./")
  }


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleInnerData = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[\d+_]+$/, "Contact number must contain only digits, '+' or '_'")
      .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema,
    onSubmit: (data, { resetForm }) => {
      console.log("Form data:", data);
      axios.post(data)
        .then(response => {
          console.log(response.data);
          resetForm();
          toast.success("successfully sent!");
        })
        .catch(error => {
          console.error("An error occurred:", error.message);
          toast.error("Error: Failed. Please try again later.");
        });
    },

  });

  return (

    <Box sx={{ display: "flex", justifyContent: "center", gap: 5, mt: 5, mb: 20 }}>
      <Box>
        <Box onClick={handleonClick} sx={{ display: "flex", gap: 1, cursor: "pointer", mb: 5 }}>
          <Typography><ArrowBackIosNewIcon /></Typography>
          <Typography>Back</Typography>
        </Box>
        <Typography>Client Details</Typography>
        <Divider />
        <Typography sx={{ lineHeight: 4 }}>Please fill the following fields</Typography>
        <Typography sx={{ backgroundColor: "lightgray", padding: 1 }}>Already have an account?
          <span onClick={clickhandle} style={{ textDecoration: 'underline', cursor: "pointer" }}>Log In</span> {' '}
          <span>for faster booking.</span></Typography>

        <Box sx={{ display: "flex", gap: 5, mt: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ textAlign: "start" }}>Name *</Typography>
            <TextField
              name="name"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <Typography color="error">{formik.errors.name}</Typography>
            ) : null}

          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ textAlign: "start" }}>Email *</Typography>
            <TextField
              name="email"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Typography color="error">{formik.errors.email}</Typography>
            ) : null}
          </Box>
        </Box>

        <Box>
          <Typography sx={{ textAlign: "start", mt: 3 }}>Phone Number</Typography>
          <TextField
            name="phoneNumber"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Typography color="error">{formik.errors.phoneNumber}</Typography>
          ) : null}
        </Box>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography sx={{ textAlign: "start", mt: 3 }}>Add Your Message</Typography>
          <TextField
            name="message"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message ? (
            <Typography color="error">{formik.errors.message}</Typography>
          ) : null}
        </Box>

        <Typography sx={{ lineHeight: 3 }}>Payment</Typography>
        <Divider />

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ textAlign: "start" }}>Examination of a General Practitioner</Typography>
          <Select
            name="menu"
            variant="outlined"
            fullWidth
            value={formik.values.menu}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="option1">Pay Now</MenuItem>
            <MenuItem value="option2">Pay in Person</MenuItem>
          </Select>
          {formik.touched.menu && formik.errors.menu ? (
            <Typography color="error">{formik.errors.menu}</Typography>
          ) : null}
        </Box>
      </Box>
      <Box>
        <Box>
          <Box onClick={toggleInnerData} sx={{ display: "flex", gap: 10, cursor: "pointer", mt: 8 }}>
            <Typography>Booking Details</Typography>
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
          <Box style={{ overflow: "hidden", maxHeight: isOpen ? "400px" : "0", transition: "max-height 0.8s ease-in-out" }}>
            {appointments.map((appointment, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography>{head}</Typography>
                <Typography>{selectedDate} at {selectedTime}</Typography>
                <Typography>{appointment.doctorName}</Typography>
                <Typography>{appointment.doctor}</Typography>
                <Typography>{appointment.duration}</Typography>
                <Typography>From {appointment.cost}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Typography sx={{ lineHeight: 3 }}>Payment Details</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Total</Typography>
          <Typography>SAR 50</Typography>
        </Box>
        <Button
          onClick={formik.handleSubmit}
          sx={{
            backgroundColor: "black",
            width: "100%",
            mt: 2,
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
        >
          Add to Cart
        </Button>

        <Button
          onClick={formik.handleSubmit}
          sx={{
            backgroundColor: "black",
            width: "100%",
            mt: 2,
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
        >
          Book Now
        </Button>
      </Box>
    </Box>
  )
};

export default ClientInfo;
