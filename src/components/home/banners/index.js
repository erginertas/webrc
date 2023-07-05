import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import useGetBanners from "../../../api-manage/hooks/react-query/useGetBanners";
import { styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { getModuleId } from "../../../helper-functions/getModuleId";
import FoodDetailModal from "../../food-details/foodDetail-modal/FoodDetailModal";
import { setBanners } from "../../../redux/slices/storedData";

const BannersWrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "10px",
  width: "100%",
  height: "360px",
  [theme.breakpoints.down("md")]: {
    height: "200px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
}));
const Banners = (props) => {
  const router = useRouter();
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { banners } = useSelector((state) => state.storedData);
  const { data, refetch: refetchBannerData, isFetching } = useGetBanners();
  const [bannersData, setBannersData] = useState([]);
  const [foodBanner, setFoodBanner] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { configData } = useSelector((state) => state.configData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (banners.banners.length === 0 && banners.campaigns.length === 0) {
      refetchBannerData();
    }
  }, [banners]);
  useEffect(() => {
    if (data) {
      dispatch(setBanners(data));
    }
  }, [data]);
  useEffect(() => {
    if (banners.banners.length > 0 || banners.campaigns.length > 0) {
      handleBannersData();
    }
  }, [banners]);

  const handleBannersData = () => {
    let mergedBannerData = [];
    if (banners?.banners?.length > 0) {
      banners?.banners?.forEach((item) => mergedBannerData.push(item));
    }
    if (banners?.campaigns?.length > 0) {
      banners?.campaigns?.forEach((item) =>
        mergedBannerData.push({ ...item, isCampaign: true })
      );
    }
    setBannersData(mergedBannerData);
  };
  const handleBannerClick = (banner) => {
    if (banner?.isCampaign) {
      router.push(
        {
          pathname: "/campaigns/[id]",
          query: { id: `${banner?.id}`, module_id: `${getModuleId()}` },
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (banner?.type === "store_wise") {
        router.push(
          {
            pathname: "/store/[id]",
            query: {
              id: `${
                banner?.store?.slug ? banner?.store?.slug : banner?.store?.id
              }`,
              module_id: `${getModuleId()}`,
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        if (banner?.type === "item_wise") {
          if (selectedModule?.module_type === "food") {
            setFoodBanner(banner?.item);
            setOpenModal(true);
          } else {
            router.push(
              {
                pathname: "/product/[id]",
                query: {
                  id: `${
                    banner?.item?.slug ? banner?.item?.slug : banner?.item?.id
                  }`,
                  module_id: `${getModuleId()}`,
                },
              },
              undefined,
              { shallow: true }
            );
          }
        }
      }
    }
  };
  const handleModalClose = () => {
    setOpenModal(false);
    //setBannerData(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  const isSmall = useMediaQuery("(max-width:1180px)");

  return (
    <>
      <CustomStackFullWidth sx={{ mt: isSmall && "1.5rem" }}>
        <Slider {...settings}>
          {bannersData.length > 0 &&
            bannersData?.map((item, index) => {
              return (
                <BannersWrapper
                  key={index}
                  className="slider-dots"
                  onClick={() => handleBannerClick(item)}
                >
                  <CustomImageContainer
                    src={`${
                      item?.isCampaign
                        ? configData?.base_urls?.campaign_image_url
                        : configData?.base_urls?.banner_image_url
                    }/${item?.image}`}
                    alt={item?.title}
                    height="100%"
                    width="100%"
                    objectfit="cover"
                    borderRadius="10px"
                  />
                </BannersWrapper>
              );
            })}
          {isFetching && (
            <BannersWrapper>
              <Skeleton variant="rectangle" width="100%" height="100%" />
            </BannersWrapper>
          )}
        </Slider>
      </CustomStackFullWidth>
      {openModal && foodBanner && (
        <FoodDetailModal
          product={foodBanner}
          image={`${configData?.base_urls?.item_image_url}/${foodBanner?.image}`}
          open={openModal}
          handleModalClose={handleModalClose}
          setOpen={setOpenModal}
        />
      )}
    </>
  );
};

Banners.propTypes = {};

export default Banners;
