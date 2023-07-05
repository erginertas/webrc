import React from "react";
import PropTypes from "prop-types";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import SimpleBar from "simplebar-react";
import CartContent from "./CartContent";
import { Box } from "@mui/system";

const CartContents = (props) => {
  const { cartList, imageBaseUrl } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CustomStackFullWidth
      justifyContent="flex-start"
      sx={{ height: "100%" }}
      alignItems="center"
      mt="1rem"
    >
      <Typography variant="subtitle1">
        <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
          {cartList?.length}
        </span>{" "}
        {t("items in your cart")}
      </Typography>
      <SimpleBar
        style={{
          height: isSmall ? "68vh" : "70vh",
          width: "100%",
        }}
      >
        {cartList?.length > 0 &&
          cartList?.map((item) => {
            return (
              <CartContent
                key={item?.id}
                cartItem={item}
                imageBaseUrl={imageBaseUrl}
              />
            );
          })}
      </SimpleBar>
    </CustomStackFullWidth>
  );
};

CartContents.propTypes = {};

export default CartContents;
