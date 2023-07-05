import React, {useEffect} from "react";
import {CustomPaperBigCard, CustomStackFullWidth,} from "../../styled-components/CustomStyles.style";
import {Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {t} from "i18next";
import PaymentMethodCard from "./PaymentMethodCard";
import digitalPayment from "../../../public/static/digitalpayment.svg";
import cashOnDelivery from "../../../public/static/cash-on-delivery.svg";
import wallet from "../../../public/static/wallet.svg";
import LoadingButton from "@mui/lab/LoadingButton";

const PaymentMethod = ({
                           paymentMethod,
                           setPaymentMethod,
                           paidBy,
                           orderPlace,
                           isLoading,
                           zoneData,
                           forprescription,
                           configData,
                           storeZoneId,
                           prescriptionPayment
                       }) => {
    const getCODStatus = () => {
        if (configData?.cash_on_delivery) {
            if (zoneData?.data?.zone_data?.length > 0 && storeZoneId) {
                return zoneData?.data?.zone_data?.find((item) => item?.id === storeZoneId)
            }
        }
    }
    const getDPStatus = () => {
        if (configData?.digital_payment) {
            if (zoneData?.data?.zone_data?.length > 0 && storeZoneId) {
                return zoneData?.data?.zone_data?.find((item) => item?.id === storeZoneId)
            }
        }
    }
    const handleInitialPaymentSelection = () => {
        if (getCODStatus()?.cash_on_delivery) {
            setPaymentMethod("cash_on_delivery");
        } else if (getDPStatus()?.digital_payment) {
            setPaymentMethod("digital_payment");
        } else {
            setPaymentMethod("wallet");
        }
    };

    useEffect(() => {
        if (storeZoneId) {
            handleInitialPaymentSelection()
        }

    }, [])

    const innerDataHandle = () => {
        if (prescriptionPayment) {
            if (paymentMethod === 'cash_on_delivery') {
                return <CustomPaperBigCard>
                    <CustomStackFullWidth spacing={4}>
                        <Stack align="center">
                            <Typography variant="h6">{t("Payment Method")}</Typography>
                        </Stack>
                        <CustomStackFullWidth spacing={2}>
                            {getCODStatus()?.cash_on_delivery && (
                                <PaymentMethodCard
                                    paymentType={t("Cash on delivery")}
                                    image={cashOnDelivery}
                                    type="cash_on_delivery"
                                    description={t("Faster and safer way to send money")}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    paidBy={paidBy}
                                />
                            )}
                            {getDPStatus()?.digital_payment &&
                                paidBy !== "receiver" &&
                                forprescription !== "true" && (
                                    <PaymentMethodCard
                                        paymentType={t("Digital Payment")}
                                        image={digitalPayment}
                                        type="digital_payment"
                                        description={t("Faster and safer way to send money")}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        paidBy={paidBy}
                                    />
                                )}

                            {configData?.customer_wallet_status === 1 &&
                                paidBy !== "receiver" &&
                                forprescription !== "true" && (
                                    <PaymentMethodCard
                                        paymentType={t("Wallet")}
                                        image={wallet}
                                        type="wallet"
                                        description={t("Faster and safer way to send money")}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        paidBy={paidBy}
                                    />
                                )}
                        </CustomStackFullWidth>
                        {paidBy && (
                            <CustomStackFullWidth>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={orderPlace}
                                    loading={isLoading}
                                >
                                    {t("Confirm Parcel Request")}
                                </LoadingButton>
                                {/*<PrimaryButton fullwidth="true">*/}
                                {/*  {t("Confirm Parcel Request")}*/}
                                {/*</PrimaryButton>*/}
                            </CustomStackFullWidth>
                        )}
                    </CustomStackFullWidth>
                </CustomPaperBigCard>
            }
        } else {
            return <CustomPaperBigCard>
                <CustomStackFullWidth spacing={4}>
                    <Stack align="center">
                        <Typography variant="h6">{t("Payment Method")}</Typography>
                    </Stack>
                    <CustomStackFullWidth spacing={2}>
                        {getCODStatus()?.cash_on_delivery && (
                            <PaymentMethodCard
                                paymentType={t("Cash on delivery")}
                                image={cashOnDelivery}
                                type="cash_on_delivery"
                                description={t("Faster and safer way to send money")}
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                paidBy={paidBy}
                            />
                        )}
                        {getDPStatus()?.digital_payment &&
                            paidBy !== "receiver" &&
                            forprescription !== "true" && (
                                <PaymentMethodCard
                                    paymentType={t("Digital Payment")}
                                    image={digitalPayment}
                                    type="digital_payment"
                                    description={t("Faster and safer way to send money")}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    paidBy={paidBy}
                                />
                            )}

                        {configData?.customer_wallet_status === 1 &&
                            paidBy !== "receiver" &&
                            forprescription !== "true" && (
                                <PaymentMethodCard
                                    paymentType={t("Wallet")}
                                    image={wallet}
                                    type="wallet"
                                    description={t("Faster and safer way to send money")}
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    paidBy={paidBy}
                                />
                            )}
                    </CustomStackFullWidth>
                    {paidBy && (
                        <CustomStackFullWidth>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={orderPlace}
                                loading={isLoading}
                            >
                                {t("Confirm Parcel Request")}
                            </LoadingButton>
                            {/*<PrimaryButton fullwidth="true">*/}
                            {/*  {t("Confirm Parcel Request")}*/}
                            {/*</PrimaryButton>*/}
                        </CustomStackFullWidth>
                    )}
                </CustomStackFullWidth>
            </CustomPaperBigCard>
        }
    }
    return (
        <>
            {innerDataHandle()}</>
    );
};

export default React.memo(PaymentMethod);
