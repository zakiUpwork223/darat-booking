import api from "../../../../lib/services/api";

export const gettingAllServices = async (values) => {
  try {
    const res = await api.get('medical_services');
    values(res.data);
  } catch (err) {
    console.error("Error fetching menu items:", err);
  }
};

export const getDoctors = async (setDoctors, value) => {
  try {
    const res = await api.post(`/schedule/doctorsOfAService/${value}`);
    setDoctors(res.data);
  } catch (err) {
    console.error("Error fetching menu items:", err);
  }
};

export const availableSlots = async (body, setData) => {
  try {
    const res = await api.post(
      `appointment/appointmentsSlotsOfDoctor`,
      body
    );
    setData(res.data);
  } catch (err) {
    console.error("Error fetching :", err);
  }
};

export const getDoctorById = async (doctorId) => {
  try {
    const res = await api.get(`/doctor/${doctorId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    throw err;
  }
};