import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import TabsTypeOne from "../custom-tabs/TabsTypeOne";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import H1 from "../typographies/H1";
import ProductCard from "../cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useWishListDelete } from "../../api-manage/hooks/react-query/wish-list/useWishListDelete";
import { removeWishListItem } from "../../redux/slices/wishList";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import { Stack } from "@mui/system";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../../../public/static/nodata.png";
import PushNotificationLayout from "../PushNotificationLayout";
import { getItemsOrFoods } from "../../helper-functions/getItemsOrFoods";
import { getStoresOrRestaurants } from "../../helper-functions/getStoresOrRestaurants";
import {useTheme} from "@mui/material/styles";

const WishLists = (props) => {
  const { configData, t } = props;
  const tabsData = [
    {
      title: getItemsOrFoods(),
      value: getItemsOrFoods(),
    },
    {
      title: getStoresOrRestaurants(),
      value: getStoresOrRestaurants(),
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabsData[0].value);
  const { wishLists } = useSelector((state) => state.wishList);
  const theme=useTheme()
  const matches = useMediaQuery("(max-width:1100px)");
  const dispatch = useDispatch();
  const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const onSuccessHandlerForDelete = (res) => {
    if (res) {
      dispatch(removeWishListItem(res));
    }
  };
  const { mutate } = useWishListDelete(onSuccessHandlerForDelete);

  const deleteWishlistItem = (id) => {
    mutate(id, {
      onSuccess: onSuccessHandlerForDelete(id),
    });
  };
  const empty_items_text = `No favourite ${getItemsOrFoods()} found`;
  const empty_stores_text = `No favourite ${getStoresOrRestaurants()} found`;

  return (
    <PushNotificationLayout>
      <CustomPaperBigCard sx={{ minHeight: "70vh" }} padding="20px" backgroundcolor={theme.palette.background.custom2}>
        <CustomStackFullWidth
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <TabsTypeOne
            tabs={tabsData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            t={t}
          />
          <Grid
            container
            sx={{ width: "100%" }}
            spacing={{ xs: 1, sm: 1, md: 2 }}
          >
            <Grid item xs={12}>
              <CustomStackFullWidth
                alignItems="flex-start"
                justifyContent="center"
                paddingY="10px"
              >
                <H1 text="Your Wishlist" />
              </CustomStackFullWidth>
            </Grid>
            {wishLists ? (
              <>
                {currentTab === getItemsOrFoods() && (
                  <>
                    {wishLists?.item?.map((product) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={matches ? 6 : 4}
                          key={product?.id}
                          aligns="left"
                        >
                          <ProductCard
                            item={product}
                            cardheight="185px"
                            horizontalcard="true"
                            wishlistcard="true"
                            deleteWishlistItem={deleteWishlistItem}
                          />
                        </Grid>
                      );
                    })}
                    {wishLists?.item?.length === 0 && (
                      <CustomEmptyResult
                        label={t(empty_items_text)}
                        image={nodataimage}
                      />
                    )}
                  </>
                )}
                {currentTab === getStoresOrRestaurants() && (
                  <>
                    {wishLists?.store?.map((item) => {
                      return (
                        <Grid item xs={12} sm={6} md={3} key={item?.id}>
                          <StoresInfoCard
                            data={item}
                            wishlistcard="true"
                            moduleId={moduleId}
                          />
                        </Grid>
                      );
                    })}
                    {wishLists?.store?.length === 0 && (
                      <CustomEmptyResult
                        label={t(empty_stores_text)}
                        image={nodataimage}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <Typography>loading</Typography>
            )}
          </Grid>
        </CustomStackFullWidth>
      </CustomPaperBigCard>
    </PushNotificationLayout>
  );
};

WishLists.propTypes = {};

export default WishLists;
