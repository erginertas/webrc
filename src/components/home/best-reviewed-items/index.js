import React, { useEffect, useRef } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import H4 from "../../typographies/H4";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
import { Box } from "@mui/system";
import frame from "./Frame.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useGetMostReviewed from "../../../api-manage/hooks/react-query/useGetMostReviewed";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../../cards/ProductCard";
import { bestReviewedSliderSettings } from "./SliderSettings";
import { IconButtonGray, LeftArrowStyle, RightArrowStyle } from "./brt.style";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { getItemsOrFoods } from "../../../helper-functions/getItemsOrFoods";
import { t } from "i18next";
import { getLanguage } from "../../../helper-functions/getLanguage";
import { useDispatch, useSelector } from "react-redux";
import { setBestReviewedItems } from "../../../redux/slices/storedData";

const BestReviewedItems = (props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.up("sm"));
  const SliderRef = useRef(null);
  const { data, refetch } = useGetMostReviewed({ type: "all" });
  const best = t("Best Reviewed");
  const title = `${best} ${getItemsOrFoods()}`;
  const { bestReviewedItems } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (bestReviewedItems.products.length === 0) {
      refetch();
    }
  }, [bestReviewedItems]);
  useEffect(() => {
    if (data) {
      dispatch(setBestReviewedItems(data));
    }
  }, [data]);
  const slides = () =>
    bestReviewedItems?.products?.map((product) => (
      <ProductCard key={product?.id} item={product} />
    ));

  return (
    <>
      {bestReviewedItems && bestReviewedItems?.products?.length > 0 && (
        <HomeComponentsWrapper sx={{ paddingTop: "1rem" }}>
          <CustomStackFullWidth alignItems="flex-start">
            <H4 text={title} />
          </CustomStackFullWidth>
          <Grid
            container
            spacing={{ xs: 1, md: 1, lg: 1 }}
            justifyContent="left"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={2.5} lg={2.5}>
              <Box
                sx={{
                  height: { xs: "160px", sm: "250px", md: "300px" },
                  padding: "1rem",
                }}
              >
                <CustomImageContainer
                  src={frame.src}
                  height="100%"
                  borderRadius=".7rem"
                  objectfit="contain"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9.5} sm={12} lg={9.5}>
              <Grid item md={12} container position="relative">
                <CustomStackFullWidth justifyContent="right">
                  {isMedium && bestReviewedItems?.products?.length > 3 && (
                    <LeftArrowStyle top="45%" left={0}>
                      <IconButtonGray
                        onClick={() => SliderRef.current.slickPrev()}
                      >
                        {getLanguage() === "rtl" ? (
                          <ArrowForwardIosIcon fontSize="small" />
                        ) : (
                          <ArrowBackIosNewIcon fontSize="small" />
                        )}
                      </IconButtonGray>
                    </LeftArrowStyle>
                  )}
                  {isSmall && bestReviewedItems?.products?.length > 2 && (
                    <LeftArrowStyle left={0}>
                      <IconButtonGray
                        onClick={() => SliderRef.current.slickPrev()}
                      >
                        {getLanguage() === "rtl" ? (
                          <ArrowForwardIosIcon fontSize="small" />
                        ) : (
                          <ArrowBackIosNewIcon fontSize="small" />
                        )}
                      </IconButtonGray>
                    </LeftArrowStyle>
                  )}

                  {isMedium && bestReviewedItems?.products?.length > 3 && (
                    <RightArrowStyle top="45%" right={0}>
                      <IconButtonGray
                        onClick={() => SliderRef.current.slickNext()}
                      >
                        {getLanguage() === "rtl" ? (
                          <ArrowBackIosNewIcon fontSize="small" />
                        ) : (
                          <ArrowForwardIosIcon fontSize="small" />
                        )}
                      </IconButtonGray>
                    </RightArrowStyle>
                  )}
                  {isSmall && bestReviewedItems?.products?.length > 2 && (
                    <RightArrowStyle right={0}>
                      <IconButtonGray
                        onClick={() => SliderRef.current.slickNext()}
                      >
                        {getLanguage() === "rtl" ? (
                          <ArrowBackIosNewIcon fontSize="small" />
                        ) : (
                          <ArrowForwardIosIcon fontSize="small" />
                        )}
                      </IconButtonGray>
                    </RightArrowStyle>
                  )}
                  <Slider ref={SliderRef} {...bestReviewedSliderSettings}>
                    {slides()}
                  </Slider>
                </CustomStackFullWidth>
              </Grid>
            </Grid>
          </Grid>
        </HomeComponentsWrapper>
      )}
    </>
  );
};

BestReviewedItems.propTypes = {};

export default BestReviewedItems;
