"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import * as Yup from "yup"; // Import Yup for validation
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { addDiscount, getAllItems } from "./apiCalls";

const AddDiscountModal = ({ setOpenModal, setload }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems(setItems);
  }, []);

  return (
    <Formik
      initialValues={{
        expiryDate: moment(),
        type: "PERCENTAGE",
        level: "ITEM",
        value: "",
        data: [],
      }}
      validationSchema={Yup.object().shape({
        expiryDate: Yup.date().required("Expiry Date is required"),
        value: Yup.string().required("Value is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Submitting form with values:", values);
        try {
          await addDiscount(values);
          setload(true)

          console.log("Discount added successfully!");
          setTimeout(() => {
            setOpenModal(false);
          }, 1000);
        } catch (error) {
          console.error("Error adding discount:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}>
              <CloseIcon onClick={() => setOpenModal(false)} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 5,
                p: 2,
                height: "70vh",
                borderRadius: "12px",
              }}
            >
              <Typography variant="h6" textAlign="center">
                Add Discount
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 2,
                }}
              >
                <Box>
                  <FormControl sx={{ m: 1, width: 400 }}>
                    <InputLabel>Select Items </InputLabel>
                    <Select
                      multiple
                      value={values.data}
                      onChange={(e) => setFieldValue("data", e.target.value)}
                      input={<OutlinedInput label="Select Items" />}
                    >
                      {items.map((item) => (
                        <MenuItem style={{
                          backgroundColor: values.data.includes(item.id) ? "lightgray" : 'inherit', // Change color if item is selected
                        }} key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 2,
                }}
              >
                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{ width: 200 }}
                      label="Expiry Date"
                      name="expiryDate"
                      value={values.expiryDate}
                      onChange={(date) => setFieldValue("expiryDate", date)}
                      closeOnSelect={true}
                    />
                  </LocalizationProvider>

                  <ErrorMessage name="expiryDate" component="div" />
                </Box>
                <Box>
                  <Field
                    as={TextField}
                    sx={{ width: 200 }}
                    label="Percentage"
                    type="number"
                    name="value"
                  />
                  <ErrorMessage name="value" component="div" />
                </Box>
              </Box>

              <Button 
              type="submit"
              sx={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "rgb(240, 187, 55)",
                "&:hover": {
                  backgroundColor: "rgb(240, 187, 55)",
                },
              }} fullWidth disabled={isSubmitting}>
                Create Discount
                
              </Button>
              <ToastContainer />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddDiscountModal;
