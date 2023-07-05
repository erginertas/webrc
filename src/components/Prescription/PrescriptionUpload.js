import React, { useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { DeliveryCaption } from "../checkout/CheckOut.style";
import { t } from "i18next";
import MultiFileUploader from "../multi-file-uploader/MultiFileUploader";
const acceptedFileInputFormat =
  "application/pdf,image/*,text/plain,.doc, .docx,.txt";
const supportedFormatMultiImages = [
  "jpg",
  "jpeg",
  "gif",
  "png",
  "pdf",
  "doc",
  "docx",
  "deb",
];

const PrescriptionUpload = ({ setPrescriptionImages, prescriptionImages }) => {
  const fileImagesHandler = (files) => {
    setPrescriptionImages(files);
  };

  return (
    <CustomPaperBigCard>
      <DeliveryCaption const id="demo-row-radio-buttons-group-label">
        {t("Prescriptions")}
      </DeliveryCaption>
      <MultiFileUploader
        fileImagesHandler={fileImagesHandler}
        totalFiles={prescriptionImages}
        maxFileSize={20000000}
        supportedFileFormats={supportedFormatMultiImages}
        acceptedFileInputFormat={acceptedFileInputFormat}
        labelText={t("File Upload")}
        prescription="true"
      />
    </CustomPaperBigCard>
  );
};

export default PrescriptionUpload;
