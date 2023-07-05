import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { InformationGrid } from "../../myorders.style";
import { Grid, Typography } from "@mui/material";
import CustomImageContainer from "../../../CustomImageContainer";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import ChatIcon from "@mui/icons-material/Chat";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";

const storeDetails = (props) => {
  const { trackOrderData, configData, t } = props;
  return (
    <InformationGrid container md={12} xs={12}>
      <Grid item md={12} xs={12} align="left" mb="1rem">
        <Typography fontWeight="bold">{t("Store Information")}</Typography>
      </Grid>
      <Grid item md={3.5} sm={4} xs={12}>
        {trackOrderData && (
          <CustomImageContainer
            src={`${configData?.base_urls?.store_cover_photo_url}/${trackOrderData?.store?.cover_photo}`}
            height="120px"
            borderRadius=".5rem"
          />
        )}
      </Grid>
      <Grid item md={7.5} sm={8} xs={12} ml="1rem">
        <Typography>{trackOrderData && trackOrderData?.store?.name}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          {trackOrderData && trackOrderData?.store?.rating_count}
          <StarIcon
            sx={{
              fontSize: "16px",
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </Typography>
        <Typography>
          {t("Address")} : {trackOrderData && trackOrderData?.store?.address}
        </Typography>
        <CustomStackFullWidth alignItems="flex-end" mt="1rem">
          {trackOrderData && trackOrderData?.order_status === "pending" && (
            <Link
              href={{
                pathname: "/chatting",
                query: {
                  type: "vendor",
                  id: trackOrderData?.store?.vendor_id,
                  routeName: "vendor_id",
                  chatFrom: "true",
                },
              }}
            >
              <ChatIcon
                sx={{
                  height: 25,
                  width: 25,
                  color: (theme) => theme.palette.primary.main,
                }}
              />
            </Link>
          )}
        </CustomStackFullWidth>
      </Grid>
    </InformationGrid>
  );
};

storeDetails.propTypes = {};

export default storeDetails;
