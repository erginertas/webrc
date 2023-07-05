import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import TypeWiseStore from "../../../src/components/Store/TypeWiseStore";
import MetaData from "../../meta-data";
import MainLayout from "../../../src/components/layout/MainLayout";
import {getServerSideProps} from "../../index";

const Index = ({ configData, landingPageData }) => {
  const { t } = useTranslation();
  const router = useRouter();
    const newText = t("New On");
  return (
    <>
      <CssBaseline />
      <MetaData
        title={`${newText} ${configData?.business_name} `}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <TypeWiseStore
          configData={configData}
          t={t}
          storeType="latest"
          title={`${newText} ${configData?.business_name} `}
        />
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
