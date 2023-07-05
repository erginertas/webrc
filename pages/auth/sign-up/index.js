import React from "react";
import SignIn from "../../../src/components/auth/sign-in";
import MainLayout from "../../../src/components/layout/MainLayout";
import { CustomContainer } from "../../../src/components/footer/Footer.style";

import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../../meta-data";
import dynamic from "next/dynamic";
import {getServerSideProps} from "../../index";

const index = ({ configData, landingPageData }) => {
  const SignUp = dynamic(
    () => import("../../../src/components/auth/sign-up/SignUp"),
    {
      ssr: false,
    }
  );
  return (
    <>
      <CssBaseline />
      <MetaData title={`Sign Up - ${configData?.business_name}`} />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <SignUp />
      </MainLayout>
    </>
  );
};

export default index;

export {getServerSideProps}
