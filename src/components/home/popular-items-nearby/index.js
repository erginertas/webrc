import React, { useEffect } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import H4 from "../../typographies/H4";
import ProductCard, { CardWrapper } from "../../cards/ProductCard";
import useGetPopularItemsNearby from "../../../api-manage/hooks/react-query/useGetPopularItemsNearby";
import { settings } from "./SliderSettings";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { Grid, Skeleton } from "@mui/material";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeaturedCategories,
  setPopularItemsNearby,
} from "../../../redux/slices/storedData";
import ProductCardShimmer from "../../search/ProductCardShimmer";

export const Shimmer = () => {
  return (
    <CardWrapper>
      <Skeleton variant="rectangle" height="100%" width="100%" />
    </CardWrapper>
  );
};
const PopularItemsNearby = () => {
  const { popularItemsNearby } = useSelector((state) => state.storedData);
  const { data, refetch, isFetching } = useGetPopularItemsNearby({
    offset: 1,
    type: "all",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularItemsNearby.products.length === 0) {
      refetch();
    }
  }, [popularItemsNearby]);

  useEffect(() => {
    if (data) {
      dispatch(setPopularItemsNearby(data));
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <HomeComponentsWrapper>
      {popularItemsNearby && popularItemsNearby?.products?.length > 0 && (
        <>
          <CustomStackFullWidth alignItems="flex-start">
            <H4 text="Popular Items Nearby" />
          </CustomStackFullWidth>
          <Slider {...settings}>
            {popularItemsNearby?.products?.map((item, index) => {
              return <ProductCard key={index} item={item} />;
            })}
          </Slider>
        </>
      )}

      {isFetching && (
        <Grid container>
          <ProductCardShimmer />
        </Grid>
      )}
    </HomeComponentsWrapper>
  );
};

export default PopularItemsNearby;
