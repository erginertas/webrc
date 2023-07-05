import React, { useEffect } from "react";
import { CustomHeader } from "../../src/api-manage/Headers";
import { useTranslation } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import HelpAndSupport from "../../src/components/help-and-support";
import RefundPolicy from "../../src/components/policy-page";
import PolicyPage from "../../src/components/policy-page";
import useGetPolicyPage from "../../src/api-manage/hooks/react-query/useGetPolicyPage";
import { CustomStackFullWidth } from "../../src/styled-components/CustomStyles.style";
import { Skeleton } from "@mui/material";
import {getServerSideProps} from "../index";
const Index = ({ configData }) => {
  const { t } = useTranslation();
  const { data, refetch, isFetching } = useGetPolicyPage("/refund");
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <CssBaseline />
      <MetaData title={`Refund policy - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <PolicyPage
          data={data}
          title={t("Refund Policy")}
          isFetching={isFetching}
        />
      </MainLayout>
    </>
  );
};

export default Index;
export {getServerSideProps}
