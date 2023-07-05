import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ModuleWiseLayout from "../../src/components/module-wise-layout";
import Router from "next/router";
import { setConfigData } from "../../src/redux/slices/configData";
import ZoneGuard from "../../src/components/route-guard/ZoneGuard";
import MetaData from "../meta-data";
import {getServerSideProps} from "../index";
const Home = ({ configData }) => {
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
  return (
    <>
      <CssBaseline />
      <MetaData
        title={
          configData ? `Home - ${configData?.business_name}` : "Loading..."
        }
        ogImage={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
      />
      <MainLayout configData={configData}>
        <ModuleWiseLayout configData={configData} />
      </MainLayout>
    </>
  );
};

export default Home;
Home.getLayout = (page) => <ZoneGuard>{page}</ZoneGuard>;
export {getServerSideProps}
