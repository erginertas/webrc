import React from "react";
import PropTypes from "prop-types";
import { SideDrawerWrapper } from "./CustomSideDrawer.style";
import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
const CustomDrawerForSidebar = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 100,
}));

const CustomSideDrawer = (props) => {
  const { open, onClose, children, anchor } = props;

  return (
    <CustomDrawerForSidebar
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant="temporary"
    >
      <SideDrawerWrapper>{children}</SideDrawerWrapper>
    </CustomDrawerForSidebar>
  );
};

CustomSideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomSideDrawer;
