import React from "react";
import ForgotPassword from "../../src/components/auth/ForgotPassword/ForgotPassword";
import MetaData from "../meta-data";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import {getServerSideProps} from "../index";
import {NoSsr} from "@mui/material";

const index = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`Forgot password - ${configData?.business_name}`} />
      <MainLayout configData={configData} landingPageData={landingPageData}>
          <NoSsr>
              <ForgotPassword />
          </NoSsr>
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
