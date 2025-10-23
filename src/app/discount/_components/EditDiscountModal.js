import React, { useState, useEffect } from "react";
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
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { editDiscount, getAllItems } from "./apiCalls";


const EditDiscountModal = ({ setOpenModal, discount, setload }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems(setItems);
  }, []);

  return (
    <Formik
      initialValues={{
        expiryDate: moment.utc(discount.expiryDate) || "",
        type: discount.type || "",
        level: discount.level || "",
        value: discount.value || "",
        data: discount.items.map((item) => item.itemId) || [],
      }}
      validationSchema={Yup.object().shape({
        expiryDate: Yup.date().required("Expiry Date is required"),
        value: Yup.string().required("Value is required"),
      })}
      onSubmit={async (values) => {
        try {
          await editDiscount(discount.id, values);
          setload(true);
          setTimeout(() => {
            setOpenModal(false);
          }, 1000);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                Edit Discount
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
                    <InputLabel>Select Items</InputLabel>
                    <Select
                      multiple
                      value={values.data}
                      onChange={(e) => setFieldValue("data", e.target.value)}
                      input={<OutlinedInput label="Select Items" />}
                    >
                      {items.map((item) => (
                        <MenuItem
                          style={{
                            backgroundColor: values.data.includes(item.id)
                              ? "lightgray"
                              : "inherit",
                          }}
                          key={item.id}
                          value={item.id}
                        >
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
                      onChange={(date) => {
                        setFieldValue("expiryDate", date);
                      }}
                      closeOnSelect={true}
                    />
                  </LocalizationProvider>

                  <ErrorMessage name="expiryDate" component="div" />
                </Box>
                <Box>
                  <Field
                    as={TextField}
                    sx={{ width: 200 }}
                    label="Value"
                    type="text"
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
                }} fullWidth
                disabled={isSubmitting}>
                Update Discount
              </Button>
              <ToastContainer />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditDiscountModal;
