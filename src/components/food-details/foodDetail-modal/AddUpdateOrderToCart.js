import React from "react";
import PropTypes from "prop-types";
import NotAvailableCard from "./NotAvailableCard";
import { Button, Stack } from "@mui/material";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import { isAvailable } from "../../../utils/CustomFunctions";

const AddUpdateOrderToCart = (props) => {
  const { modalData, isInCart, addToCard, t, product, orderNow, isCampaign } = props;
  return (
    <Stack spacing={1}>
      {
        isCampaign ? <Button
            // disabled={quantity <= 0}
            onClick={() => orderNow()}
            variant="contained"
            fullWidth
        >
          {t("Order Now")}
        </Button> : <>
          {modalData.length > 0 && modalData[0].schedule_order && (
              <>
                {isInCart(product?.id) && (
                    <Button
                        // disabled={quantity <= 0}
                        onClick={() => addToCard()}
                        variant="contained"
                        fullWidth
                    >
                      {t("Update to cart")}
                    </Button>
                )}
                {!isInCart(product?.id) &&  <Button
                    // disabled={quantity <= 0}
                    onClick={() => addToCard()}
                    variant="contained"
                    fullWidth
                >
                  <CustomTypography
                      variant="h5"
                      sx={{
                        color: (theme) => theme.palette.whiteContainer.main,
                      }}
                  >
                    {t("Add to cart")}
                  </CustomTypography>
                </Button>}
              </>
          )}
        </>
      }
    </Stack>
  );
};

AddUpdateOrderToCart.propTypes = {};

export default AddUpdateOrderToCart;
