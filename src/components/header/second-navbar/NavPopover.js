import React from "react";

import { Popover, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import CustomImageContainer from "../../CustomImageContainer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../styled-components/CustomStyles.style";
import CategoryPopover from "./CategoryPopover";
import NavStorePopover from "./NavStorePopover";
import { getLanguage } from "../../../helper-functions/getLanguage";
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    pointerEvents: "auto",
  },
}));

const NavPopover = ({
  catImageUrl,
  open,
  anchorEl,
  handlePopoverOpenSub,
  openSub,
  anchorElSub,
  subCategory,
  popoverFor,
  handlePopoverCloseSub,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <CustomStackFullWidth>
      <Popover
        disableScrollLock={true}
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: getLanguage() === "rtl" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: getLanguage() === "rtl" ? "right" : "left",
        }}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        //onClose={handlePopoverClose}
      >
        {popoverFor === "category" ? (
          <CategoryPopover
            // categoriesData={categoriesData}
            handlePopoverOpenSub={handlePopoverOpenSub}
            catImageUrl={catImageUrl}
            openSub={openSub}
            anchorElSub={anchorElSub}
            subCategory={subCategory}
            handlePopoverCloseSub={handlePopoverCloseSub}
          />
        ) : (
          <NavStorePopover />
        )}
      </Popover>
    </CustomStackFullWidth>
  );
};

export default NavPopover;
