import React, { useEffect } from "react";
import { Avatar, Badge, Stack, styled, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

// import {
//   FormatedDateWithTime,
//   getDateFormat,
// } from "../../utils/customFunctions";
import { useQuery } from "react-query";
// import { ProfileApi } from "../../hooks/react-query/config/profileApi";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { FormatedDateWithTime } from "../../utils/CustomFunctions";
import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
// import adminImage from "../../../public/static/food.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const InfoCard = ({
  name,
  messageTime,
  receiver,
  userList,
  unRead,
  currentId,
  selectedId,
}) => {
  const theme = useTheme();
  const { configData } = useSelector((state) => state.configData);
  const { profileInfo } = useSelector((state) => state.profileInfo);
  const ChatImageUrl = () => {
    if (userList.receiver_type === "vendor") {
      return configData?.base_urls?.store_image_url;
    }
    if (userList.receiver_type === "delivery_man") {
      return configData?.base_urls?.delivery_man_image_url;
    } else configData?.base_urls?.business_logo_url;
  };

  const { data, refetch, isLoading } = useGetUserInfo();
  useEffect(() => {
    refetch();
  }, []);

  const userImage = userList?.receiver?.image;

  const isSender = data?.userinfo?.id === userList.last_message.sender_id;
  const language_direction = localStorage.getItem("direction");
  return (
    <CustomStackFullWidth
      direction="row"
      spacing={2}
      alignItems="center"
      padding="10px 15px 10px 10px"
      sx={{
        background:
          selectedId === currentId ? (theme) => theme.palette.primary.main : "",
      }}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        //variant="dot"
      >
        <Avatar src={`${ChatImageUrl()}/${userImage}`} />
      </StyledBadge>
      <CustomStackFullWidth>
        <Stack
          direction="row"
          justifyContent="space-between"
          marginRight={language_direction === "rtl" ? "1rem" : "0rem"}
          color={
            selectedId === currentId
              ? theme.palette.neutral[100]
              : theme.palette.neutral[1000]
          }
        >
          <Typography>{receiver}</Typography>
          <Typography variant="h5" fontWeight="700">
            {!isLoading && !isSender && unRead > 0 && unRead}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          color={
            selectedId === currentId
              ? theme.palette.neutral[100]
              : theme.palette.neutral[1000]
          }
        >
          <Typography variant="h7">
            {t(name)}
          </Typography>
          <Typography variant="h7">
            {FormatedDateWithTime(messageTime)}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};
export default InfoCard;
