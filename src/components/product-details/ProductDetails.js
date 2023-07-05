import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Grid, NoSsr } from "@mui/material";
import ProductDetailsSection from "./product-details-section/ProductDetailsSection";
import ProductReviews from "./ProductReviews";
import MoreFromStore from "./MoreFromStore";
import SimilarProducts from "./SimilarProducts";
import useGetSimilarProduct from "../../api-manage/hooks/react-query/product-details/useGetSimilarProduct";
import FoodDetails from "../food-details";
import { useRouter } from "next/router";

const ProductDetails = ({ productDetailsData, configData }) => {
  return (
    <CustomStackFullWidth
      spacing={5}
      paddingTop={{ xs: "1.25rem", md: "2.5rem" }}
      paddingBottom="2.5rem"
      sx={{ minHeight: "100vh" }}
    >
      <ProductDetailsSection
        productDetailsData={productDetailsData}
        configData={configData}
      />
      {productDetailsData && !productDetailsData?.isCampaignItem && (
        <>
          <ProductReviews productDetailsId={productDetailsData?.id} />
          <NoSsr>
            <MoreFromStore productDetails={productDetailsData} />
          </NoSsr>
          <SimilarProducts productId={productDetailsData?.id} />
        </>
      )}
    </CustomStackFullWidth>
  );
};

export default ProductDetails;
