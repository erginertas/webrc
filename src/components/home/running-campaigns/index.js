import React, { useEffect, useState } from "react";
import H4 from "../../typographies/H4";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Grid, styled } from "@mui/material";
import { Box } from "@mui/system";
import useGetItemCampaigns from "../../../api-manage/hooks/react-query/useGetItemCampaigns";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
import SliderShimmer from "../SliderShimmer";
import { useRouter } from "next/router";
import { getModuleId } from "../../../helper-functions/getModuleId";
import { setCampaignItem } from "../../../redux/slices/cart";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { getCurrentModuleType } from "../../../helper-functions/getCurrentModuleType";
import FoodDetailModal from "../../food-details/foodDetail-modal/FoodDetailModal";
import { ACTION } from "../../product-details/product-details-section/states";
import { setRunningCampaigns } from "../../../redux/slices/storedData";

const ImageContainer = styled(Box)(({ theme }) => ({
  //position: "related",
  width: "100%",
  borderRadius: "8px",
  maxHeight: "200px",
  maxWidth: "200px",
  [theme.breakpoints.up("md")]: {
    height: "200px",
  },
  "&:hover": {
    boxShadow: "5px 0px 20px rgba(0, 54, 85, 0.15)",
    transform: "scale(1.03)",
    transition: "ease .5s",
  },
}));

const Shimmer = () => (
  <>
    {[...Array(4)].map((item, index) => {
      return (
        <Grid item xs={4} sm={4} md={2.4} key={index} align="center">
          <ImageContainer>
            <Skeleton variant="rectangle" height="100%" width="100%" />
          </ImageContainer>
        </Grid>
      );
    })}
  </>
);
const RunningCampaigns = () => {
  const { configData } = useSelector((state) => state.configData);
  const [openModal, setOpenModal] = useState(false);
  const [campaignsData, setCampaignsData] = useState({});
  const imageBaseUrl = configData?.base_urls?.campaign_image_url;
  const { data, refetch, isFetching, isLoading } = useGetItemCampaigns();
  const router = useRouter();
  const { runningCampaigns } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (runningCampaigns.length === 0) {
      refetch();
    }
  }, [runningCampaigns]);
  useEffect(() => {
    if (data) {
      dispatch(setRunningCampaigns(data));
    }
  }, [data]);
  const handleClick = (product) => {
    if (getCurrentModuleType() === "food") {
      setCampaignsData(product);
      setOpenModal(true);
    } else {
      dispatch(setCampaignItem(product));
      router.push(
        {
          pathname: "/product/[id]",
          query: {
            id: `${product?.slug ? product?.slug : product?.id}`,
            module_id: `${getModuleId()}`,
            product_type: "campaign",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      {isLoading ? (
        <SliderShimmer />
      ) : (
        <>
          {runningCampaigns && runningCampaigns.length > 0 && (
            <HomeComponentsWrapper alignItems="flex-start">
              <H4 text="Running Campaigns" />
              <Box sx={{ width: "100%", mt: "1rem" }}>
                <Grid container spacing={2}>
                  {runningCampaigns?.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={4}
                        sm={3}
                        md={2.4}
                        lg={2}
                        key={index}
                        align="center"
                        onClick={() => handleClick(item)}
                        sx={{ cursor: "pointer" }}
                      >
                        <ImageContainer>
                          <CustomImageContainer
                            src={`${configData?.base_urls?.campaign_image_url}/${item?.image}`}
                            alt={item?.title}
                            height="100%"
                            width="100%"
                            objectfit="cover"
                            borderRadius="8px"
                          />
                        </ImageContainer>
                      </Grid>
                    );
                  })}
                  {isFetching && <Shimmer />}
                </Grid>
              </Box>
            </HomeComponentsWrapper>
          )}
        </>
      )}
      {openModal && (
        <FoodDetailModal
          product={campaignsData}
          imageBaseUrl={imageBaseUrl}
          open={openModal}
          handleModalClose={handleClose}
        />
      )}
    </>
  );
};

export default RunningCampaigns;
