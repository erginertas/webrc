import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const Subtitle1 = (props) => {
  const { text } = props;
  const { t } = useTranslation();
  return <Typography textAlign="center">{t(text)}</Typography>;
};

Subtitle1.propTypes = {};

export default Subtitle1;
