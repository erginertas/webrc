import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import PolicyPage from "../../src/components/policy-page";
import useGetPolicyPage from "../../src/api-manage/hooks/react-query/useGetPolicyPage";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const {data, refetch, isFetching} = useGetPolicyPage("/terms-and-conditions");
    useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <CssBaseline/>
            <MetaData title={`Terms And Conditions - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <PolicyPage
                    data={data}
                    title={t("Terms And Conditions")}
                    isFetching={isFetching}
                />
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
