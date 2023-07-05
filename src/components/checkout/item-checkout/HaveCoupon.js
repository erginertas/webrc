import React, { useEffect, useState } from "react";
import { Grid, InputBase } from "@mui/material";
// import {
//     CouponButton,
//     CouponGrid,
//     CouponTitle,
//     InputField,
// } from './CheckOut.style'
import { useQuery } from "react-query";
// import { CouponApi } from '../../hooks/react-query/config/couponApi'
import { useTranslation } from "react-i18next";
// import { onErrorResponse } from '../ErrorResponse'
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { setCouponInfo, setCouponType } from '../../redux/slices/configData'
// import {
//     CustomPaperBigCard,
//     CustomStackFullWidth,
// } from '../../styled-components/CustomStyles.style'
import { useTheme } from "@mui/material/styles";
import { CouponApi } from "../../../api-manage/another-formated-api/couponApi";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-manage/api-error-response/ErrorResponses";
import { CustomPaperBigCard } from "../../../styled-components/CustomStyles.style";
import { CouponButton, CouponTitle, InputField } from "../CheckOut.style";
import {
  setCouponInfo,
  setCouponType,
} from "../../../redux/slices/profileInfo";
import {coupon_minimum} from "../../../utils/toasterMessages";
import {getAmountWithSign} from "../../../helper-functions/CardHelpers";

const HaveCoupon = ({ store_id, setCouponDiscount, couponDiscount, totalAmount,deliveryFee, deliveryTip }) => {
  const theme = useTheme();
  const { couponInfo } = useSelector((state) => state.profileInfo);
  const [couponCode, setCouponCode] = useState(couponInfo?.code);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let zoneId;
  if (typeof window !== "undefined") {
    zoneId = JSON.parse(localStorage.getItem("zoneid"));
  }
  const handleSuccess = (response) => {
      const totalAmountOverall = totalAmount - deliveryFee - deliveryTip
      if(Number.parseInt(response?.data?.min_purchase) <= Number.parseInt(totalAmountOverall ) ){
          dispatch(setCouponInfo(response.data));
          toast.success(t("Coupon Applied"));
          dispatch(setCouponType(response.data.coupon_type));
          setCouponDiscount({ ...response.data, zoneId: zoneId });
      }
      else{
          toast.error(`${t(coupon_minimum)} ${getAmountWithSign(response?.data?.min_purchase)}`);
      }

  };
  const { isLoading, refetch } = useQuery(
    "apply-coupon",
    () => CouponApi.applyCoupon(couponCode, store_id),
    {
      onSuccess: handleSuccess,
      onError: onErrorResponse,
      enabled: false,
      retry: 1,
    }
  );

  useEffect(() => {
    return () => {
      dispatch(setCouponInfo(null));
    };
  }, []);
  const removeCoupon = () => {
    // setCouponDiscount(null);
    localStorage.removeItem("coupon");
    setCouponCode(null);
    dispatch(setCouponInfo(null));
  };
  const handleApply = async () => {
    await refetch()
  };
  const borderColor = theme.palette.primary.main;
  return (
    <CustomPaperBigCard>
      <Grid container spacing={{ xs: 1, md: 1 }} justifyContent="flex-start">
        <Grid item md={12} xs={12}>
          <CouponTitle>{t("Have a Coupon?")}</CouponTitle>
        </Grid>
        <Grid item md={6} xs={12} sm={7}>
          <InputField
            variant="outlined"
            sx={{
              height: "100%",
              border: `.5px solid ${borderColor}`,
            }}
          >
            <InputBase
              placeholder={t("Enter Your Coupon..")}
              sx={{
                ml: 1,
                flex: 1,
                width: "100%",
                padding: "5px 10px 5px",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
              onChange={(e) => setCouponCode(e.target.value)}
              value={couponCode ? couponCode : ""}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
            />
          </InputField>
        </Grid>
        <Grid item md={3} xs={12} sm={5}>
          {!couponInfo && (
            <CouponButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              onClick={handleApply}
              disabled={couponCode === "" || !couponCode}
            >
              {t("Apply Now")}
            </CouponButton>
          )}
          {couponInfo && (
            <CouponButton
              // loading={isLoading}
              loadingPosition="start"
              variant="contained"
              onClick={removeCoupon}
            >
              {t("Remove")}
            </CouponButton>
          )}
        </Grid>
      </Grid>
    </CustomPaperBigCard>
  );
};
export default HaveCoupon;
