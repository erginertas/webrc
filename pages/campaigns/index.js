import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import CampaignsPage from "../../src/components/Campaigns";
import {getServerSideProps} from '../index'

const Index = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`campaigns - ${configData?.business_name}`} />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CampaignsPage />
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
