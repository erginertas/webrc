import React, { useReducer } from "react";
import {
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Box, Stack } from "@mui/system";
import H1 from "../typographies/H1";
import RatingStar from "../RatingStar";
import { useTranslation } from "react-i18next";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TimerIcon from "@mui/icons-material/Timer";
import DiscountInfo from "./DiscountInfo";
import LocationViewOnMap from "../Map/location-view/LocationViewOnMap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useAddStoreToWishlist } from "../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import {
  addWishListStore,
  removeWishListStore,
} from "../../redux/slices/wishList";
import toast from "react-hot-toast";
import { not_logged_in_message } from "../../utils/toasterMessages";
import { useWishListStoreDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import { RoundedIconButton } from "../product-details/product-details-section/ProductsThumbnailsSettings";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import FreeDeliveryTag from "./FreeDeliveryTag";
import ClosedNowScheduleWise from "../closed-now/ClosedNowScheduleWise";
import Link from "next/link";
import { getNumberWithConvertedDecimalPoint } from "../../utils/CustomFunctions";

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "50%",
  width: "100%",
  height: "100px",
  border: "2px solid",
  aspectRatio: 1 / 1,
  borderColor: theme.palette.primary.light,
  [theme.breakpoints.down("lg")]: {
    height: "100px",
    maxWidth: "110px",
  },
  [theme.breakpoints.down("md")]: {
    //height: "120px",
    maxWidth: "110px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "65px",
    maxWidth: "85px",
  },
}));
const PrimaryWrapper = styled(Box)(({ theme, borderradius }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.whiteContainer.main,
  padding: "8px",
  borderRadius: borderradius,
  cursor: "pointer",
}));

const initialState = {
  viewMap: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setViewMap":
      return {
        ...state,
        viewMap: action.payload,
      };
    default:
      return state;
  }
};
const Top = (props) => {
  const { bannerCover, storeDetails, configData, logo } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const dispatchRedux = useDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:1460px)");
  const ACTION = {
    setViewMap: "setViewMap",
  };

  const openMapHandler = () => {
    dispatch({ type: ACTION.setViewMap, payload: true });
  };
  const { wishLists } = useSelector((state) => state.wishList);

  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
  const addToFavorite = () => {
    if (token) {
      addFavoriteMutation(storeDetails?.id, {
        onSuccess: (response) => {
          if (response) {
            dispatchRedux(addWishListStore(storeDetails));
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
    return !!wishLists?.store?.find(
      (wishStore) => wishStore.id === storeDetails?.id
    );
  };
  const onSuccessHandlerForDelete = (res) => {
    dispatchRedux(removeWishListStore(storeDetails?.id));
    toast.success(res.message, {
      id: "wishlist",
    });
  };
  const { mutate } = useWishListStoreDelete();
  const deleteWishlistStore = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete,
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          align="center"
          sx={{ position: "relative" }}
        >
          <CustomImageContainer
            src={bannerCover}
            width="100%"
            height={
              storeDetails?.discount ? "290px" : isSmall ? "220px" : "250px"
            }
            objectFit="contained"
            borderRadius="10px"
          />
          <Stack
            alignItems="flex-start"
            paddingRight={{
              xs: "5px",
              sm: "0px",
              position: "absolute",
              top: 20,
              right: 10,
            }}
          >
            {!isInWishList(storeDetails?.id) && (
              <RoundedIconButton onClick={addToFavorite}>
                <FavoriteBorderIcon color="primary" />
              </RoundedIconButton>
            )}
            {isInWishList(storeDetails?.id) && (
              <RoundedIconButton
                onClick={() => deleteWishlistStore(storeDetails?.id)}
              >
                <FavoriteIcon color="primary" />
              </RoundedIconButton>
            )}
          </Stack>
          {storeDetails?.free_delivery && <FreeDeliveryTag />}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CustomBoxFullWidth
            sx={{
              backgroundColor: "background.custom",
              p: "15px",
              height: storeDetails?.discount
                ? "100%"
                : isSmall
                ? "250px"
                : "250px",
              borderRadius: "15px",
            }}
          >
            <CustomStackFullWidth spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={2.5} md={3} lg={2.5} align="center">
                  <ImageWrapper>
                    <CustomImageContainer
                      src={logo}
                      width="100%"
                      height="100%"
                      objectFit="contained"
                      borderRadius="50%"
                    />
                    <ClosedNowScheduleWise
                      active={storeDetails?.active}
                      schedules={storeDetails?.schedules}
                      borderRadius="50%"
                    />
                  </ImageWrapper>
                </Grid>
                <Grid item xs={9} sm={8.5} md={9} lg={9.5}>
                  <CustomStackFullWidth spacing={2}>
                    <CustomStackFullWidth
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={3}
                    >
                      <Stack alignItems="flex-start" flexGrow={2}>
                        <H1 text={storeDetails?.name} textAlign="flex-start" />
                        <Typography color="customColor.textGray">
                          {storeDetails?.address}
                        </Typography>
                        <Link
                          href={`/review/${
                            storeDetails?.id
                              ? storeDetails?.id
                              : storeDetails?.slug
                          }`}
                          passHref
                        >
                          <Stack
                            direction="row"
                            alignItems="flex-start"
                            spacing={0.5}
                          >
                            <RatingStar fontSize="18px" color="warning.dark" />
                            <Typography fontWeight="bold">
                              {getNumberWithConvertedDecimalPoint(
                                storeDetails?.avg_rating,
                                configData?.digit_after_decimal_point
                              )}
                            </Typography>
                            <Typography>
                              ({storeDetails?.rating_count})
                            </Typography>
                          </Stack>
                        </Link>
                      </Stack>
                      <PrimaryWrapper
                        borderradius="8px"
                        onClick={() => openMapHandler()}
                      >
                        <Stack alignItems="center" justifyContent="center">
                          <PinDropIcon />
                          <Typography
                            sx={{ display: { xs: "none", sm: "inherit" } }}
                          >
                            {t("Location")}
                          </Typography>
                        </Stack>
                      </PrimaryWrapper>
                    </CustomStackFullWidth>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 2, sm: 3, md: 5 }}
                    >
                      <Stack alignItems="flex-start">
                        <Typography
                          textAlign="center"
                          variant="h5"
                          color="primary.main"
                          sx={{
                            fontSize: { xs: "14px", sm: "22px", md: "22px" },
                          }}
                        >
                          {storeDetails?.delivery_time}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.3}
                        >
                          <TimerIcon />
                          <Typography>{t("Delivery Time")}</Typography>
                        </Stack>
                      </Stack>

                      <Stack alignItems="flex-start">
                        <Typography
                          variant="h5"
                          color="primary.main"
                          sx={{
                            fontSize: { xs: "16px", sm: "22px", md: "22px" },
                          }}
                        >
                          {getAmountWithSign(storeDetails?.minimum_order)}
                        </Typography>
                        <Typography>{t("Minimum Order Value")}</Typography>
                      </Stack>
                    </Stack>
                  </CustomStackFullWidth>
                </Grid>
              </Grid>
              {storeDetails?.discount && (
                <DiscountInfo discount={storeDetails?.discount} />
              )}
            </CustomStackFullWidth>
          </CustomBoxFullWidth>
        </Grid>
      </Grid>
      {state.viewMap && (
        <LocationViewOnMap
          open={state.viewMap}
          handleClose={() =>
            dispatch({ type: ACTION.setViewMap, payload: false })
          }
          latitude={storeDetails?.latitude}
          longitude={storeDetails?.longitude}
          address={storeDetails?.address}
        />
      )}
    </>
  );
};

Top.propTypes = {};

export default Top;
