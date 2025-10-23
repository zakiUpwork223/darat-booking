"use client";
import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PatientsPage.css";
import api from "../../../../lib/services/api";
import CircularProgress from "@mui/material/CircularProgress";

const url = process.env.URL;

const PatientsPage = () => {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get("patient");
        setPatientData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await api.delete(`patient/${id}`);
      setPatientData((prevPatientData) =>
        prevPatientData.filter((patient) => patient.id !== id)
      );
    } catch (error) {
      console.error("An error occurred while deleting:", error.message);
    }
  };

  return (
    <div className="patients-page-container">
      <h1 style={{ color: "rgb(240, 187, 55)" }}>PATIENTS</h1>
      <div className="total-patients">
        Total Patients: {patientData.length}
      </div>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Medical History</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((patient) => (
            <tr key={patient.id} className="patient-row">
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.contactNumber}</td>
              <td>{patient.medicalHistory}</td>
              <td>
                <IconButton
                  onClick={() => handleDelete(patient.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default PatientsPage;
