import React, { useEffect, useReducer } from "react";
import CustomSearch from "../../custom-search/CustomSearch";
import { Grid, IconButton } from "@mui/material";
import Sidebar from "./Sidebar";
import {
  CustomBoxFullWidth,
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useGetStoresCategoriesItem from "../../../api-manage/hooks/react-query/stores-categories/useGetStoresCategoriesItem";
import ProductCard from "../../cards/ProductCard";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";
import CustomPagination from "../../custom-pagination";
import useGetSearchedStoreItems from "../../../api-manage/hooks/react-query/store/useGetSearchedStoreItems";
import { ACTION, initialState, reducer } from "./states";
import CustomEmptyResult from "../../custom-empty-result";
import notFoundImage from "../../../../public/static/food-not-found.png";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import OutlinedGroupButtons from "../../group-buttons/OutlinedGroupButtons";
import { getModuleId } from "../../../helper-functions/getModuleId";

export const handleShimmerProducts = () => {
  return (
    <>
      {[...Array(3)].map((item, index) => {
        return (
          <Grid item key={index} xs={6} sm={4} md={3} lg={3}>
            <Skeleton variant="rectangle" width="100%" height="200px" />
          </Grid>
        );
      })}
    </>
  );
};
const MiddleSection = (props) => {
  const { storeDetails } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { t } = useTranslation();

  const router = useRouter();
  const { id } = router.query;
  const storeId = id;
  const limit = 12;
  const pageParams = {
    storeId: storeId,
    categoryId: state.categoryId,
    offset: state.offSet,
    minMax: state.minMax,
    type: state.type,
    limit: limit,
  };
  const handleSuccess = (res) => {
    if (res) {
      dispatch({ type: ACTION.setData, payload: res });
      dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
    }
  };
  const { refetch, isRefetching, isLoading } = useGetStoresCategoriesItem(
    pageParams,
    handleSuccess
  );
  // useEffect(() => {
  //   refetch();
  // }, []);
  useEffect(() => {
    if (state.searchKey === "" || !state.searchKey) {
      refetch();
    }
  }, [state.categoryId, state.offSet, state.type, id]);

  const searchPageParams = {
    storeId: storeId,
    searchKey: state.searchKey,
    offset: state.offSet,
    type: "all",
    limit: limit,
  };
  const handleSearchSuccess = (res) => {
    if (res) {
      dispatch({ type: ACTION.setData, payload: res });
    }
  };
  const { refetch: refetchSearchData, isFetched } = useGetSearchedStoreItems(
    searchPageParams,
    handleSearchSuccess
  );

  const handleCategoryId = (id) => {
    dispatch({ type: ACTION.setCategoryId, payload: id });
    dispatch({ type: ACTION.setIsSidebarOpen, payload: false });
  };
  const handleSearchResult = async (value) => {
    if (value !== "") {
      dispatch({ type: ACTION.setSearchKey, payload: value });
      dispatch({ type: ACTION.setOffSet, payload: 1 });
      dispatch({ type: ACTION.setMinMax, payload: [0, 1] });
    } else {
      dispatch({ type: ACTION.setSearchKey, payload: null });
      await refetch();
    }
  };
  useEffect(() => {
    state.searchKey && refetchSearchData();
  }, [state.searchKey]);
  useEffect(() => {
    if (JSON.stringify(state.minMax) !== JSON.stringify([0, 1])) {
      refetch();
    }
  }, [state.minMax]);

  const handleChangePrice = (value) => {
    dispatch({ type: ACTION.setMinMax, payload: value });
  };
  const handleSelection = (value) => {
    dispatch({ type: ACTION.setType, payload: value });
  };
  let moduleId;
  if (typeof window !== "undefined") {
    moduleId = getModuleId();
  }
  // const handlePriceFilterRange = (priceRange) => {
  //   if (priceRange.length > 0) {
  //     if (priceRange[0]?.min_price === priceRange[0]?.max_price) {
  //       return [
  //         {
  //           ...priceRange[0],
  //           min_price: 1,
  //         },
  //       ];
  //     }
  //   }
  //   return priceRange;
  // };
  return (
    <CustomBoxFullWidth>
      {moduleId && (
        <Grid container>
          <Grid item xs={0} sm={0} md={0} lg={2.5}>
            <Sidebar
              {...props}
              onClose={() =>
                dispatch({ type: ACTION.setIsSidebarOpen, payload: false })
              }
              open={state.isSidebarOpen}
              handleCategoryId={handleCategoryId}
              handleChangePrice={handleChangePrice}
              // priceFilterRange={handlePriceFilterRange(
              //   storeDetails?.price_range
              // )}
              priceFilterRange={storeDetails?.price_range}
              storesApiLoading={isRefetching}
              searchIsLoading={refetchSearchData}
              storeId={id}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={9.5}
            container
            spacing={3}
            alignItems="flex-start"
          >
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={moduleId === 4 ? 12 : 2} sm={6} md={6} lg={8}>
                <CustomStackFullWidth
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <IconButton
                    onClick={() =>
                      dispatch({ type: ACTION.setIsSidebarOpen, payload: true })
                    }
                    sx={{ display: { lg: "none" } }}
                  >
                    <MenuOpenIcon />
                  </IconButton>
                  {Number.parseInt(storeDetails?.module_id) ===
                    Number.parseInt(4) && (
                    <OutlinedGroupButtons
                      selected={state.type}
                      handleSelection={handleSelection}
                    />
                  )}
                </CustomStackFullWidth>
              </Grid>
              <Grid
                item
                xs={moduleId === 4 ? 12 : 10}
                sm={6}
                md={6}
                lg={4}
                align="right"
                justifyContent="center"
              >
                <CustomSearch
                  label={t("Search for items...")}
                  selectedValue={state.searchKey}
                  handleSearchResult={handleSearchResult}
                />
              </Grid>
              {state.data &&
                state.data?.products?.length > 0 &&
                state.data?.products?.map((item, index) => {
                  return (
                    <Grid item key={index} xs={12} sm={4} md={3} lg={3}>
                      <ProductCard item={item} changed_bg="true" />
                    </Grid>
                  );
                })}

              {isLoading && handleShimmerProducts()}
              {state.data?.products?.length === 0 && (
                <CustomEmptyResult
                  image={notFoundImage}
                  label="Nothing found"
                />
              )}
            </Grid>
            {state.data?.products?.length > 0 && (
              <Grid item xs={12} sm={12} md={12} align="center" mt="2rem">
                <CustomPagination
                  total_size={state.data?.total_size}
                  page_limit={pageParams?.limit}
                  offset={state.offSet}
                  setOffset={(value) =>
                    dispatch({ type: ACTION.setOffSet, payload: value })
                  }
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </CustomBoxFullWidth>
  );
};

export default MiddleSection;
