import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography } from "@mui/material";

const FooterBottom = (props) => {
  const { configData } = props;
  return (
      <CustomStackFullWidth
          py="1rem"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: (theme) => theme.palette.footer.bottom }}
      >
        <Typography color="whiteContainer.main">
          {configData?.footer_text}
        </Typography>
      </CustomStackFullWidth>
  );
};

FooterBottom.propTypes = {};

export default FooterBottom;
