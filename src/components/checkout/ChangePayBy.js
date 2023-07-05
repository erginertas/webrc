import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
import { t } from "i18next";
import { alpha, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import senderImage from "../../../public/static/senderimage.svg";
import receiverImage from "../../../public/static/receiverimage.svg";
import { useSelector } from "react-redux";

const ChangePayBy = ({ paidBy, setPaidBy, zoneData }) => {
  const theme = useTheme();
  return (
    <CustomStackFullWidth spacing={1.1}>
      <CustomStackFullWidth>
        <CustomTypography fontWeigh="500">
          {t("Charge Paid By")}
        </CustomTypography>
      </CustomStackFullWidth>
      <CustomStackFullWidth direction="row" spacing={4}>
        <Stack
          spacing={0.5}
          sx={{ cursor: "pointer" }}
          onClick={() => setPaidBy("sender")}
        >
          <Stack
            backgroundColor={
              paidBy === "sender" && alpha(theme.palette.primary.main, 0.1)
            }
            sx={{ borderRadius: "15px" }}
            padding="14px"
          >
            <CustomImageContainer
              src={senderImage.src}
              height="36px"
              width="36px"
              objectfit="contain"
            />
          </Stack>
          <Typography align="center">{t("Sender")}</Typography>
        </Stack>
        {zoneData?.data?.zone_data?.[0]?.cash_on_delivery && (
          <Stack
            spacing={0.5}
            onClick={() => setPaidBy("receiver")}
            sx={{ cursor: "pointer" }}
          >
            <Stack
              //selected={paidBy === "receiver"}

              backgroundColor={
                paidBy === "receiver" && alpha(theme.palette.primary.main, 0.1)
              }
              sx={{ borderRadius: "15px" }}
              padding="14px"
            >
              <CustomImageContainer
                src={receiverImage.src}
                height="36px"
                width="36px"
                objectfit="contain"
              />
            </Stack>
            <Typography align="center">{t("Receiver")}</Typography>
          </Stack>
        )}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default ChangePayBy;
