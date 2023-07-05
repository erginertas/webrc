import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import facebookIcon from "../../../../public/static/footer/socialicons/facebook.svg";
import instraIcon from "../../../../public/static/footer/socialicons/instragram.svg";
import twitterIcon from "../../../../public/static/footer/socialicons/twitter.svg";
import linkedInIcon from "../../../../public/static/footer/socialicons/linkedIn.svg";
import pinterestIcon from "../../../../public/static/footer/socialicons/pinterest.svg";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { IconButton, Typography } from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
const SocialLinks = (props) => {
  const { configData, landingPageData } = props;
  const { t } = useTranslation();
  const clickHandler = (link) => {
    window.open(link);
  };
  const iconHandler = (name) => {
    switch (name) {
      case "facebook":
        return facebookIcon.src;
      case "instagram":
        return instraIcon.src;
      case "twitter":
        return twitterIcon.src;
      case "linkedin":
        return linkedInIcon.src;
      case "pinterest":
        return pinterestIcon.src;
      default:
        return twitterIcon.src;
    }
  };
  return (
    <CustomStackFullWidth spacing={2}>
      <Typography sx={{ fontSize: "16px" }} color="whiteContainer.main">
        {landingPageData?.fixed_footer_description}
      </Typography>
      <CustomStackFullWidth
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent={{ xs: "center", sm: "flex-start" }}
        flexWrap="wrap"
      >
        {configData &&
          configData?.social_media?.length > 0 &&
          configData?.social_media?.map((item, index) => {
            const { name, link } = item;
            return (
              <IconButton
                sx={{ padding: "0px" }}
                key={index}
                color="primary"
                onClick={() => clickHandler(link)}
              >
                <CustomImageContainer
                  src={iconHandler(name)}
                  alt={name}
                  height="20px"
                  width="25px"
                  objectfit="contained"
                />
              </IconButton>
            );
          })}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

SocialLinks.propTypes = {};

export default SocialLinks;
