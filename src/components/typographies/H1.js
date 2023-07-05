import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const H1 = (props) => {
  const { text, textAlign } = props;

  const { t } = useTranslation();
  return (
    <Typography
      textAlign={textAlign ? textAlign : "center"}
      fontWeight="500"
      sx={{ fontSize: { xs: "16px", md: "24px" } }}
    >
      {t(text)}
    </Typography>
  );
};

H1.propTypes = {
  text: PropTypes.string.isRequired,
};

export default H1;
