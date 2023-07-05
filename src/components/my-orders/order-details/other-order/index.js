import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../../styled-components/CustomStyles.style";
import useGetTrackOrderData from "../../../../api-manage/hooks/react-query/order/useGetTrackOrderData";
import TopDetails from "../TopDetails";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { OrderStatusBox, OrderStatusGrid } from "../../myorders.style";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import { useTheme } from "@emotion/react";
import RefundDetails from "./RefundDetails";
import StoreDetails from "./StoreDetails";
import OrderSummery from "./OrderSummery";
import Link from "next/link";
import { PrimaryButton } from "../../../Map/map.style";
import { Box, Stack } from "@mui/system";
import OrderDetailsBottom from "./OrderDetailsBottom";
import PaymentUpdate from "./PaymentUpdate";
import RefundModal from "./RefundModal";
import PrescriptionOrderSummery from "../prescription-order/PrescriptionOrderSummery";
import { useStoreRefundRequest } from "../../../../api-manage/hooks/react-query/refund-request/useStoreRefundRequest";
import { toast } from "react-hot-toast";
import { onErrorResponse } from "../../../../api-manage/api-error-response/ErrorResponses";
import SingleOrderAttachment from "../singleOrderAttachment";
import {getCurrentModuleType} from "../../../../helper-functions/getCurrentModuleType";

const OtherOrder = (props) => {
  const { configData, data, refetch } = props;
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  const theme = useTheme();
  const { refetch: refetchTrackOrder, data: trackOrderData } =
    useGetTrackOrderData(id);
  useEffect(() => {
    refetchTrackOrder();
  }, []);


  const { mutate, isLoading: refundIsLoading } = useStoreRefundRequest();
  const formSubmitHandler = (values) => {
    const tempValue = { ...values, id };
    const onSuccessHandler = async (resData) => {
      if (resData) {
        await refetchTrackOrder();
        toast.success(resData.message);
        setOpenModal(false);
      }

      // router.push('/')
    };
    mutate(tempValue, {
      onSuccess: onSuccessHandler,
      onError: onErrorResponse,
    });
  };
  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="center"
      mb="2rem"
      spacing={2}
    >
      <TopDetails data={data} trackData={trackOrderData} />
      <CustomPaperBigCard>
        <Grid container item md={12} lg={12} xs={12} spacing={3}>
          <Grid item md={7}>
            <OrderStatusBox>
              <OrderStatusGrid container md={12} xs={12}>
                <Grid item md={5} xs={12}>
                  <Typography sx={{ fontWeight: "600" }} align="left">
                    {t("Payment method")}
                  </Typography>
                  {trackOrderData ? (
                    <Typography
                      sx={{
                        fontWeight: "700",
                        color: (theme) => theme.palette.primary.main,
                        textTransform: "capitalize",
                      }}
                      align="left"
                    >
                      {trackOrderData &&
                        t(trackOrderData?.payment_method.replaceAll("_", " "))}
                    </Typography>
                  ) : (
                    <Skeleton width="100px" variant="text" />
                  )}


                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontWeight: "500" }} align="left">
                      {t("Amount")}:
                    </Typography>
                    {trackOrderData ? (
                      <Typography sx={{ fontWeight: "500" }} align="left">
                        {trackOrderData &&
                          getAmountWithSign(trackOrderData?.order_amount)}
                      </Typography>
                    ) : (
                      <Skeleton width="100px" variant="text" />
                    )}
                  </Stack>
                </Grid>
                <Grid item md={7} xs={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontWeight: "500" }} align="left">
                      {t("Order Status")} :
                    </Typography>
                    {trackOrderData ? (
                      <Typography
                        component="span"
                        textTransform="capitalize"
                        color={theme.palette.info.dark}
                        align="left"
                      >
                        {trackOrderData &&
                          t(
                            (trackOrderData?.order_status).replaceAll("_", " ")
                          )}
                      </Typography>
                    ) : (
                      <Skeleton width="100px" variant="text" />
                    )}
                  </Stack>
                  {trackOrderData &&
                    trackOrderData?.order_status === "canceled" && (
                      <>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography sx={{ fontWeight: "500" }} align="left">
                            {t("Cancelled By")} :
                          </Typography>
                          {trackOrderData ? (
                            <Typography
                              component="span"
                              textTransform="capitalize"
                              color={theme.palette.info.dark}
                              align="left"
                            >
                              {trackOrderData?.canceled_by}
                            </Typography>
                          ) : (
                            <Skeleton width="100px" variant="text" />
                          )}
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography sx={{ fontWeight: "500" }} align="left">
                            {t("Cancellation Reason")} :
                          </Typography>
                          {trackOrderData ? (
                            <Typography
                              component="span"
                              textTransform="capitalize"
                              color={theme.palette.info.dark}
                              align="left"
                            >
                              {trackOrderData?.cancellation_reason}
                            </Typography>
                          ) : (
                            <Skeleton width="100px" variant="text" />
                          )}
                        </Stack>
                      </>
                    )}
                  <Typography sx={{ fontWeight: "500" }} align="left">
                    {t("Payment Status")} :{" "}
                    {trackOrderData &&
                    trackOrderData?.payment_status === "paid" ? (
                      <span
                        style={{
                          color: theme.palette.success.light,
                        }}
                      >
                        {t("Paid")}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {t("Unpaid")}
                      </span>
                    )}
                  </Typography>
                </Grid>
                <Grid item  xs={12}>
                  {
                      trackOrderData && trackOrderData?.module_type==='food' && trackOrderData?.cutlery &&  <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ fontWeight: "500" }} align="left">
                          {t("Cutlery")} :
                        </Typography>
                        {trackOrderData ? (
                            <Typography
                                component="span"
                                textTransform="capitalize"
                                align="left"
                            >
                              {t('Yes')}
                            </Typography>
                        ) : (
                            <Skeleton width="100px" variant="text" />
                        )}
                      </Stack>
                  }
                  {
                      trackOrderData && trackOrderData?.delivery_instruction &&  <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ fontWeight: "500" }} align="left">
                          {t("Delivery instruction")} :
                        </Typography>
                        {trackOrderData ? (
                            <Typography
                                component="span"
                                textTransform="capitalize"
                                align="left"
                            >
                              {t(trackOrderData?.delivery_instruction)}
                            </Typography>
                        ) : (
                            <Skeleton width="100px" variant="text" />
                        )}
                      </Stack>
                  }
                  {
                      trackOrderData && trackOrderData?.unavailable_item_note &&  <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography sx={{ fontWeight: "500" }} align="left">
                          {t("Unavailable item note")} :
                        </Typography>
                        {trackOrderData ? (
                            <Typography
                                component="span"
                                // textTransform="capitalize"
                                align="left"
                            >
                              {t(trackOrderData?.unavailable_item_note)}
                            </Typography>
                        ) : (
                            <Skeleton width="100px" variant="text" />
                        )}
                      </Stack>
                  }
                </Grid>
                <RefundDetails
                  trackOrderData={trackOrderData}
                  configData={configData}
                  t={t}
                />
                { !data?.prescription_order &&  trackOrderData?.module_type === "pharmacy" &&
                  trackOrderData?.order_attachment && (
                    <SingleOrderAttachment
                      title="Prescription"
                      attachment={trackOrderData?.order_attachment}
                      configData={configData}
                    />
                  )}
              </OrderStatusGrid>
            </OrderStatusBox>
            {trackOrderData ? (
              <StoreDetails
                trackOrderData={trackOrderData}
                configData={configData}
                t={t}
              />
            ) : (
              <Skeleton variant="text" width="100%" height="250px" />
            )}
          </Grid>
          <Grid item md={5} xs={12}>
            {data?.prescription_order ? (
              <PrescriptionOrderSummery
                data={data}
                trackOrderData={trackOrderData}
              />
            ) : (
              trackOrderData && (
                <OrderSummery
                  trackOrderData={trackOrderData}
                  configData={configData}
                  t={t}
                  data={data}
                />
              )
            )}
          </Grid>
        </Grid>
      </CustomPaperBigCard>
      {data &&
        !data?.[0]?.item_campaign_id  &&
        trackOrderData &&
        trackOrderData?.order_status === "delivered" && (
          <CustomPaperBigCard>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={configData?.refund_active_status ? 6 : 12}
              >
                <Link href={`/rate-and-review/${id}`}>
                  <PrimaryButton variant="contained" sx={{ width: "100%" }}>
                    {t("Give a review")}
                  </PrimaryButton>
                </Link>
              </Grid>
              {configData?.refund_active_status && (
                <Grid item xs={12} sm={12} md={6}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      color: (theme) => theme.palette.primary.main,
                    }}
                    onClick={() => setOpenModal(true)}
                  >
                    {t("Refund Request")}
                  </Button>
                </Grid>
              )}
            </Grid>
          </CustomPaperBigCard>
        )}
      {trackOrderData &&
        (trackOrderData?.order_status === "confirmed" ||
          trackOrderData?.order_status === "accepted" ||
          trackOrderData?.order_status === "picked_up" ||
          trackOrderData?.order_status === "pending" ||
          trackOrderData?.order_status === "processing" ||
          trackOrderData?.order_status === "handover") && (
          <Box sx={{ marginTop: "1rem" }} width="100%">
            <OrderDetailsBottom
              id={id}
              refetchOrderDetails={refetch}
              refetchTrackData={refetchTrackOrder}
              trackData={trackOrderData}
            />
          </Box>
        )}
      {trackOrderData && trackOrderData?.order_status === "failed" && (
        <PaymentUpdate
          id={id}
          refetchOrderDetails={refetch}
          refetchTrackData={refetchTrackOrder}
          trackData={trackOrderData}
        />
      )}
      <RefundModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        // reasons={reasonsData?.refund_reasons}
        formSubmit={formSubmitHandler}
        // refundIsLoading={refundIsLoading}
      />
    </CustomStackFullWidth>
  );
};

OtherOrder.propTypes = {};

export default OtherOrder;
