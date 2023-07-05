import React from "react";
import { FoodDetailModalStyle } from "../food-details/foodDetail-modal/foodDetailModal.style";
import { Modal } from "@mui/material";
import ProductDetailsSection from "../product-details/product-details-section/ProductDetailsSection";
import { Scrollbar } from "../srollbar";

const ModuleModal = (props) => {
  const { open, handleModalClose, productDetailsData, configData } = props;
  return (
    <>
      {productDetailsData && (
        <Modal open={open} onClose={handleModalClose} disableAutoFocus={true}>
          <FoodDetailModalStyle sx={{ bgcolor: "background.paper" }}>
            <Scrollbar style={{ maxHeight: "100%" }}>
              <ProductDetailsSection
                productDetailsData={productDetailsData}
                configData={configData}
                modalmanage
                handleModalClose={handleModalClose}
              />
            </Scrollbar>
          </FoodDetailModalStyle>
        </Modal>
      )}
    </>
  );
};

ModuleModal.propTypes = {};

export default ModuleModal;
