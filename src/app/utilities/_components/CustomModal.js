import React from 'react'
import { Modal, Box } from '@mui/material'
import {CloseIcon} from '@mui/material/Icon'

const CustomModal = ({ setOpenModal, open, children }) => {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to clone each child element and pass additional props
  const renderChildrenWithProps = () => {
    return React.Children.map(children, child => {
      // Check if the child is a valid React element
      if (React.isValidElement(child)) {
        // Clone the child element and pass additional props
        return React.cloneElement(child, { setOpenModal });
      }
      return child;
    });
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
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
        <Box display="flex" justifyContent="center">
          {renderChildrenWithProps()}
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal;
