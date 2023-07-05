import React, {useEffect, useState} from "react";
import { CustomContainer } from "../footer/Footer.style";
import Top from "./Top";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import GoogleMapComponent from "../Map/GoogleMapComponent";
import MiddleSection from "./middle-section";
import Prescription from "../Prescription";
import { useSelector } from "react-redux";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import RecommendItems from "./RecommentItems";

const StoreDetails = ({ storeDetails, configData }) => {
  const imageBaseUrl = configData?.base_urls?.store_cover_photo_url;
  const bannerCover = `${imageBaseUrl}/${storeDetails?.cover_photo}`;
  const ownCategories = storeDetails?.category_ids;
  const logo = `${configData?.base_urls?.store_image_url}/${storeDetails?.logo}`;
    const [rerender, setRerender]= useState(false)
    useEffect(()=>{
        setRerender(prev=>!prev)
    },[storeDetails?.id])
  return (
    <CustomStackFullWidth key={rerender} sx={{ minHeight: "100vh" }} spacing={3}>
      <Top
        bannerCover={bannerCover}
        storeDetails={storeDetails}
        configData={configData}
        logo={logo}
      />
      <RecommendItems store_id={storeDetails?.id} />
      <MiddleSection
        ownCategories={ownCategories}
        storeDetails={storeDetails}
      />
      {configData?.prescription_order_status &&
        storeDetails?.prescription_order &&
        getCurrentModuleType() === "pharmacy" && (
          <Prescription storeId={storeDetails?.id} />
        )}
    </CustomStackFullWidth>
  );
};

export default StoreDetails;
