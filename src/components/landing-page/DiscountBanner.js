import React from "react";
import {
  CustomColouredTypography,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CustomImageContainer from "../CustomImageContainer";
import banner from "./assets/banner.png";
import { Box, Stack } from "@mui/system";
import CustomContainer from "../container";

const DiscountBanner = ({ bannerImage, isSmall }) => {
  return (
    <>
      {isSmall ? (
        <CustomContainer>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              // height: "250px",
              borderRadius: "5px",
              marginBottom: "20px ",
            }}
          >
            <CustomImageContainer
              src={bannerImage}
              alt="banner"
              height="100%"
              width="100%"
              obejctfit="contained"
              borderRadius="5px"
            />
          </Box>
        </CustomContainer>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "250px",
            borderRadius: "5px",
          }}
        >
          <CustomImageContainer
            src={banner.src}
            alt="banner"
            height="100%"
            width="100%"
            obejctfit="contained"
          />
        </Box>
      )}
    </>
  );
};

export default DiscountBanner;
