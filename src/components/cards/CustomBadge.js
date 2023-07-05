import React from "react";
import PropTypes from "prop-types";
import { Badge, styled } from "@mui/material";
export const CustomBadgeWrapepr = styled(Badge)(({ theme, bg_color, top,left, border_radius }) => ({
  color: theme.palette.whiteContainer.main,
  backgroundColor: bg_color==='primary' ? theme.palette.primary.main :  theme.palette.error.light,
  position: "absolute",
  top:top ? top : "0",
  left:left ? left : 0,
  zIndex: "1",
  fontSize: "15px",
  fontWeight: "500",
  lineHeight: "24px",
  padding: "4px 13px",
  borderRadius: border_radius ? border_radius : "10px 0 15px 0",
  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
  },
}));

const CustomBadge = (props) => {
  const { text } = props;
  return <CustomBadgeWrapepr>{text}</CustomBadgeWrapepr>;
};

CustomBadge.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CustomBadge;
