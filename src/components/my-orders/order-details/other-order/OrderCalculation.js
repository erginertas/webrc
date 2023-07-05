import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { Divider, Typography } from "@mui/material";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

const getItemsPrice = (items) => {
  const productPrice = items.reduce(
    (total, product) => product.price * product.quantity + total,
    0
  );
  return productPrice;
};
const getAddOnsPrice = (items) => {
  let productAddonsPrice = items.reduce(
    (total, product) =>
      (product.add_ons.length > 0
        ? product.add_ons.reduce(
            (cTotal, cProduct) => cProduct.price * cProduct.quantity + cTotal,
            0
          )
        : 0) + total,
    0
  );
  return productAddonsPrice;
};
const getSubTotalPrice = (dataList) => {
  return getItemsPrice(dataList) + getAddOnsPrice(dataList);
};
function getRestaurantValue(data, key) {
  return data?.[0]?.item_details?.[key];
}

const OrderCalculation = ({ data, t, trackOrderData }) => {
  const { configData } = useSelector((state) => state.configData);
  const handleExcludedVatTotalAmount = () => {
    return getAmountWithSign(
      trackOrderData?.order_amount - trackOrderData?.total_tax_amount
    );
  };
  return (
    <CustomStackFullWidth spacing={1}>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontWeight="bold">{t("Items Price")}</Typography>
        <Typography fontWeight="bold">
          {data && data?.length > 0 && getAmountWithSign(getItemsPrice(data))}
        </Typography>
      </CustomStackFullWidth>
      {trackOrderData?.module?.module_type === "food" && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontWeight="bold"> {t("Addons Price")}</Typography>
          <Typography fontWeight="bold">
            {data &&
              data?.length > 0 &&
              getAmountWithSign(getAddOnsPrice(data))}
          </Typography>
        </CustomStackFullWidth>
      )}

      <Divider />
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontWeight="bold"> {t("Subtotal")}</Typography>
        <Typography fontWeight="bold">
          {data &&
            data?.length > 0 &&
            getAmountWithSign(getSubTotalPrice(data))}
        </Typography>
      </CustomStackFullWidth>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontWeight="bold"> {t("Discount")}</Typography>
        <Typography fontWeight="bold">
          -
          {trackOrderData &&
          getAmountWithSign(trackOrderData?.store_discount_amount)
            ? getAmountWithSign(trackOrderData?.store_discount_amount)
            : 0}
        </Typography>
      </CustomStackFullWidth>
      {Number.parseInt(trackOrderData?.coupon_discount_amount) !== 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontWeight="bold"> {t("Coupon Discount")}</Typography>
          <Typography fontWeight="bold">
            -
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.coupon_discount_amount)}
          </Typography>
        </CustomStackFullWidth>
      )}
      {configData?.tax_included === 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontWeight="bold">
            {" "}
            {t("VAT")}({getRestaurantValue(data, "tax")}
            %)
          </Typography>
          <Typography fontWeight="bold">
            {trackOrderData &&
              getAmountWithSign(trackOrderData?.total_tax_amount)}
          </Typography>
        </CustomStackFullWidth>
      )}

      {Number.parseInt(trackOrderData?.dm_tips) !== 0 && (
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography fontWeight="bold">{t("Delivery Man Tips")}</Typography>
          <Typography fontWeight="bold">
            {trackOrderData && getAmountWithSign(trackOrderData?.dm_tips)}
          </Typography>
        </CustomStackFullWidth>
      )}

      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontWeight="bold">{t("Delivery fee")}</Typography>
        <Typography fontWeight="bold">
          {trackOrderData && getAmountWithSign(trackOrderData?.delivery_charge)}
        </Typography>
      </CustomStackFullWidth>
      <Stack
        width="100%"
        sx={{
          mt: "20px",
          borderBottom: (theme) => `2px solid ${theme.palette.neutral[300]}`,
        }}
      ></Stack>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography fontWeight="bold" color="primary.main">
          {t("Total")}
        </Typography>
        <Typography fontWeight="bold">
          {trackOrderData && configData?.tax_included === 1
            ? getAmountWithSign(trackOrderData?.order_amount)
            : handleExcludedVatTotalAmount()}
        </Typography>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

OrderCalculation.propTypes = {};

export default OrderCalculation;
