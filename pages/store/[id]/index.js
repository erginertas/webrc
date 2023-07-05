import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../../src/components/layout/MainLayout";
import {useDispatch} from "react-redux";
import Router from "next/router";
import {setConfigData} from "../../../src/redux/slices/configData";
import StoreDetails from "../../../src/components/store-details";
import {config_api, store_details_api,} from "../../../src/api-manage/ApiRoutes";
import MetaData from "../../meta-data";

const Index = ({configData, storeDetails, landingPageData}) => {
    const dispatch = useDispatch();
    const metaTitle = `${storeDetails?.name} - ${configData?.business_name}`;
    const [isSSR, setIsSSR] = useState(true);


    useEffect(() => {
        setIsSSR(false);
        if (configData) {
            if (configData.length === 0) {
                Router.push("/404");
            } else if (configData?.maintenance_mode) {
                Router.push("/maintainance");
            } else {
                dispatch(setConfigData(configData));
            }
        } else {
        }
    }, [configData]);

    return (
        <>
            {!isSSR && (
                <>
                    <CssBaseline/>
                    <MetaData title={metaTitle}/>
                    <MainLayout configData={configData} landingPageData={landingPageData}>
                        <StoreDetails storeDetails={storeDetails} configData={configData}/>
                    </MainLayout>
                </>
            )}
        </>
    );
};

export default Index;
export const getServerSideProps = async (context) => {
    const storeId = context.query.id;
    const moduleId = context.query.module_id;
    const {req} = context;
    const language = req.cookies.languageSetting

    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${config_api}`,
        {
            method: "GET",
            headers: {
                "X-software-id": 33571750,
                "X-server": "server",
                origin: process.env.NEXT_CLIENT_HOST_URL,
                "X-localization": language,
            },
        }
    );
    const storeDetailsRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${store_details_api}/${storeId}`,
        {
            method: "GET",
            headers: {
                moduleId: moduleId,
                "X-software-id": 33571750,
                "X-server": "server",
                origin: process.env.NEXT_CLIENT_HOST_URL,
                "X-localization": language,
            },
        }
    );
    const landingPageRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
        {
            method: "GET",
            headers: {
                "X-software-id": 33571750,
                "X-server": "server",
                origin: process.env.NEXT_CLIENT_HOST_URL,
                "X-localization": language,
            },
        }
    );
    const landingPageData = await landingPageRes.json();
    const config = await configRes.json();
    const storeDetails = await storeDetailsRes.json();
    return {
        props: {
            configData: config,
            storeDetails: storeDetails,
            landingPageData: landingPageData,
        },
    };
};
