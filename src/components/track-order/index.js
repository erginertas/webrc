import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import useGetTrackOrderData from "../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import {
  Divider,
  Grid,
  Skeleton,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { HeadingBox } from "../my-orders/myorders.style";
import CustomFormatedDateTime from "../date/CustomFormatedDateTime";
import CustomFormatedTime from "../date/CustomFormatedTime";
import { useTranslation } from "react-i18next";
import DeliverymanInfo from "./DeliverymanInfo";
import DeliverymanShimmer from "./DeliverymanShimmer";
import MapComponent from "../Map/location-view/MapComponent";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { CustomStepperStyled, StepBox } from "./trackOrder.style";
import { useTheme } from "@emotion/react";

const TrackOrder = ({ configData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const [actStep, setActStep] = useState(1);
  const { refetch: refetchTrackOrder, data: trackOrderData } =
    useGetTrackOrderData(id);
  useEffect(() => {
    refetchTrackOrder();
  }, []);
  const deliveryLat = trackOrderData?.delivery_address?.latitude;
  const deliveryLong = trackOrderData?.delivery_address?.longitude;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const steps = [
    {
      label: "Order placed",
      time: trackOrderData?.pending,
    },
    {
      label: "Order Confirmed",
      time: trackOrderData?.confirmed,
    },
    {
      label: "Preparing Food",
      time: trackOrderData?.processing,
    },
    {
      label: "Food is on the way",
      time: trackOrderData?.picked_up,
    },
    {
      label: "Delivered",
      time: trackOrderData?.delivered,
    },
  ];
  useEffect(() => {
    if (trackOrderData?.order_status === "panding") {
      setActStep(1);
    } else if (trackOrderData?.order_status === "confirmed") {
      setActStep(2);
    } else if (
      trackOrderData?.order_status === "processing" ||
      trackOrderData?.order_status === "handover"
    ) {
      setActStep(3);
    } else if (trackOrderData?.order_status === "picked_up") {
      setActStep(4);
    } else if (trackOrderData?.order_status === "delivered") {
      setActStep(5);
    }
  }, [actStep, trackOrderData]);
  return (
    <CustomPaperBigCard>
      <Grid container item md={12} xs={12}>
        <Grid item md={12} xs={12} align="center">
          {trackOrderData ? (
            <HeadingBox>
              <Typography
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "36px",
                  fontWeight: "600",
                }}
              >
                #{trackOrderData?.id}
              </Typography>
              <CustomStackFullWidth
                alignItems="center"
                justifyContent="center"
                direction="row"
                spacing={0.5}
              >
                <Typography>{t("Order placed at")}</Typography>
                <Typography>
                  <CustomFormatedDateTime date={trackOrderData?.created_at} />
                </Typography>
              </CustomStackFullWidth>
            </HeadingBox>
          ) : (
            <CustomStackFullWidth alignItems="center">
              <Skeleton variant="text" width="20%" height="20px" />
              <Skeleton variant="text" width="20%" height="20px" />
            </CustomStackFullWidth>
          )}
          <Divider />
        </Grid>
        <Grid item md={12} xs={12}>
          <SimpleBar style={{ height: isSmall ? "250px" : "190px" }}>
            <StepBox>
              <CustomStepperStyled activeStep={actStep} alternativeLabel>
                {steps.map((labels, index) => (
                  <Step key={labels}>
                    <StepLabel>
                      <Typography>{t(labels.label)}</Typography>
                      {trackOrderData ? (
                        <Typography>
                          {labels.time !== null ? (
                            <CustomFormatedTime date={labels.time} />
                          ) : (
                            ""
                          )}
                        </Typography>
                      ) : (
                        <Skeleton variant="text" />
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </CustomStepperStyled>
            </StepBox>
          </SimpleBar>
        </Grid>
        <Grid item md={12} xs={12}>
          <MapComponent latitude={deliveryLat} longitude={deliveryLong} />
        </Grid>
        <Grid item md={12} xs={12} align="center" pt="2rem">
          {trackOrderData ? (
            trackOrderData?.delivery_man ? (
              <DeliverymanInfo
                data={trackOrderData}
                configData={configData}
                t={t}
              />
            ) : (
              <Typography>{t("Delivery man has not been assigned")}</Typography>
            )
          ) : (
            <DeliverymanShimmer />
          )}
        </Grid>
      </Grid>
    </CustomPaperBigCard>
  );
};

TrackOrder.propTypes = {};

export default TrackOrder;
