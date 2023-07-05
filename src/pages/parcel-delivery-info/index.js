import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import PercelDelivery from "../../src/components/parcel/parcel-delivery-info-component/ParcelDelivary";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import { NoSsr } from "@mui/material";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData
        title={`Parcel Deliver information - ${configData?.business_name}`}
      />
      <MainLayout configData={configData}>
        <NoSsr>
          <PercelDelivery configData={configData} />
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
