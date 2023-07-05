import React from "react";
import { Typography } from "@mui/material";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../../helper-functions/CardHelpers";
import { t } from "i18next";
import { Stack } from "@mui/system";

const PricePreviewWithStock = (props) => {
  const { state, theme, productDetailsData } = props;

  const priceWithOrWithoutDiscount = (price) => {
    return (
      <Typography
        marginTop="5px !important"
        display="flex"
        alignItems="center"
        fontWeight="700"
        color={theme.palette.info.main}
        sx={{
          fontSize: { xs: "18px", sm: "26px" },
        }}
      >
        {price ===
        getDiscountedAmount(
          price,
          state.modalData[0]?.discount,
          state.modalData[0]?.discount_type,
          state.modalData[0]?.store_discount
        ) ? (
          <>{getAmountWithSign(price)}</>
        ) : (
          <>
            {
              <>
                <Typography
                  variant="body1"
                  marginRight="10px"
                  marginTop="10px"
                  fontWeight="400"
                  color={theme.palette.error.main}
                  sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                >
                  <del>{getAmountWithSign(price)}</del>
                </Typography>
                {getAmountWithSign(
                  getDiscountedAmount(
                    price,
                    state.modalData[0]?.discount,
                    state.modalData[0]?.discount_type,
                    state.modalData[0]?.store_discount
                  )
                )}
              </>
            }
          </>
        )}
        {productDetailsData?.stock > 0 ? (
          <Typography
            color={theme.palette.primary.main}
            variant="h6"
            pl="5px"
            pb="10px"
          >
            {t("In Stock")}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color={theme.palette.error.main}
            pl="5px"
            pb="10px"
          >
            {t("Out of Stock")}
          </Typography>
        )}
      </Typography>
    );
  };
  const handlePriceRange = (priceOne, priceTwo) => {
    return (
      <Typography
        marginTop="5px !important"
        //fontSize="28px"
        display="flex"
        alignItems="center"
        fontWeight="700"
        color={theme.palette.info.main}
        flexWrap="wrap"
        flexGap="10px"
        sx={{
          fontSize: { xs: "14px", sm: "26px" },
        }}
      >
        {state?.modalData?.[0]?.discount === 0 ? (
          <>
            {`${getAmountWithSign(
              getDiscountedAmount(
                priceOne,
                state.modalData[0]?.discount,
                state.modalData[0]?.discount_type,
                state.modalData[0]?.store_discount
              )
            )} - ${getAmountWithSign(
              getDiscountedAmount(
                priceTwo,
                state.modalData[0]?.discount,
                state.modalData[0]?.discount_type,
                state.modalData[0]?.store_discount
              )
            )} `}
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              marginRight="10px"
              marginTop="10px"
              fontWeight="400"
              color={theme.palette.error.main}
              sx={{ fontSize: { xs: "14px", sm: "16px" } }}
            >
              <del>{`${getAmountWithSign(priceOne)} - ${getAmountWithSign(
                priceTwo
              )}`}</del>
            </Typography>
            {`${getAmountWithSign(
              getDiscountedAmount(
                priceOne,
                state.modalData[0]?.discount,
                state.modalData[0]?.discount_type,
                state.modalData[0]?.store_discount
              )
            )} - ${getAmountWithSign(
              getDiscountedAmount(
                priceTwo,
                state.modalData[0]?.discount,
                state.modalData[0]?.discount_type,
                state.modalData[0]?.store_discount
              )
            )} `}
          </>
        )}

        {productDetailsData?.stock > 0 ? (
          <Typography
            color={theme.palette.primary.main}
            variant="h6"
            pl="5px"
            pb="10px"
          >
            {t("In Stock")}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color={theme.palette.error.main}
            pl="5px"
            pb="10px"
          >
            {t("Out of Stock")}
          </Typography>
        )}
      </Typography>
    );
  };
  const handlePrice = () => {
    if (state?.modalData[0]?.variations?.length > 0) {
      if (
        Number.parseInt(state?.modalData[0]?.variations?.[0]?.price) ===
        Number.parseInt(
          state?.modalData[0]?.variations?.[
            state?.modalData[0]?.variations?.length - 1
          ]?.price
        )
      ) {
        return (
          <>
            {priceWithOrWithoutDiscount(
              state?.modalData[0]?.variations?.[0]?.price
            )}
          </>
        );
      } else {
        return (
          <Stack direction="row" alignItems="center">
            {handlePriceRange(
              state?.modalData[0]?.variations?.[0]?.price,
              state?.modalData[0]?.variations?.[
                state?.modalData[0]?.variations?.length - 1
              ]?.price
            )}
          </Stack>
        );
      }
    } else {
      return <>{priceWithOrWithoutDiscount(state?.modalData[0]?.price)}</>;
    }
  };

  return <>{handlePrice()}</>;
};

PricePreviewWithStock.propTypes = {};

export default PricePreviewWithStock;
