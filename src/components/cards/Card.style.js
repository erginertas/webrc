import { Stack, styled } from "@mui/material";

export const CustomOverLay = styled(Stack)(({ theme, hover }) => ({
  backgroundColor: "rgba(0, 0, 0, .4)",
  opacity: hover ? 1 : 0,
  inset: 0,
  position: "absolute",
  top: 0,
  zIndex: 1,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    opacity: 1,
  },
}));
