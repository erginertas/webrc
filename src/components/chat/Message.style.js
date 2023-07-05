import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, Card } from "@mui/material";

export const ChatMessageWrapper = styled(Box)(
  ({ theme, authortype, usertype, language_direction }) => ({
    display: "flex",
    flexDirection: authortype === usertype ? "row-reverse" : "row",
    maxWidth: 500,
    marginLeft:
      authortype === usertype ? (language_direction === "rtl" ? 0 : "auto") : 0,
    marginBottom: "1rem",
    marginRight:
      authortype === usertype ? (language_direction === "rtl" ? "auto" : 0) : 0,
  })
);

export const CustomAvatar = styled(Avatar)(
  ({ theme, authortype, usertype }) => ({
    height: 32,
    marginLeft: authortype === usertype ? 2 : 0,
    marginRight: authortype === usertype ? 0 : 2,
    width: 32,
  })
);
export const BodyWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 500,
}));
export const CardWrapper = styled(Card)(({ theme, authortype, usertype }) => ({
  backgroundColor:
    authortype === usertype
      ? theme.palette.neutral[200]
      : theme.palette.neutral[700],

  color:
    authortype === usertype
      ? theme.palette.primary.contrastText
      : "text.primary",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingTop: ".1rem",
  paddingBottom: ".5rem",
}));
export const TimeWrapper = styled(Box)(({ theme, authortype, usertype }) => ({
  display: "flex",
  justifyContent: authortype === usertype ? "flex-end" : "flex-start",
  marginTop: 1,
  paddingTop: 2,
}));
