import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

export const FoodDetailModalStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "700px",
  maxHeight: "100%",
  width: "100%",
  padding: "1.7%",
  borderRadius: "10px",
  boxShadow: 24,
  border: "none",

  color: `${theme.palette.mode === "dark" && "#fff"}`,
  [theme.breakpoints.down("md")]: {
    width: "85%",
  },
  // [theme.breakpoints.down('sm')]: {
  //     width: '70%',
  // },
  [theme.breakpoints.down("sm")]: {
    width: "85%",
    overflowY: "auto",
  },
}));
