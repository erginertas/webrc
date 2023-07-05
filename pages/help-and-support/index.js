import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import HelpAndSupport from "../../src/components/help-and-support";
import {useTranslation} from "react-i18next";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Help and support - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <HelpAndSupport configData={configData} t={t}/>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
