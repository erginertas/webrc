import {getServerSideProps} from "../index";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import dynamic from "next/dynamic";
const index = ({ configData }) => {
  const TrackOrder = dynamic(() => import("../../src/components/track-order"), {
    ssr: false,
  });
  return (
    <>
      <CssBaseline />
      <MetaData title={`Track your order - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <TrackOrder configData={configData} />
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
