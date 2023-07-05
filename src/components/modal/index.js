import React from "react";
import { Dialog, Modal, styled } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
const CustomModal = (props) => {
  const { openModal, handleClose, disableAutoFocus, children } = props;
  const handleCloseModal = (event, reason) => {
    if (reason && reason == "backdropClick") {
      if (disableAutoFocus) {
        return;
      } else {
        handleClose?.();
      }
    } else {
      handleClose?.();
    }
  };
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      {children}
    </Dialog>
  );
};

CustomModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CustomModal;
