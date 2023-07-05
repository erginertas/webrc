import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import Banners from "./banners";
import FeaturedCategories from "./featured-categories";
import NewArrivalStores from "./new-arrival-stores";
import PopularItemsNearby from "./popular-items-nearby";
import RunningCampaigns from "./running-campaigns";
import BestReviewedItems from "./best-reviewed-items";
import StoresWithFilter from "./stores-with-filter";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useWishListGet } from "../../api-manage/hooks/react-query/wish-list/useWishListGet";
import { setWishList } from "../../redux/slices/wishList";
import PushNotificationLayout from "../PushNotificationLayout";
import HomeSearch from "../search/HomeSearch";
import { Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import ManageSearch from "../header/second-navbar/ManageSearch";
import DeliveryPlace from "./DeliveryPlace";
import { Box, Stack } from "@mui/system";
import { CustomBoxFullWidth } from "../chat/Chat.style";

export const HomeComponentsWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "8px",
}));

const HomePageComponents = ({ configData }) => {
  const [wishListsData, setWishListsData] = useState();
  const matches = useMediaQuery("(max-width:1180px)");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const dispatch = useDispatch();
  let zoneid = undefined;
  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
  }
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const onSuccessHandler = (response) => {
    setWishListsData(response);
    dispatch(setWishList(response));
  };
  const { refetch } = useWishListGet(onSuccessHandler);
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, []);
  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);
  return (
    <PushNotificationLayout>
      {matches && (
        <>
          <CustomStackFullWidth
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <DeliveryPlace />
            <ManageSearch
              zoneid={zoneid}
              token={token}
              router={router}
              maxwidth="false"
            />
          </CustomStackFullWidth>
        </>
      )}
      <Box width="100%">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Banners />
          </Grid>
          <Grid item xs={12} sx={{marginTop:'10px'}}>
            <FeaturedCategories configData={configData} />
          </Grid>
          <Grid item xs={12}>
            <PopularItemsNearby />
          </Grid>
          <Grid item xs={12}>
            <RunningCampaigns />
          </Grid>
          <Grid item xs={12}>
            <NewArrivalStores />
          </Grid>
          <Grid item xs={12}>
            <BestReviewedItems />
          </Grid>
          <Grid item xs={12}>
            <StoresWithFilter />
          </Grid>
        </Grid>
      </Box>
      <CustomStackFullWidth></CustomStackFullWidth>
    </PushNotificationLayout>
  );
};

export default HomePageComponents;
