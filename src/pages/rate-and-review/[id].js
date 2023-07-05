import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import MyOrders from "../../src/components/my-orders";
import MetaData from "../meta-data";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import {getServerSideProps} from "../index";
import RateAndReview from "../../src/components/review/RateAndReview";

const Index = ({ configData }) => {
  const router = useRouter();

  return (
    <>
      <MetaData title={`Rate and Review - ${configData?.business_name}`} />
      <CssBaseline />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData}>
          <RateAndReview />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export {getServerSideProps}
