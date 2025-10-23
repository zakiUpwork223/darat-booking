"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik';
import * as Yup from 'yup';


const underlineStyle = {
    '& .MuiInput-underline:after': {
        borderBottomColor: 'blue',
    },
};


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[+\d()-]*$/, 'Phone number must be valid')
        .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
});


function Contact() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            subject: '',
            message: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm();
        },
    });

    const boxStyle = {
        padding: 30,
    };

    return (
        <Box sx={{ mt: 7 }}>
            <Box sx={{
                width: "100%",
                backgroundPosition: 'center',
                backgroundSize: "cover",
                backgroundImage: 'url("/contact.webp")',
                textAlign: "center",
                alignItems: "center",
                height: '150px',
                fontSize: "40px",
                fontWeight: 700,
                color: "white",
                pt: 10,
            }}>
                Contact Us
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ width: { xl: "90%", lg: "90%", md: "90%", sm: "90%", xs: "100%" }, margin: { xl: "auto", lg: "auto", md: "auto", sm: "auto" } }}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Box style={boxStyle}>

                        {/* Contact Information */}
                        <Box>
                            <Typography sx={{ fontSize: { xl: "30px", lg: "30px", md: "24px", sm: "20px", xs: "18px" }, fontWeight: 600 }}>CONTACT INFO</Typography>

                            {/* Contact Details */}
                            <Box sx={{}}>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "18x", lg: "16px", md: "14px", sm: "14px", xs: "12px" }, fontWeight: 600 }} >Address:</Typography>
                                    <Typography sx={{ fontSize: { xl: "14px", lg: "14px", md: "12px", sm: "12px", xs: "10px" }, mt: "2px" }}> Dr.Wafaa Tulba Medical Center, قداد بن عمار، Al Madinah Al Munawwarah Saudi Arabia</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "18x", lg: "16px", md: "14px", sm: "14px", xs: "12px" }, fontWeight: 600 }} >Phone:</Typography>
                                    <Typography sx={{ fontSize: { xl: "14px", lg: "14px", md: "12px", sm: "12px", xs: "10px" }, mt: "2px" }}>014855550</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "18x", lg: "16px", md: "14px", sm: "14px", xs: "12px" }, fontWeight: 600 }} >Whatsapp:</Typography>
                                    <Typography sx={{ fontSize: { xl: "14px", lg: "14px", md: "12px", sm: "12px", xs: "10px" }, mt: "2px" }}>053 221 5986</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "18x", lg: "16px", md: "14px", sm: "14px", xs: "12px" }, fontWeight: 600 }} >email:</Typography>
                                    <Typography sx={{ fontSize: { xl: "14px", lg: "14px", md: "12px", sm: "12px", xs: "10px" }, mt: "2px" }}>info@drwafaa.com</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: { xl: "30px", lg: "30px", md: "24px", sm: "20px", xs: "18px" }, fontWeight: 600, mt :2 }}>OPENING HOURS</Typography>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "24px", lg: "24px", md: "20px", sm: "16px", xs: "16px" } }} >Saturday to Thursday:</Typography>
                                    <Typography sx={{ fontSize: { xl: "18px", lg: "18px", md: "14px", sm: "12px", xs: "12px" }, mt : 0.8 }}>10:00 am - 10:00 pm</Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontSize: { xl: "24px", lg: "24px", md: "20px", sm: "16px", xs: "16px" } }} >Friday:</Typography>
                                    <Typography sx={{ fontSize: { xl: "18px", lg: "18px", md: "14px", sm: "12px", xs: "12px" }, mt : 0.8 }}>Closed</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>


                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}> 
                    {/* Form Section */}
                    <Box sx={{ mt: { xl: 0, lg: 0, md: 0, sm: 0, xs: 5 }, padding: 1, }}>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>Name</Typography>
                                <TextField
                                    name="name"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ style: underlineStyle }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <Typography color="error">{formik.errors.name}</Typography>
                                ) : null}
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>Email</Typography>
                                <TextField
                                    name="email"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ style: underlineStyle }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <Typography color="error">{formik.errors.email}</Typography>
                                ) : null}
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>Phone</Typography>
                                <TextField
                                    name="phone"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ style: underlineStyle }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <Typography color="error">{formik.errors.phone}</Typography>
                                ) : null}
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>Address</Typography>
                                <TextField
                                    name="address"
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ style: underlineStyle }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <Typography color="error">{formik.errors.address}</Typography>
                                ) : null}
                            </Box>

                        </Box>

                        <Box>
                            <Typography sx={{ fontWeight: 600, mt : 3 }}>Subject</Typography>
                            <TextField
                                name="subject"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={1}
                                InputProps={{ style: underlineStyle }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject}
                            />
                            {formik.touched.subject && formik.errors.subject ? (
                                <Typography color="error">{formik.errors.subject}</Typography>
                            ) : null}
                        </Box>

                        <Box>
                            <Typography sx={{ fontWeight: 600, mt : 3 }}>Message</Typography>
                            <TextField
                                name="message"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={1}
                                InputProps={{ style: underlineStyle }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            {formik.touched.message && formik.errors.message ? (
                                <Typography color="error">{formik.errors.message}</Typography>
                            ) : null}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 } }>

                            <Button
                                onClick={formik.handleSubmit}
                                sx={{
                                    backgroundColor: "#C9861B",
                                    color: "#FFFFFF",
                                    width: "190px",
                                    height: "56px",
                                    mb: 10,
                                    borderRadius: "8px",
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: "#C9861B",
                                    },
                                    '&:first-letter': {
                                        textTransform: 'uppercase'
                                    }
                                }}
                            >Submit</Button>
                        </Box>
                    </Box>
                </Grid >
            </Grid >
        </Box >
    );
}

export default Contact;
