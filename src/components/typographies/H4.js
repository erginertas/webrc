import React from "react";
import PropTypes from "prop-types";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const H4 = (props) => {
  const { text } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Typography
      textAlign="center"
      variant={isSmall ? "h6" : "h5"}
      textTransform="capitalize"
    >
      {t(text)}
    </Typography>
  );
};

H4.propTypes = {
  text: PropTypes.string.isRequired,
};

export default H4;
