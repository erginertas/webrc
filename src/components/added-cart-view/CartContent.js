import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import {
  getAmountWithSign,
  getDiscountedAmount,
} from "../../helper-functions/CardHelpers";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  cart,
  setDecrementToCartItem,
  setIncrementToCartItem,
  setRemoveItemFromCart,
} from "../../redux/slices/cart";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import ProductDetailModal from "../product-detail.modal";
import VariationContent from "./VariationContent";
import { toast } from "react-hot-toast";
import { t } from "i18next";
import { out_of_stock } from "../../utils/toasterMessages";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import ModuleModal from "../cards/ModuleModal";

const CartContent = (props) => {
  const { cartItem, imageBaseUrl } = props;
  const { configData } = useSelector((state) => state.configData);
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleIncrement = () => {
    if (getCurrentModuleType() !== "food") {
      if (cartItem?.stock <= cartItem?.quantity) {
        toast.error(t(out_of_stock));
      } else {
        dispatch(setIncrementToCartItem(cartItem));
      }
    } else {
      dispatch(setIncrementToCartItem(cartItem));
    }
  };
  const handleDecrement = () => {
    dispatch(setDecrementToCartItem(cartItem));
  };
  const handleRemove = () => {
    dispatch(setRemoveItemFromCart(cartItem));
  };
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };
  const handleFoodItemTotalPriceWithAddons = () => {
    if (cartItem?.selectedAddons?.length > 0) {
      const addOnsTotalPrice = cartItem?.selectedAddons?.reduce(
        (prev, addOn) => addOn?.price * addOn?.quantity + prev,
        0
      );
      return addOnsTotalPrice + cartItem?.totalPrice;
    } else {
      return cartItem?.totalPrice;
    }
  };

  return (
    <>
      <Paper elevation={8} sx={{ marginY: "10px", padding: "5px" }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={4}
            onClick={() => handleUpdateModalOpen()}
            sx={{ cursor: "pointer" }}
          >
            <CustomImageContainer
              height="90px"
              width="90px"
              src={`${imageBaseUrl}/${cartItem?.image}`}
              borderRadius=".7rem"
            />
          </Grid>
          <Grid item xs={8} container>
            <CustomStackFullWidth height="100%" justifyContent="center">
              <Typography fontWeight="bold">{cartItem?.name}</Typography>
              <VariationContent cartItem={cartItem} />
              <CustomStackFullWidth
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="primary.main" fontSize="16px">
                  {/*{getAmountWithSign(cartItem?.totalPrice)}*/}
                  {getCurrentModuleType() === "food"
                    ? getAmountWithSign(handleFoodItemTotalPriceWithAddons())
                    : getAmountWithSign(
                        getDiscountedAmount(
                          cartItem?.totalPrice,
                          cartItem?.discount,
                          cartItem?.discount_type,
                          cartItem?.store_discount,
                          cartItem?.quantity
                        )
                      )}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {cartItem?.quantity === 1 ? (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={() => handleRemove()}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{
                        width: "24px",
                        height: "24px",
                        background: (theme) => theme.palette.neutral[200],
                        borderRadius: "11px",
                      }}
                    >
                      <RemoveIcon
                        size="small"
                        sx={{
                          color: (theme) => theme.palette.neutral[1000],
                          padding: "3px",
                        }}
                        onClick={() => handleDecrement()}
                      />
                    </IconButton>
                  )}
                  <Typography>{cartItem?.quantity}</Typography>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{
                      width: "24px",
                      height: "24px",
                      background: (theme) => theme.palette.neutral[200],
                      borderRadius: "11px",
                    }}
                  >
                    <AddIcon
                      sx={{
                        color: (theme) => theme.palette.neutral[1000],
                        padding: "3px",
                      }}
                      size="small"
                      onClick={() => handleIncrement()}
                    />
                  </IconButton>
                </Stack>
              </CustomStackFullWidth>
            </CustomStackFullWidth>
          </Grid>
        </Grid>
      </Paper>
      {updateModalOpen && cartItem?.module_type === "food" ? (
        <FoodDetailModal
          open={updateModalOpen}
          product={cartItem}
          handleModalClose={() => setUpdateModalOpen(false)}
          imageBaseUrl={imageBaseUrl}
          productUpdate
        />
      ) : (
        <ModuleModal
          open={updateModalOpen}
          handleModalClose={() => setUpdateModalOpen(false)}
          configData={configData}
          productDetailsData={cartItem}
        />
      )}
    </>
  );
};

CartContent.propTypes = {};

export default CartContent;
