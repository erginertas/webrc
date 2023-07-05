import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import MyOrders from "../../src/components/my-orders";
import MetaData from "../meta-data";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import ReviewPage from "../../src/components/review";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MetaData title={`Review - ${configData?.business_name}`} />
      <CssBaseline />
      <AuthGuard from={router.pathname.replace("/", "")}>
        <MainLayout configData={configData}>
          <ReviewPage id={id} />
        </MainLayout>
      </AuthGuard>
    </>
  );
};

export default Index;
export {getServerSideProps}
