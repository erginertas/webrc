import { IconButton, styled } from "@mui/material";
import { Box } from "@mui/system";

export const LeftArrowStyle = styled(Box)(
  ({ theme, language_direction, left, top }) => ({
    zIndex: "1",
    top: top ? top : "26%",
    position: "absolute",
    right: language_direction === "rtl" && "0px",
    left: `${language_direction === "rtl" ? "unset" : left}`,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
export const RightArrowStyle = styled(Box)(
  ({ theme, language_direction, right, top }) => ({
    zIndex: "1",
    position: "absolute",
    top: top ? top : "26%",
    right: `${language_direction === "rtl" ? "unset" : right}`,
    left: language_direction === "rtl" ? "0px" : "unset",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  })
);
export const IconButtonGray = styled(IconButton)(
  ({ theme, color, borderraduis }) => ({
    borderRadius: borderraduis ? borderraduis : "50%",
    background: color ? color : theme.palette.neutral[200],
  })
);
