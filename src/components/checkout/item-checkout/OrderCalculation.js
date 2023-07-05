import React, {useState} from "react";
import {Grid, Stack, Typography} from "@mui/material";
import {CalculationGrid, TotalGrid} from "../CheckOut.style";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useTheme} from "@mui/material/styles";
import CustomDivider from "../../CustomDivider";
import {
    getCalculatedTotal,
    getCouponDiscount,
    getDeliveryFees,
    getProductDiscount,
    getSubTotalPrice,
    getTaxableTotalPrice,
} from "../../../utils/CustomFunctions";
import {getAmountWithSign} from "../../../helper-functions/CardHelpers";
import {setTotalAmount} from "../../../redux/slices/cart";

const OrderCalculation = (props) => {
    const {
        cartList,
        storeData,
        couponDiscount,
        taxAmount,
        distanceData,
        total_order_amount,
        configData,
        orderType,
        couponInfo,
        deliveryTip,
        origin,
        destination,
        zoneData,
        setDeliveryFee,
        extraCharge,
        extraChargeLoading,
    } = props;
    const {t} = useTranslation();
    const [freeDelivery, setFreeDelivery] = useState("false");
    const theme = useTheme();
    let couponType = "coupon";
    const handleDeliveryFee = () => {
        let price = getDeliveryFees(
            storeData,
            configData,
            cartList,
            distanceData?.data,
            couponDiscount,
            couponType,
            orderType,
            zoneData,
            origin,
            destination,
            extraCharge
        );

        setDeliveryFee(orderType === 'delivery' ? 0 : price);

        if (price === 0) {
            return <Typography fontWeight="bold">{t("Free")}</Typography>;
        } else {
            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.5}
                    width="100%"
                >
                    <Typography fontWeight="bold">{"(+)"}</Typography>
                    <Typography fontWeight="bold">
                        {storeData && getAmountWithSign(price)}
                    </Typography>
                </Stack>
            );
        }
    };
    const handleCouponDiscount = () => {
        let couponDiscountValue = getCouponDiscount(
            couponDiscount,
            storeData,
            cartList
        );

        if (couponDiscount && couponDiscount.coupon_type === "free_delivery") {
            setFreeDelivery("true");
            return 0;
        } else {
            return getAmountWithSign(couponDiscountValue);
        }
    };
    const dispatch = useDispatch();
    const handleOrderAmount = () => {
        let totalAmount = getCalculatedTotal(
            cartList,
            couponDiscount,
            storeData,
            configData,
            distanceData,
            couponType,
            orderType,
            freeDelivery,
            Number(deliveryTip),
            zoneData,
            origin,
            destination,
            extraCharge
        );
        dispatch(setTotalAmount(totalAmount));
        return getAmountWithSign(totalAmount);
    };
    const discountedPrice = getProductDiscount(cartList, storeData);
    return (
        <>
            <CalculationGrid container item md={12} xs={12} spacing={1}>
                <Grid item md={8} xs={8}>
                    {cartList.length > 1 ? t("Items Price") : t("Item Price")}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    <Typography fontWeight="bold" align="right">
                        {getAmountWithSign(getSubTotalPrice(cartList))}
                    </Typography>
                </Grid>
                <Grid item md={8} xs={8}>
                    {t("Discount")}
                </Grid>
                <Grid item md={4} xs={4} align="right">
                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={0.5}
                    >
                        <Typography fontWeight="bold">{"(-)"}</Typography>
                        <Typography fontWeight="bold">
                            {storeData ? getAmountWithSign(discountedPrice) : null}
                        </Typography>
                    </Stack>
                </Grid>
                {couponDiscount ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t("Coupon Discount")}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            {couponDiscount.coupon_type === "free_delivery" ? (
                                <Typography fontWeight="bold">{t("Free Delivery")}</Typography>
                            ) : (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0.5}
                                >
                                    <Typography fontWeight="bold">{"(-)"}</Typography>
                                    <Typography fontWeight="bold">
                                        {storeData && cartList && handleCouponDiscount()}
                                    </Typography>
                                </Stack>
                            )}
                        </Grid>
                    </>
                ) : null}
                {storeData ? storeData?.tax ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t("TAX")} ({storeData?.tax}%{" "}
                            {configData?.tax_included === 1 && t("Included")})
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                {configData?.tax_included === 0 && (
                                    <Typography fontWeight="bold">{"(+)"}</Typography>
                                )}
                                <Typography fontWeight="bold">
                                    {storeData &&
                                        getAmountWithSign(
                                            getTaxableTotalPrice(cartList, couponDiscount, storeData)
                                        )}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null : null}
                {orderType === 'delivery' ? Number.parseInt(configData?.dm_tips_status) === 1 ? (
                    <>
                        <Grid item md={8} xs={8}>
                            {t("Deliveryman tips")}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0.5}
                            >
                                <Typography fontWeight="bold">{"(+)"}</Typography>
                                <Typography fontWeight="bold">
                                    {getAmountWithSign(deliveryTip)}
                                </Typography>
                            </Stack>
                        </Grid>
                    </>
                ) : null : null}
                {
                    orderType === 'delivery' ? <>
                        <Grid item md={8} xs={8}>
                            {t("Delivery fee")}
                        </Grid>
                        <Grid item md={4} xs={4} align="right">
                            {couponDiscount ? (
                                couponDiscount?.coupon_type === "free_delivery" ? (
                                    <Typography fontWeight="bold">{t("Free")}</Typography>
                                ) : (
                                    storeData && handleDeliveryFee()
                                )
                            ) : (
                                storeData && handleDeliveryFee()
                            )}
                        </Grid>

                    </> : null
                }
                <CustomDivider/>
                <TotalGrid container md={12} xs={12} mt="1rem">
                    <Grid item md={8} xs={8} pl=".5rem">
                        <Typography fontWeight="bold" color={theme.palette.primary.main}>
                            {t("Total")}
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={4} align="right">
                        <Typography color={theme.palette.primary.main} align="right">
                            {storeData && cartList &&  handleOrderAmount()}
                        </Typography>
                    </Grid>
                </TotalGrid>
            </CalculationGrid>
        </>
    );
};

OrderCalculation.propTypes = {};

export default OrderCalculation;
