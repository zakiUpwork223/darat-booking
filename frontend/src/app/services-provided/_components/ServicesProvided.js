"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Card, CardContent, Modal, TextField, Button, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/services/api';
import AddServiceModal from '@/app/create-service/_components/AddServiceModal';
import CloseIcon from "@mui/icons-material/Close";
import MenuFile from '@/app/utilities/_components/MenuFile';
import CircularProgress from "@mui/material/CircularProgress";

export default function ServicesProvided() {
    const Router = useRouter();
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAddDoctorModal, setOpenAddDoctorModal] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        description: '',
        serviceFee: 0,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            async function fetchData() {
                try {
                    const response = await api.get('medical_services');
                    setServices(response.data);
                    setLoading(false);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching services:', error);
                    setError('Failed to fetch services');
                }
            }
            fetchData();
        }
    }, []);

    const handleOpenUpdateModal = (service) => {
        setSelectedService(service);
        setUpdateFormData({
            name: service.name,
            description: service.description,
            serviceFee: service.serviceFee,
        });
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedService(null);
    };

    const handleUpdateFormDataChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await api.patch(
                `medical_services/${selectedService.id}`,
                updateFormData
            );
            console.log('Service updated:', response.data);
            handleCloseUpdateModal();
            fetchData();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };
    const handleDelete = async (serviceId) => {
        try {
            const response = await api.delete(`medical_services/${serviceId}`);
            console.log('Service deleted:', response.data);
            setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };
    const handleClose = () => {
        handleCloseUpdateModal();

    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };



    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography style={{
                    fontWeight: 600,
                    color: "rgb(240, 187, 55)",
                    fontFamily: "Arial",
                    fontSize: "35px",
                }}>
                    SERVICES
                </Typography>
                <AddServiceModal
                    open={openAddDoctorModal}
                    handleClose={() => setOpenAddDoctorModal(false)}
                />
            </Box>
            <Container maxWidth="md">
                <Box mt={5} mb={10}>
                    <Grid container spacing={3}>
                        {services.map((service) => (
                            <Grid item key={service.id} xs={12} sm={6} md={4}>
                                <Card sx={{ position: 'relative', maxWidth: 345, cursor: 'pointer', height: "330px" }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={service.picture}
                                        alt={service.name}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            zIndex: 1, // Ensure the menu appears above the card
                                        }}
                                    >
                                        <MenuFile
                                            onClickDelete={() => handleDelete(service.id)}
                                            onClickEdit={() => handleOpenUpdateModal(service)}
                                            onClose={handleCloseMenu}
                                        />
                                    </Box>
                                    {/* <img src={service.picture} alt="Service" style={{ width: '100%', height: '200px', objectFit: 'cover', marginTop: '10px' }} /> */}
                                    <CardContent>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {service.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
                                            {service.description}
                                        </Typography>
                                        {/* <Typography variant="body1" component="p">
                                            Service Fee: ${service.serviceFee}
                                        </Typography> */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {error && (
                        <Typography variant="body1" color="error" align="center">
                            {error}
                        </Typography>
                    )}
                </Box>
                {/* Update Modal */}
                <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400, borderRadius: "10px" }}>
                        <CloseIcon onClick={handleClose} sx={{ float: "right", cursor: "pointer" }} />
                        <Typography variant="h6" gutterBottom>
                            Update Service
                        </Typography>
                        <TextField label="Name" name="name" value={updateFormData.name} onChange={handleUpdateFormDataChange} fullWidth sx={{ mt: 3 }} />
                        <TextField label="Description" name="description" value={updateFormData.description} onChange={handleUpdateFormDataChange} fullWidth sx={{ mt: 3 }} />
                        {/* <TextField label="Service Fee" name="serviceFee" type="number" value={updateFormData.serviceFee} onChange={handleUpdateFormDataChange} fullWidth sx={{ mt: 3 }} /> */}
                        <Button
                            onClick={handleUpdate}
                            fullWidth
                            sx={{
                                mt: 5,
                                color: "white",
                                fontWeight: "bold",
                                backgroundColor: "rgb(240, 187, 55)",
                                "&:hover": {
                                    backgroundColor: "rgb(240, 187, 55)",
                                },
                            }}
                        >
                            Update
                        </Button>

                    </Box>
                </Modal>
            </Container >
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
        </>
    );
}
