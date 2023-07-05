import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { alpha, Card, IconButton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import CustomImageContainer from "../../CustomImageContainer";
import { useSelector } from "react-redux";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
const ParcelInfo = ({ parcelCategories }) => {
  const theme = useTheme();
  const { configData } = useSelector((state) => state.configData);
  const borderColor = theme.palette.primary.main;

  return (
    <CustomStackFullWidth >
      <Card sx={{ padding: "1.2rem ", }}>
        <CustomStackFullWidth spacing={3}>
          <Stack direction="row" justifyCenter="center" alignItems="center">
            <Stack justifyCenter="center" alignItems="center" flexGrow="1">
              <Typography variant="h6">{t("Parcel Info")}</Typography>
            </Stack>
            {/*<Stack*/}
            {/*  sx={{ border: `1px solid ${borderColor}`, borderRadius: "50%" }}*/}
            {/*>*/}
            {/*  <IconButton>*/}
            {/*    <DriveFileRenameOutlineOutlinedIcon*/}
            {/*      style={{ color: theme.palette.primary.main }}*/}
            {/*    />*/}
            {/*  </IconButton>*/}
            {/*</Stack>*/}
          </Stack>
          <Card
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              borderRadius: "7.8px",
            }}
          >
            <Stack
              width="100%"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              paddingTop="70px"
              paddingBottom="70px"
            >
              <CustomImageContainer
                src={`${configData?.base_urls?.parcel_category_image_url}/${parcelCategories?.image}`}
                height="100px"
                width="100px"
                objectfit="contain"
              />
              <Stack width="100%" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="500">
                  {parcelCategories?.name}
                </Typography>
                <Typography p=".7rem">
                  {parcelCategories?.description}
                </Typography>
              </Stack>
            </Stack>
          </Card>
          <Stack width="100%" paddingBottom="25px">
            <CustomButtonPrimary fullwidth="true" type="submit">
              {t("Proceed to Checkout")}
            </CustomButtonPrimary>
          </Stack>
        </CustomStackFullWidth>
      </Card>
    </CustomStackFullWidth>
  );
};

export default ParcelInfo;
