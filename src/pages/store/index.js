import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import StoresWithFilter from "../../src/components/home/stores-with-filter";
import {getServerSideProps} from "../index";
const AllStore = ({ configData }) => {
  return (
    <>
      <CssBaseline />
      <MetaData
        title={`Store On ${configData?.business_name} `}
        //ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
      <MainLayout configData={configData}>
        <StoresWithFilter />
      </MainLayout>
    </>
  );
};

export default AllStore;
export {getServerSideProps}
