import React from "react";

import MainLayout from "../../../src/components/layout/MainLayout";
import { CustomContainer } from "../../../src/components/footer/Footer.style";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../../meta-data";
import { NoSsr } from "@mui/material";
import dynamic from "next/dynamic";
import SignIn from "../../../src/components/auth/sign-in";
import {getServerSideProps} from "../../index";
const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`Sign In - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
          <NoSsr>
              <SignIn configData={configData} />
          </NoSsr>
      </MainLayout>
    </>
  );
};

export default index;

export {getServerSideProps}
