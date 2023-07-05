import React from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
import marker from "../../../../public/landingpage/marker.svg";
import Subtitle1 from "../../typographies/Subtitle1";
import HeroLocationForm from "./HeroLocationForm";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";

const HeroMapSection = ({ configData }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={12}
      lg={7}
      spacing={4}
      alignItems="center"
      justifyContent="flex-end"
      sx={{ height: { md: "580px" } }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <CustomStackFullWidth
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ position: "relative", width: "74px", height: "100px" }}>
            <CustomImageContainer
              src={marker.src}
              width="100%"
              height="100%"
              objectfit="contained"
            />
            <Box
              sx={{
                position: "absolute",
                width: "23px",
                height: "23px",
                top: "20px",
                right: "25px",
              }}
            >
              <CustomImageContainer
                src={`${configData?.base_urls?.business_logo_url}/${configData?.fav_icon}`}
                width="100%"
                height="100%"
                objectfit="contained"
              />
            </Box>
          </Box>
          <Typography variant="h5">{t("Start Exploring!")}</Typography>
          <Stack maxWidth="348px">
            <Typography textAlign="center">
              {t(
                "Select location first to start exploring shops & restaurants near you"
              )}
            </Typography>
          </Stack>
          {!isXSmall && <HeroLocationForm />}
        </CustomStackFullWidth>
      </Grid>
    </Grid>
  );
};

export default HeroMapSection;
