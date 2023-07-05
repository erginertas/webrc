import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import { CustomContainer } from "../../src/components/footer/Footer.style";
import OrderSuccessPage from "../../src/components/order-success-page";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import {getServerSideProps} from "../index";
const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`Order - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <OrderSuccessPage configData={configData} />
      </MainLayout>
    </>
  );
};

index.propTypes = {};

export default index;
export {getServerSideProps}
