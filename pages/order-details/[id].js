import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import React from "react";
import OrderDetails from "../../src/components/my-orders/order-details";
import {getServerSideProps} from "../index";

const index = ({configData, landingPageData}) => {
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Order details - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <OrderDetails configData={configData}/>
            </MainLayout>
        </>
    );
};

export default index;
export {getServerSideProps}
