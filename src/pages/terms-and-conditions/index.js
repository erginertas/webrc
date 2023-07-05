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

const Index = ({ configData }) => {
    const { t } = useTranslation();
    const { data, refetch, isFetching } = useGetPolicyPage("/terms-and-conditions");
    useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <CssBaseline />
            <MetaData title={`Terms And Conditions - ${configData?.business_name}`} />
            <MainLayout configData={configData}>
                <PolicyPage
                    data={{value:data}}
                    title={t("Terms And Conditions")}
                    isFetching={isFetching}
                />
            </MainLayout>
        </>
    );
};

export default Index;
export const getServerSideProps = async () => {
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: "GET",
            headers: CustomHeader,
        }
    );
    const config = await configRes.json();
    return {
        props: {
            configData: config,
        },
    };
};
