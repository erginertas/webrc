import React from "react";
import {
  CustomStackFullWidth,
  CustomTypographyBold,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import { Typography } from "@mui/material";

const SomeInfo = (props) => {
  const { image, alt, title, info, t } = props;
  return (
      <CustomStackFullWidth
          alignItems="center"
          justifyContent="center"
          spacing={3}
      >
        <CustomImageContainer src={image.src} alt={alt} height={50} width={50} />
        <CustomStackFullWidth
            alignItems="center"
            justifyContent="center"
            spacing={1}
        >
          <CustomTypographyBold
              color="whiteContainer.main"
              sx={{
                textTransform: "capitalize",
              }}
          >
            {t(title)}
          </CustomTypographyBold>
          <Typography
              variant="body2"
              color="whiteContainer.main"
              sx={{
                textAlign: "center",
              }}
          >
            {info}
          </Typography>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
  );
};

SomeInfo.propTypes = {};

export default SomeInfo;
