import React, { useEffect } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import H4 from "../../typographies/H4";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "react-slick";
import CustomImageContainer from "../../CustomImageContainer";
import useGetNewArrivalStores from "../../../api-manage/hooks/react-query/store/useGetNewArrivalStores";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { HomeComponentsWrapper } from "../HomePageComponents";
import { getStoresOrRestaurants } from "../../../helper-functions/getStoresOrRestaurants";
import ClosedNow from "../../closed-now";
import { t } from "i18next";
import { settings } from "./sliderSettings";
import {
  setNewArrivalStores,
  setRunningCampaigns,
} from "../../../redux/slices/storedData";

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "130px",
  width: "130px",
  borderRadius: "50%",
  boxShadow: "0px 4px 10px rgba(0, 54, 85, 0.1)",
  "&:hover": {
    boxShadow: "5px 0px 20px rgba(0, 54, 85, 0.15)",
    border: "2px solid",
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    height: "100px",
    width: "100px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "70px",
    width: "70px",
  },
}));

const NewArrivalStores = () => {
  const { data, refetch, isFetching } = useGetNewArrivalStores({ type: "all" });
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;
  const newA = t("New Arrival");
  const title = `${newA} ${getStoresOrRestaurants()}`;
  const { newArrivalStores } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (newArrivalStores.length === 0) {
      refetch();
    }
  }, [newArrivalStores]);
  useEffect(() => {
    if (data) {
      dispatch(setNewArrivalStores(data));
    }
  }, [data]);

  return (
    <HomeComponentsWrapper sx={{ paddingTop: "1rem", gap: "1.3rem" }}>
      {newArrivalStores && newArrivalStores.length > 0 && (
        <>
          <CustomStackFullWidth alignItems="flex-start">
            <H4 text={title} />
          </CustomStackFullWidth>
          <Slider {...settings}>
            {newArrivalStores?.map((item, index) => {
              return (
                <Box key={index}>
                  <Link
                    href={{
                      pathname: `/store/[id]`,
                      query: {
                        id: `${item?.id}`,
                        module_id: `${moduleId}`,
                      },
                    }}
                  >
                    <ImageWrapper>
                      <CustomImageContainer
                        src={`${store_image_url}/${item?.logo}`}
                        alt={item?.title}
                        height="100%"
                        width="100%"
                        objectfit="contained"
                        borderRadius="50%"
                      />
                      <ClosedNow
                        active={item?.active}
                        open={item?.open}
                        borderRadius="50%"
                      />
                    </ImageWrapper>
                  </Link>
                </Box>
              );
            })}
          </Slider>
        </>
      )}
      {isFetching && (
        <ImageWrapper>
          <Skeleton variant="circular" height="100%" width="100%" />
        </ImageWrapper>
      )}
    </HomeComponentsWrapper>
  );
};

export default NewArrivalStores;
