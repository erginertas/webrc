import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import React from "react";
import ParcelOrder from "../../src/components/my-orders/order-details/parcel-order/ParcelOrder";
import OtherOrder from "../../src/components/my-orders/order-details/other-order";
import { useRouter } from "next/router";
import OrderDetails from "../../src/components/my-orders/order-details";
import {getServerSideProps} from "../index";
const index = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData title={`Order details - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <OrderDetails configData={configData} />
      </MainLayout>
    </>
  );
};

export default index;
export {getServerSideProps}
