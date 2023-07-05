import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import MyOrders from "../../src/components/my-orders";
import MetaData from "../meta-data";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import {getServerSideProps} from "../index";

const Index = ({ configData, landingPageData }) => {
  const router = useRouter();
  return (
    <>
      <MetaData title={`My Orders - ${configData?.business_name}`} />
      <CssBaseline />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData} landingPageData={landingPageData}>
          <MyOrders configData={configData} />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export {getServerSideProps}
