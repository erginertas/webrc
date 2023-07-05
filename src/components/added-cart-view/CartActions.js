import React from "react";
import PropTypes from "prop-types";
import { PrimaryButton } from "../Map/map.style";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setClearCart } from "../../redux/slices/cart";

const CartActions = (props) => {
  const { setSideDrawerOpen } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleCheckout = () => {
    router.push("/checkout?page=cart", undefined, { shallow: true });
    setSideDrawerOpen(false);
  };
  const handleClearAll = () => {
    dispatch(setClearCart());
    // dispatch(setCouponInfo(null));
    // setOpenModal(false);
  };
  return (
    <Stack direction="row" width="100%" spacing={1} pb="1rem">
      <PrimaryButton
        sx={{
          backgroundColor: (theme) => theme.palette.neutral[200],
          color: "black",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.neutral[400],
            color: "black",
          },
        }}
        onClick={handleClearAll}
        variant="contained"
        size="large"
        fullWidth
        borderRadius="7px"
      >
        {t("Clear All")}
      </PrimaryButton>
      <PrimaryButton
        onClick={handleCheckout}
        variant="contained"
        size="large"
        fullWidth
        borderRadius="7px"
      >
        {t("Checkout")}
      </PrimaryButton>
    </Stack>
  );
};

CartActions.propTypes = {};

export default CartActions;
