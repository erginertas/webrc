import React from "react";
import ForgotPassword from "../../src/components/auth/ForgotPassword/ForgotPassword";
import MetaData from "../meta-data";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {getServerSideProps} from "../index";
const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`Forgot password - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <ForgotPassword />
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
