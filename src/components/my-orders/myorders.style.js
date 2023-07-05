import { styled } from "@mui/material/styles";
import { alpha, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const OrderIdTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "22px",
  },
}));
export const DateTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));
export const OrderAmountTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));
export const SuccessButton = styled(Button)(({ theme }) => ({
  background: "rgba(0, 171, 17, 0.1);",
  color: theme.palette.success.main,
  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    width: "59.68px",
    height: "20.56px",
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    width: "88px",
    height: "30px",
    fontSize: "14px",
  },
}));

export const PendingButton = styled(Box)(({ theme }) => ({
  textAlign: "center",
  textTransform: "capitalize",
  background: "rgba(0, 95, 149, 0.1)",
  color: theme.palette.info.dark,
  borderRadius: "5px",
  padding: "5px",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100px",
  },
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
}));
export const TrackOrderButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "32px",
  background: theme.palette.primary.main,
  border: "1px solid rgba(239, 120, 34, 0.3)",
  borderRadius: "5px",
  color: "white",
  gap: "5px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.up("md")]: {
    width: "150px",
    height: "32px",
    fontSize: "16px",
  },
}));
export const HeadingBox = styled(Box)(() => ({
  padding: "10px 0px 20px 0px",
}));
export const OrderStatusBox = styled(Box)(({ theme }) => ({
  padding: "7px 0px 20px 0px",
  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
  },
}));
export const OrderStatusGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.neutral[300],
  borderRadius: "14px",
  padding: "20px",
  rowGap: "10px",
}));
export const InformationGrid = styled(Grid)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  borderRadius: "14px",
  padding: "20px",
}));
