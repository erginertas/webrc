import React from "react";
import { alpha, Card, Typography, useTheme } from "@mui/material";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import DeliveryInfoCard from "./DeliveryInfoCard";
import CustomImageContainer from "../CustomImageContainer";

const DeliveryInfo = ({ parcelInfo, configData }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth spacing={3}>
        <Stack align="center">
          <Typography variant="h6">{t("Delivery Information")}</Typography>
        </Stack>
        <DeliveryInfoCard
          title={t("Sender")}
          phone={parcelInfo?.senderPhone}
          name={parcelInfo?.senderName}
          address={parcelInfo?.senderAddress}
        />
        <DeliveryInfoCard
          title={t("Receiver")}
          phone={parcelInfo?.receiverPhone}
          name={parcelInfo?.receiverName}
          address={parcelInfo?.receiverAddress}
        />
        <CustomStackFullWidth spacing={0.5}>
          <Stack width="100%">
            <Typography fontWeight="500">{t("Parcel Category")}</Typography>
          </Stack>
          <Stack
            width="100%"
            padding="1.3rem"
            backgroundColor={alpha(theme.palette.primary.main, 0.1)}
            borderRadius="7px"
            spacing={2}
            direction="row"
          >
            <CustomImageContainer
              width="56px"
              height="56px"
              src={`${configData?.base_urls?.parcel_category_image_url}/${parcelInfo?.image}`}
              objectfit="contain"
            />
            <Stack spacing={1}>
              <Typography variant="h6">{parcelInfo?.name}</Typography>
              <Typography color={theme.palette.neutral[500]}>
                {parcelInfo?.description}
              </Typography>
            </Stack>
          </Stack>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

export default DeliveryInfo;
