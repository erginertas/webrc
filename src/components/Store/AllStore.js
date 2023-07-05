import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../../../pages/meta-data";
import MainLayout from "../layout/MainLayout";
import StoresWithFilter from "../home/stores-with-filter";

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
