"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  Modal,
  Typography,
  Box,
  CardActions,
  TextField,
  Avatar,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import AddDoctorModal from "./AddDoctorModal";
import api from "../../../../lib/services/api";
import MenuFile from "../../utilities/_components/MenuFile";
import CircularProgress from "@mui/material/CircularProgress";

const DoctorsPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddDoctorModal, setOpenAddDoctorModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [error, setError] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    degreeName: "",
    degreeInstitute: "",
    specialization: "",
    totalExperience: 0,
    doctorFee: 0,
  });

  const fetchDoctorData = async () => {
    try {
      const response = await api.get("doctor");
      setDoctor(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    setIsClient(true); 
    if (isClient) {
      fetchDoctorData();
    }
  }, [isClient]);


  const handleOpenUpdateModal = (doctor) => {
    setSelectedDoctor(doctor);
    setUpdateFormData({
      name: doctor.name,
      email: doctor.email,
      contactNumber: doctor.contactNumber,
      degreeName: doctor.degreeName,
      degreeInstitute: doctor.degreeInstitute,
      specialization: doctor.specialization,
      totalExperience: doctor.totalExperience,
      doctorFee: doctor.doctorFee,
    });
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    handleCloseMenu();
  };

  const handleUpdateFormDataChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await api.patch(
        `doctor/${selectedDoctor.id}`,
        updateFormData
      );
      setDoctor((prevDoctor) =>
        prevDoctor.map((doc) =>
          doc.id === selectedDoctor.id ? { ...doc, ...updateFormData } : doc
        )
      );
      console.log("Doctor updated:", response.data);
      setUpdateModalOpen(false);
      handleCloseMenu();
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`doctor/${id}`);
      setDoctor((prevDoctor) => prevDoctor.filter((doc) => doc.id !== id));
      console.log("Doctor deleted:", id);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleCancel = () => {
    setUpdateModalOpen(false);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 2 }}
      >
        <Typography
          style={{
            fontWeight: 600,
            color: "rgb(240, 187, 55)",
            fontFamily: "Arial",
            fontSize: "35px",
          }}
        >
          DOCTORS
        </Typography>
        <Box>
          <AddDoctorModal
            open={openAddDoctorModal}
            handleClose={() => setOpenAddDoctorModal(false)}
            refreshDoctorData={fetchDoctorData} // Pass the fetchDoctorData function
          />
        </Box>
      </Box>
      <Grid container spacing={3} mt={2}>
        {doctor.map((doctor) => (
          <Grid item key={doctor.id} xs={12} sm={6} md={4}>
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
                  right: -10,
                  zIndex: 1,
                }}
              >
                <MenuFile
                  onClickDelete={() => handleDelete(doctor.id)}
                  onClickEdit={() => handleOpenUpdateModal(doctor)}
                  onClose={handleCloseMenu}
                />
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding="10px 20px"
                gap="5px"
              >
                <Avatar
                  style={{
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: 100,
                    height: 100,
                    margin: "auto",
                  }}
                  src={doctor.profilePic}
                  alt={doctor.name}
                />
                <Typography variant="body2" gutterBottom>
                  {doctor.name}
                </Typography>
                <Typography gutterBottom variant="body2">
                  {doctor.degreeInstitute} / {doctor.degreeName}
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
                  {doctor.specialization}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Experience:</b> {doctor.totalExperience} Years
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Doctor Fee:</b> {doctor.doctorFee}
                </Typography>
                <Box
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    startIcon={<EmailIcon sx={{ fontSize: "10px" }} />}
                    sx={{
                      fontSize: "10px",
                      textTransform: "none",
                      color: "goldenrod",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {doctor.email}
                  </Button>
                  <Button
                    startIcon={<CallIcon sx={{ fontSize: "10px" }} />}
                    sx={{
                      fontSize: "10px",
                      textTransform: "none",
                      color: "goldenrod",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {doctor.contactNumber}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}
      <Modal open={updateModalOpen} onClose={handleCloseUpdateModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "470px",
            height:"70vh",
            boxShadow: 24,
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            textAlign: "center",
            overflowY: "auto", // Set overflowY to "auto" to enable vertical scrolling
            maxHeight: "calc(97vh - 40px)", // Adjust maxHeight to ensure modal fits within viewport
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "600",mt:2 }}>
            Edit Doctor
          </Typography>
          <Box mt={4}>
            <TextField
              label="Name"
              value={updateFormData.name} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="name"
              sx={{ width: 200 }}
              margin="normal"
            />
            <TextField
              label="Email"
              value={updateFormData.email} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="email"
              sx={{ width: 200, ml:2}}
              margin="normal"
            />
            <TextField
              label="Number"
              value={updateFormData.contactNumber} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="contactNumber"
              sx={{ width: 200 }}
              margin="normal"
            />
            <TextField
              label="Institute"
              value={updateFormData.degreeInstitute} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="degreeInstitute"
              sx={{ width: 200, ml:2}}
              margin="normal"
            />
            <TextField
              label="Degree"
              value={updateFormData.degreeName} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="degreeName"
              sx={{ width: 200 }}
              margin="normal"
            />
            <TextField
              label="Specialization"
              value={updateFormData.specialization} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="specialization"
              sx={{ width: 200, ml:2}}
              margin="normal"
            />
            <TextField
              label="Experience"
              value={updateFormData.totalExperience} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="totalExperience"
              sx={{ width: 200 }}
              margin="normal"
            />
            <TextField
              label="Degree Fee"
              value={updateFormData.doctorFee} // Changed defaultValue to value
              onChange={handleUpdateFormDataChange} // Added onChange
              name="doctorFee"
              sx={{ width: 200, ml:2}}
              margin="normal"
            />
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-evenly",
                gap: "20px",
              }}
            >
              <Button
                onClick={handleUpdate}
                type="submit"
                size="large"
                
                sx={{
                  color: "white",
                  width: "180px",
                  textTransform: "capitalize",
                  backgroundColor: "rgb(240, 187, 55)",
                  "&:hover": { backgroundColor: "rgb(240, 187, 55)" },
                }}
              >
                Update
              </Button>
              <Button
                onClick={handleCancel}
                size="large"
                
                sx={{
                  color: "white",
                  width: "180px",
                  textTransform: "capitalize",
                  backgroundColor: "rgb(240, 187, 55)",
                  "&:hover": { backgroundColor: "rgb(240, 187, 55)" },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
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
    </div>
  );
};

export default DoctorsPage;
