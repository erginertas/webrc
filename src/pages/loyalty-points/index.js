import { useTranslation } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import { NoSsr } from "@mui/material";
import UserLayout from "../../src/components/layout/UserLayout";
import Wallet from "../../src/components/wallet";
import React from "react";
import LoyaltyPoints from "../../src/components/loyalty-points";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import { useRouter } from "next/router";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <MetaData title={`Loyalty points - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <NoSsr>
          <AuthGuard from={router.pathname.replace("/", "")}>
            <UserLayout
              component={<LoyaltyPoints configData={configData} t={t} />}
              configData={configData}
              t={t}
            />
          </AuthGuard>
        </NoSsr>
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
