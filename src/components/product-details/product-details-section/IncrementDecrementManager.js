import React from "react";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import {
  CustomFab,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { t } from "i18next";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";

const IncrementDecrementManager = (props) => {
  const { decrementQuantity, incrementQuantity, modalData, productUpdate } =
    props;
  const theme = useTheme();
  return (
      <CustomStackFullWidth>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="400">{t("Unit")} :</Typography>
            <Typography fontWeight="500">
                {modalData?.unit_type}
            </Typography>
        </Stack>
        <CustomStackFullWidth
            key={modalData}
            direction={productUpdate ? "column" : { xs: "column", md: "row" }}
            spacing={2}
            alignItems={
              productUpdate ? "flex-start" : { sm: "flex-start", md: "center" }
            }
            justifyContent="flex-start"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight="400">{t("Quantity")} :</Typography>
            <CustomFab
                onClick={decrementQuantity}
                color="primary"
                aria-label="remove"
                disabled={modalData?.totalPrice === 0 || modalData?.quantity <= 1}
            >
              <RemoveIcon
                  size="small"
                  sx={{ color: (theme) => theme.palette.neutral[100] }}
              />
            </CustomFab>
            <Typography variant="h6" fontWeight="500">
              {modalData?.quantity}
            </Typography>
            <CustomFab color="primary" aria-label="add" onClick={incrementQuantity}>
              <AddIcon
                  size="small"
                  sx={{ color: (theme) => theme.palette.neutral[100] }}
              />
            </CustomFab>
          </Stack>
          <Stack
              direction="row"
              witdh="100%"
              spacing={1}
              paddingLeft={productUpdate ? "none" : { sm: "0px", md: "45px" }}
          >
            <Typography fontWeight="500">{t("Total Price")}:</Typography>
            <Typography fontWeight="500">
              {modalData &&
                  getAmountWithSign(
                      getDiscountedAmount(
                          modalData?.totalPrice,
                          modalData?.discount,
                          modalData?.discount_type,
                          modalData?.store_discount,
                          modalData?.quantity
                      )
                  )}
            </Typography>
          </Stack>
        </CustomStackFullWidth>
      </CustomStackFullWidth>
  );
};

IncrementDecrementManager.propTypes = {};

export default IncrementDecrementManager;
