import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import StoresWithFilter from "../../src/components/home/stores-with-filter";
import {getServerSideProps} from "../index";

const AllStore = ({ configData, landingPageData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData
        title={`Store On ${configData?.business_name} `}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <StoresWithFilter />
      </MainLayout>
    </>
  );
};

export default AllStore;
export {getServerSideProps}
