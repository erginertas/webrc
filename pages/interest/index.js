import React from "react";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import InterestOptions from "../../src/components/interest/InterestOptions";
import {getServerSideProps} from '../index'

const Index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <InterestOptions configData={configData}/>
            </MainLayout>
        </>
    );
};

export default Index;
Index.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;
export {getServerSideProps}
