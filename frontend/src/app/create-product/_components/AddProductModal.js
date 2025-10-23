"use client";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import CreateProduct from "./CreateProduct";

const AddProductModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          float: "right",
          backgroundColor: "rgb(240, 187, 55)",
          fontWeight: 600,
          fontSize: "16px",
          textTransform: "capitalize",
          color: "white",
          width: "150px",
          "&:hover": { backgroundColor: "rgb(240, 187, 55)" },
        }}
      >
        Add Product
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 2,
          }}
        >
          <CreateProduct handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddProductModal;
