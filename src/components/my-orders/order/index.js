import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import { Button, Chip, Grid, Paper, Typography } from "@mui/material";
import {
  CustomColouredTypography,
  CustomPaperBigCard,
  CustomStack,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import {
  DateTypography,
  OrderAmountTypography,
  OrderIdTypography,
  PendingButton,
  SuccessButton,
  TrackOrderButton,
} from "../myorders.style";
import CustomFormatedDateTime from "../../date/CustomFormatedDateTime";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import startReview from "../assets/star-review.png";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setDeliveryManInfoByDispatch } from "../../../redux/slices/searchFilter";

const CustomPaper = styled(CustomPaperBigCard)(({ theme }) => ({
  padding: "10px",
}));

const Order = (props) => {
  const { order, t, configData, dispatch } = props;

  const storeImage =
    order?.module_type === "parcel"
      ? configData?.base_urls?.parcel_category_image_url
      : configData?.base_urls?.store_image_url;
  const router = useRouter();
  const handleClick = () => {
    if (order?.delivery_man) {
      dispatch(setDeliveryManInfoByDispatch(order?.delivery_man));
    }
    router.push(`/order-details/${order?.id}`, undefined, { shallow: true });
  };
  const handleRateButtonClick = () => {
    router.push(`/rate-and-review/${order?.id}`, undefined, { shallow: true });
  };
  const handleClickTrackOrder = () => {
    if (order?.delivery_man) {
      dispatch(setDeliveryManInfoByDispatch(order?.delivery_man));
    }
    router.push(`/track-order/${order?.id}`, undefined, { shallow: true });
  };
  const deliveredInformation = () => (
    <>
      <SuccessButton size="small">{t("Delivered")}</SuccessButton>
      <Button
        onClick={() => handleRateButtonClick()}
        variant="outlined"
        sx={{
          p: {
            xs: "5px",
            sm: "5px",
            md: "6px",
          },
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          spacing={1}
          flexWrap="wrap"
        >
          <CustomImageContainer
            src={startReview.src}
            width="25px"
            height="25px"
          />
          <CustomColouredTypography color="primary">
            {t("Give Review")}
          </CustomColouredTypography>
        </Stack>
      </Button>
    </>
  );
  const notDeliveredInformation = () => (
    <CustomStackFullWidth
      mt="5px"
      direction="row"
      flexWrap="wrap"
      gap="6px"
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
    >
      <PendingButton size="small">
        {order?.order_status === "failed"
          ? t("Payment Failed")
          : t(order?.order_status).replaceAll("_", " ")}
      </PendingButton>
      {order?.order_status !== "delivered" &&
        order?.order_status !== "failed" &&
        order?.order_status !== "canceled" &&
        order?.order_status !== "refund_requested" &&
        order?.order_status !== "refund_request_canceled" &&
        order?.order_status !== "refunded" && (
          <Stack flexWrap="wrap">
            <TrackOrderButton
              size="small"
              onClick={() => handleClickTrackOrder()}
            >
              <LocalShippingIcon sx={{ fontSize: "14px" }} />
              {t("Track Order")}
            </TrackOrderButton>
          </Stack>
        )}
    </CustomStackFullWidth>
  );
  return (
    <CustomPaper>
      <Grid container item spacing={1}>
        <Grid item md={3.5} xs={4.5} sm={4.5}>
          <Box
            sx={{ cursor: "pointer", maxWidth: "125px", position: "relative" }}
            onClick={() => handleClick()}
          >
            {order?.module_type === "parcel" && (
              <Stack sx={{ position: "absolute", top: "5px", zIndex: 999 }}>
                <Chip
                  label={order?.module_type}
                  color="primary"
                  style={{ borderRadius: "2px", textTransform: "capitalize" }}
                />
              </Stack>
            )}

            <CustomImageContainer
              src={`${storeImage}/${
                order?.module_type === "parcel"
                  ? order?.parcel_category?.image
                  : order?.store?.logo
              }`}
              width="100%"
              borderRadius=".7rem"
            />
          </Box>
        </Grid>
        <Grid item md={8.5} xs={7.5} sm={7.5}>
          <OrderIdTypography
            variant="h3"
            onClick={() => handleClick()}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              component="span"
              variant={{ xs: "h5", md: "h3" }}
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
            >
              {t("Order ID")}
            </Typography>{" "}
            {order?.id}
          </OrderIdTypography>
          <DateTypography>
            {order?.order_status == "delivered" ? (
              <CustomFormatedDateTime date={order?.delivered} />
            ) : (
              <CustomFormatedDateTime date={order?.created_at} />
            )}
          </DateTypography>
          <Stack direction='row' alignItems='center' spacing={.5}>
            <OrderAmountTypography>
              {t("Order Amount")} :
            </OrderAmountTypography>
            <OrderAmountTypography>
              {getAmountWithSign(order?.order_amount)}
            </OrderAmountTypography>

          </Stack>

          <CustomStackFullWidth
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
            }}
          >
            {order?.order_status == "delivered"
              ? deliveredInformation()
              : notDeliveredInformation()}
          </CustomStackFullWidth>
        </Grid>
      </Grid>
    </CustomPaper>
  );
};
Order.propTypes = {};

export default Order;
