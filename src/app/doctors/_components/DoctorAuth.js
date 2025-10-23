"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box, Button, TextField, Avatar, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../../../lib/services/api";

const DoctorAuth = ({ handleClose }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        contactNumber: Yup.string().matches(/^[\d+_]+$/, "Contact number must contain only digits, '+' or '_'").required("Contact number is required"),
        degreeName: Yup.string().when([], {
            is: (value) => Boolean(value),
            then: Yup.string().required("Degree name is required"),
        }),
        degreeInstitute: Yup.string().when([], {
            is: (value) => Boolean(value),
            then: Yup.string().required("Degree institute is required"),
        }),
        specialization: Yup.string().when([], {
            is: (value) => Boolean(value),
            then: Yup.string().required("Specialization is required"),
        }),
        totalExperience: Yup.number().when([], {
            is: (value) => Boolean(value),
            then: Yup.number().required("Total experience is required"),
        }),
        doctorFee: Yup.number().when([], {
            is: (value) => Boolean(value),
            then: Yup.number().required("Doctor Fee is required"),
        }),
    });
    const [services, setServices] = useState([]);
    const [doctorProfilePicture, setDoctorProfilePicture] = useState();
    const [file, setFile] = useState();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get("medical_services");
                const serviceNames = response.data.map(service => service.name);
                setServices(serviceNames);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const imageUrl = URL.createObjectURL(file);
        setDoctorProfilePicture(imageUrl);
        console.log(doctorProfilePicture);
    };


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contactNumber: "",
            degreeName: "",
            degreeInstitute: "",
            specialization: "",
            totalExperience: 0,
            doctorFee: 0,
            profilePic: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const imageResponse = await api.post(
                    "image/upload/single",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                console.log("Image Upload Response:", imageResponse.data);

                const imageUrl = imageResponse.data;

                const doctorData = {
                    ...values,
                    profilePic: imageUrl,
                };

                const doctorResponse = await api.post("/doctor", doctorData);

                console.log("Upload Successful:", doctorResponse.data);
                resetForm();
                toast.success("ID Created successfully!");
                handleClose();
            } catch (error) {
                console.error("An error occurred:", error.message);
                toast.error("Error: Failed to Create ID. Please try again later.");
            }
        },

    });
    return (
        <Box>
            <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer", mt: 0.7 }} />
            <Typography sx={{ fontSize: "26px", fontWeight: 500, mb: 2 }}>
                Create Doctor
            </Typography>
            <Box>
                <label htmlFor="avatarInput">
                    <Avatar
                        alt="Doctor Profile"
                        src={doctorProfilePicture}
                        sx={{ width: "100px", height: "100px", cursor: "pointer", margin: "auto" }}
                    />
                </label>
                <input
                    id="avatarInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
                <Box>

                    <Typography sx={{ textAlign: "start" }}>Name</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="name"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.email && formik.errors.name ? (
                            <Typography color="error">{formik.errors.name}</Typography>
                        ) : null}
                    </Box>

                    <Typography sx={{ textAlign: "start" }}>Contact Number</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="contactNumber"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contactNumber}
                        />
                        {formik.touched.email && formik.errors.contactNumber ? (
                            <Typography color="error">{formik.errors.contactNumber}</Typography>
                        ) : null}
                    </Box>

                    <Typography sx={{ textAlign: "start" }}>Degree Institute</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="degreeInstitute"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.degreeInstitute}
                        />
                        {formik.touched.degreeInstitute && formik.errors.degreeInstitute ? (
                            <Typography color="error">{formik.errors.degreeInstitute}</Typography>
                        ) : null}
                    </Box>

                    <Typography sx={{ textAlign: "start" }}>Total Experience</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="totalExperience"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalExperience}
                        />
                        {formik.touched.totalExperience && formik.errors.totalExperience ? (
                            <Typography color="error">{formik.errors.totalExperience}</Typography>
                        ) : null}
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{ textAlign: "start" }}>Email</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="email"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography color="error">{formik.errors.email}</Typography>
                        ) : null}
                    </Box>


                    <Typography sx={{ textAlign: "start" }}>Degree Name</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="degreeName"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.degreeName}
                        />
                        {formik.touched.degreeName && formik.errors.degreeName ? (
                            <Typography color="error">{formik.errors.degreeName}</Typography>
                        ) : null}
                    </Box>



                    <Typography sx={{ textAlign: "start" }}>Specialization</Typography>
                    <Box sx={{ mb: 2, textAlign: "start", }}>
                        <Select
                            name="specialization"
                            variant="standard"
                            fullWidth
                            value={formik.values.specialization}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            displayEmpty
                        >
                            {/* Menu items for showing service name, description, and service fee */}
                            {services.map(service => (
                                <MenuItem key={service} value={service}>{service}</MenuItem>

                            ))}
                        </Select>
                        {formik.touched.specialization && formik.errors.specialization ? (
                            <Typography color="error">{formik.errors.specialization}</Typography>
                        ) : null}
                    </Box>
                    <Typography sx={{ textAlign: "start" }}>Doctor Fee</Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="doctorFee"
                            variant="standard"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.doctorFee}
                        />
                        {formik.touched.doctorFee && formik.errors.doctorFee ? (
                            <Typography color="error">{formik.errors.doctorFee}</Typography>
                        ) : null}
                    </Box>

                </Box>
            </Box>

            <Box>

                <Button
                    onClick={formik.handleSubmit}
                    sx={{
                        width: "100%",
                        borderRadius: "4px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "rgb(240, 187, 55)",
                        mt: 2,
                        mb: 2,
                        "&:hover": {
                            backgroundColor: "rgb(240, 187, 55)",
                        },
                        "&:active": {
                            backgroundColor: "rgb(240, 187, 55)",
                        },
                    }}

                    Add Doctor
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Doctor'}
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default DoctorAuth;
