import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../lib/services/api";

export const createSchedule = (values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await api.post(
        'schedule',
        values
      );

      if (res.status === 201) {
        resolve(true);
        toast.success("Your schedule has been created successfully");
      } else {
        reject(res?.data?.error);
      }
    } catch (err) {
      if (
        err.response.data.statusCode === 400 &&
        err.response.data.message[0] === "weekday should not be empty"
      ) {
        toast.warn(err.response.data.message[0]);
      } else if (
        err.response.data.statusCode === 400 &&
        err.response.data.message ===
        "Time slot overlaps with existing schedule"
      ) {
        // toast.warn(err.response.data.message)
        toast.warn("Time slot overlaps with existing schedule");
      } else if (err.response.data.statusCode === 409) {
        toast.warn(err.response.data.message);
      }
    }
  });
};

export const fetchDoctor = async (setDoctors, setCopyOfDoctors) => {
  try {
    const response = await api.get('doctor');

    setDoctors(response.data);
    setCopyOfDoctors(response.data);
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export const fetchServices = async (setServices) => {
  try {
    const response = await api.get('medical_services');
    setServices(response.data);
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export const getAllSchedule = async (setData) => {
  try {
    const response = await api.get('schedule');
    setData(response.data);
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export const individualDoctorSchedule = async (setData, id) => {
  try {
    const response = await api.get('schedule');
    setData(response.data.filter((data) => data.doctor === id));
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
}

export const deleteSchedule = async (id) => {
  try {
    await api.delete(`schedule/${id}`);
    toast.success("Your schedule has been deleted successfully");
  } catch (error) {
    console.error("Error deleting schedule:", error);
  }
}

export const updateSchedule = async (id, values) => {
  try {
    await api.patch(`schedule/${id}`, values);
    toast.success("Your schedule has been updated successfully");
  }
  catch (error) {
    console.error("Error updating schedule:", error);
  }
}