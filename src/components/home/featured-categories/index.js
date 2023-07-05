import React, { useEffect, useRef } from "react";
import {
  CustomStackFullWidth,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import H4 from "../../typographies/H4";

import Slider from "react-slick";
import { Stack } from "@mui/system";
import FeaturedItemCard, { Card } from "./card";
import { styled } from "@mui/material";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { settings } from "./sliderSettings";
import { useGetFeaturedCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { Skeleton } from "@mui/material";
import SliderShimmer from "../SliderShimmer";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedCategories } from "../../../redux/slices/storedData";

export const ButtonLeft = styled(CustomButtonPrimary)(
  ({ theme, language_direction }) => ({
    minWidth: "20px",
    width: "10px",
    height: "30px",
    borderRadius: "50%",
    transform: language_direction === "rtl" && "rotate(180deg)",
  })
);
export const ButtonRight = styled(CustomButtonPrimary)(({ theme }) => ({
  minWidth: "20px",
  width: "10px",
  height: "30px",
  borderRadius: "50%",
  color: "black",
  background: theme.palette.neutral[200],
  "&:hover": {
    background: theme.palette.neutral[400],
  },
}));

const FeaturedCategories = ({ configData }) => {
  const { featuredCategories } = useSelector((state) => state.storedData);
  const slider = useRef(null);
  const { data, refetch, isFetched, isFetching, isLoading, isRefetching } =
    useGetFeaturedCategories();
  const dispatch = useDispatch();
  useEffect(() => {
    if (featuredCategories.length === 0) {
      refetch();
    }
  }, [featuredCategories]);

  useEffect(() => {
    if (data) {
      dispatch(setFeaturedCategories(data?.data));
    }
  }, [data]);

  return (
    <>
      {isRefetching ? (
        <SliderShimmer />
      ) : (
        featuredCategories &&
        featuredCategories.length > 0 && (
          <HomeComponentsWrapper>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <H4 text="Categories" />
            </CustomStackFullWidth>
            {featuredCategories && featuredCategories.length > 0 && (
              <SliderCustom nopadding="true">
                <Slider {...settings} ref={slider}>
                  {featuredCategories?.map((item, index) => {
                    return (
                      <FeaturedItemCard
                        key={index}
                        image={`${configData?.base_urls?.category_image_url}/${item?.image}`}
                        title={item?.name}
                        id={item?.id}
                      />
                    );
                  })}
                </Slider>
              </SliderCustom>
            )}
          </HomeComponentsWrapper>
        )
      )}
    </>
  );
};

export default FeaturedCategories;
