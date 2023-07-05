import React, { useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { IconButton, useTheme } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Stack } from "@mui/material";
import FoodDetailModal from "../food-details/foodDetail-modal/FoodDetailModal";
import { useAddToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddWishList";
import { addWishList, removeWishListItem } from "../../redux/slices/wishList";
import toast from "react-hot-toast";
import { t } from "i18next";
import { not_logged_in_message } from "../../utils/toasterMessages";
import { useDispatch, useSelector } from "react-redux";
import { useWishListDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
const QuickView = ({ quickViewHandleClick, item, isTransformed }) => {
  const router = useRouter();
  const theme = useTheme();
  const { wishLists } = useSelector((state) => state.wishList);
  const dispatchRedux = useDispatch();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const { mutate: addFavoriteMutation } = useAddToWishlist();
  const addToFavorite = (e) => {
    e.stopPropagation();
    if (token) {
      addFavoriteMutation(item?.id, {
        onSuccess: (response) => {
          if (response) {
            dispatchRedux(addWishList(item));
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
  const isInWishList = (id) => {
    return !!wishLists?.item?.find((wishItem) => wishItem.id === id);
  };

  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListItem(item?.id));
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate } = useWishListDelete();
  const deleteWishlistItem = (e) => {
    e.stopPropagation();
    mutate(item?.id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  return (
    <CustomStackFullWidth sx={{ position: "relative" }}>
      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          right: 3,
          top: 2,
          transform: isTransformed ? "translateX(0px)" : "translateX(40px)",
          transition: "0.5s",
        }}
      >
        {router.pathname !== "/wishlist" && (
          <>
            {!isInWishList(item?.id) && (
              <IconButton
                onClick={(e) => addToFavorite(e)}
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral[100],
                  borderRadius: "50%",
                  padding: "4px",
                }}
              >
                <FavoriteBorderIcon color="primary" />
              </IconButton>
            )}
            {isInWishList(item?.id) && (
              <IconButton
                onClick={(e) => deleteWishlistItem(e)}
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral[100],
                  borderRadius: "50%",
                  padding: "4px",
                }}
              >
                <FavoriteIcon color="primary" />
              </IconButton>
            )}
          </>
        )}

        <IconButton
          onClick={(e) => quickViewHandleClick(e)}
          sx={{
            backgroundColor: (theme) => theme.palette.neutral[100],
            borderRadius: "50%",
            padding: "4px",
          }}
        >
          <RemoveRedEyeIcon color="primary" />
        </IconButton>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default QuickView;
