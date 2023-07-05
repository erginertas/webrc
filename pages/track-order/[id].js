import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import {getServerSideProps} from "../index";
import TrackOrder from "../../src/components/track-order";
import {NoSsr} from "@mui/material";

const index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Track your order - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    <TrackOrder configData={configData}/>
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default index;
export {getServerSideProps}
