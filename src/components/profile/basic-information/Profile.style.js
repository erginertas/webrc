import { styled } from "@mui/material/styles";
import { Box, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const SaveButton = styled(LoadingButton)(({ theme }) => ({
  color: "#ffffff !important",

  [theme.breakpoints.up("xs")]: {
    width: "170px",
    height: "42.04px",
  },
  [theme.breakpoints.up("md")]: {
    width: "170px",
    color: "black",
  },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
}));
export const CouponCard = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  justify: "center",
}));
