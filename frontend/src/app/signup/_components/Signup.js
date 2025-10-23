"use client";
import React, { useState } from "react";
import { Typography, Box, Button, TextField, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import api from "../../../../lib/services/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSearchParams } from "next/navigation";

const Signup = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const value = searchParams.get("name");
    const [showPassword, setShowPassword] = useState(true);
    const [patientProfilePicture, setPatientProfilePicture] = useState();
    const [file, setFile] = useState();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const imageUrl = URL.createObjectURL(file);
        setPatientProfilePicture(imageUrl);
    };

    const clickhandle = () => {
        router.push("/login");
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        contactNumber: Yup.string()
            .matches(
                /^[\d+_]+$/,
                "Contact number must contain only digits, '+' or '_'"
            )
            .required("Contact number is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
            ),
    });

    const formik = useFormik({
        initialValues: {
            profilePic: "",
            name: "",
            email: value,
            contactNumber: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (data, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("image", file);

                const imageResponse = await api.post(
                    "image/upload/single",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log("Image Upload Response:", imageResponse.data);

                const imageUrl = imageResponse.data;

                const patientData = {
                    ...data,
                    profilePic: imageUrl,
                };

                const response = await api.post("patient", patientData);
                console.log(response.data);
                if (typeof window !== 'undefined') {
                    localStorage.setItem("userEmail", data.email);
                    router.push("/otp");
                }
                resetForm();
                toast.success("Sign up successful!");
            } catch (error) {
                console.error("An error occurred:", error.message);
                toast.error("Error: Failed to sign up. Please try again later.");
            }
        },
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
                textAlign: "center",
            }}
        >
            <Typography sx={{ fontSize: "64px", fontWeight: 500, mb: 2 }}>
                Sign Up
            </Typography>
            <Typography>
                Already a member?{" "}
                <span
                    onClick={clickhandle}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                    Log In
                </span>{" "}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <label htmlFor="avatarInput">
                    <Avatar
                        alt="Patient Profile"
                        src={patientProfilePicture}
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
            <Box sx={{ width: "300px" }}>
                <Typography sx={{ textAlign: "start" }}>Name</Typography>
                <Box sx={{ mb: 1 }}>
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

                <Typography sx={{ textAlign: "start" }}>Email</Typography>
                <Box sx={{ mb: 1 }}>
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

                <Typography sx={{ textAlign: "start" }}>Contact Number</Typography>
                <Box sx={{ mb: 1 }}>
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

                <Typography sx={{ textAlign: "start" }}>Password</Typography>
                <Box sx={{ mb: 1, position: "relative" }}>
                    <TextField
                        name="password"
                        variant="standard"
                        fullWidth
                        type={showPassword ? "password" : "text"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <VisibilityIcon
                        sx={{
                            position: "absolute",
                            right: "5px",
                            top: "35%",
                            transform: "translateY(-50%)",
                            border: "none",
                            cursor: "pointer",
                            color: "gray",
                        }}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </VisibilityIcon>
                    {formik.touched.password && formik.errors.password ? (
                        <Typography color="error">{formik.errors.password}</Typography>
                    ) : null}
                </Box>
            </Box>

            <Box>
                <Button
                    onClick={formik.handleSubmit}
                    sx={{
                        width: "303px",
                        border: "1px solid black",
                        borderRadius: "4px",
                        color: "black",
                        mt: 2,
                        fontSize: "18px",
                        textTransform: "capitalize",
                        "&:hover": {
                            backgroundColor: "white",
                        },
                        "&:active": {
                            backgroundColor: "white",
                        },
                    }}
                >
                    Sign up
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Signup;
