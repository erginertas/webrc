import { LandingLayout } from "../src/components/layout/LandingLayout";
import LandingPage from "../src/components/landing-page";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigData } from "../src/redux/slices/configData";
import Router from "next/router";
import MetaData from "./meta-data";
import ScrollToTop from "../components/ScrollToTop";

const Root = (props) => {
  const { configData, landingPageData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (configData) {
      if (configData.length === 0) {
        Router.push("/404");
      }
      else if(configData?.maintenance_mode){
          Router.push("/maintainance");
      }
      else {
        dispatch(setConfigData(configData));
      }
    } else {
    }
  }, [configData]);
  useEffect(() => {
    dispatch(setConfigData(configData));
  }, [configData]);

  return (
    <>
      <CssBaseline />
      <MetaData title={`${configData?.business_name}`} />
      <LandingLayout configData={configData}>
        <LandingPage
          configData={configData}
          landingPageData={landingPageData}
        />
      </LandingLayout>
    </>
  );
};
export default Root;
export const getServerSideProps = async () => {
  // const config = await ConfigApi.config()
  // const landingPageData = await landingPageApi.getLandingPageImages()
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
      },
    }
  );
  const config = await configRes.json();
  const landingPageRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/landing-page`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
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
