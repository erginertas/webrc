import React, { useEffect, useRef } from "react";
import {
  CustomStackFullWidth,
  SliderCustom,
} from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import { Typography, useTheme } from "@mui/material";
import ProductReviewCard from "./product-details-section/ProductReviewCard";
import { Stack } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductsThumbnailsSettings } from "./product-details-section/ProductsThumbnailsSettings";
import {
  IconButtonGray,
  LeftArrowStyle,
  RightArrowStyle,
} from "../home/best-reviewed-items/brt.style";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ProductsReviewSettings } from "./ProductsReviewSettings";
import useGetProductReviews from "../../api-manage/hooks/react-query/product-details/useProductReviews";
import { t } from "i18next";

const ProductReviews = ({ productDetailsId }) => {
  const theme = useTheme();
  const SliderRef = useRef(null);
  const { data, refetch } = useGetProductReviews(productDetailsId);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {data?.length > 0 && (
        <CustomStackFullWidth spacing={1}>
          <Typography fontWeight="600" variant="h5">
            {t("Reviews")}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ position: "relative" }}>
            <Stack
              width="100%"
              paddingLeft={{ xs: "0px", md: "50px" }}
              paddingRight={{ xs: "0px", md: "50px" }}
            >
              <SliderCustom>
                <Slider ref={SliderRef} {...ProductsReviewSettings}>
                  {data?.length > 0 &&
                    data?.map((item) => (
                      <ProductReviewCard key={item.id} review={item} />
                    ))}
                </Slider>
              </SliderCustom>
            </Stack>
          </Stack>
        </CustomStackFullWidth>
      )}
    </>
  );
};

export default ProductReviews;
