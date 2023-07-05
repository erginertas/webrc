import {LandingLayout} from "../src/components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setConfigData} from "../src/redux/slices/configData";
import Router from "next/router";
import MetaData from "./meta-data";
import useGetLandingPage from "../src/api-manage/hooks/react-query/useGetLandingPage";

const Root = (props) => {
    const {configData} = props;
    const {data, refetch} = useGetLandingPage()
    const dispatch = useDispatch();
    useEffect(() => {
        if (configData) {
            refetch()
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
            <CssBaseline/>
            <MetaData title={`${configData?.business_name}`}/>
            {
                data && <LandingLayout configData={configData} landingPageData={data}>
                    <LandingPage
                        configData={configData}
                        landingPageData={data}
                    />
                </LandingLayout>
            }

        </>
    );
};
export default Root;
export const getServerSideProps = async (context) => {
    const {req} = context;
    const language = req.cookies.languageSetting
    const configRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
        {
            method: "GET",
            headers: {
                "X-software-id": 33571750,
                "X-server": "server",
                "X-localization": language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
        }
    );
    const config = await configRes.json();
    const landingPageRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
        {
            method: "GET",
            headers: {
                "X-software-id": 33571750,
                "X-server": "server",
                "X-localization": language,
                origin: process.env.NEXT_CLIENT_HOST_URL,
            },
        }
    );
    const landingPageData = await landingPageRes.json();
    return {
        props: {
            configData: config,
            landingPageData: landingPageData,
        },
    };
};
