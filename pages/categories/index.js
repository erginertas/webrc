import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import { NoSsr } from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import Wishlists from "../../src/components/wishlist";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Categories from "../../src/components/categories";
import {getServerSideProps} from "../index";
const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <MetaData title={`Categories - ${configData?.business_name}`} />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <Categories configData={configData} t={t} />
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
