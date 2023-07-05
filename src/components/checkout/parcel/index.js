import React, {useEffect, useState} from "react";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import H1 from "../../typographies/H1";
import {Stack} from "@mui/system";
import {Grid} from "@mui/material";
import DeliveryInfo from "../DeliveryInfo";
import Billing from "../Billing";
import PaymentMethod from "../PaymentMethod";
import useGetDistance from "../../../api-manage/hooks/react-query/google-api/useGetDistance";
import {useSelector} from "react-redux";
import {useOrderPlace} from "../../../api-manage/hooks/react-query/order-place/useOrderPlace";
import toast from "react-hot-toast";
import {t} from "i18next";
import {baseUrl} from "../../../api-manage/MainApi";
import {useRouter} from "next/router";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import {handleDistance} from "../../../utils/CustomFunctions";
import useGetVehicleCharge from "../../../api-manage/hooks/react-query/order-place/useGetVehicleCharge";

const ParcelCheckout = () => {
    const {configData} = useSelector((state) => state.configData);
    const {parcelInfo} = useSelector((state) => state.parcelInfoData);
    const {profileInfo} = useSelector((state) => state.profileInfo);
    const [address, setAddress] = useState(undefined);
    const [deliveryTip, setDeliveryTip] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paidBy, setPaidBy] = useState("sender");
    const {parcelCategories} = useSelector((state) => state.parcelCategories);
    const router = useRouter();
    const [zoneIdEnabled, setZoneIdEnabled] = useState(true);
    const [currentZoneId, setCurrentZoneId] = useState(null)
    const receiverLoacation = {
        lat: parcelInfo?.receiverLocations?.lat,
        lng: parcelInfo?.receiverLocations?.lng,
    };

    const {data: zoneData} = useGetZoneId(receiverLoacation, zoneIdEnabled);
    const {data, refetch} = useGetDistance(
        parcelInfo?.senderLocations,
        parcelInfo?.receiverLocations
    );
    const tempDistance = handleDistance(
        data?.data?.rows?.[0]?.elements,
        {latitude: parcelInfo?.receiverLocations?.latitude, longitude: parcelInfo?.receiverLocations?.longitude},
        address
    );
    const {
        data: extraCharge,
        isLoading: extraChargeLoading,
        refetch: extraChargeRefetch,
    } = useGetVehicleCharge({tempDistance});
    useEffect(() => {
        if (data) {
            extraChargeRefetch();
        }
    }, [data]);
    useEffect(() => {
        refetch();
    }, [parcelInfo]);

    useEffect(() => {
        const currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
        const location = localStorage.getItem("location");
        const zoneId = JSON.parse(localStorage.getItem("zoneid"));
        setCurrentZoneId(zoneId?.[0])
        setAddress({
            ...currentLatLng,
            latitude: currentLatLng?.lat,
            longitude: currentLatLng?.lng,
            address: location,
            address_type: "Selected Address",
        });
    }, []);
    const parcelDeliveryFree = () => {
        let convertedDistance = handleDistance(
            data?.rows[0]?.elements,
            parcelInfo?.senderLocations,
            parcelInfo?.receiverLocations
        );
        if (parcelCategories?.parcel_per_km_shipping_charge) {
            let deliveryFee =
                convertedDistance * parcelCategories?.parcel_per_km_shipping_charge;

            if (deliveryFee > parcelCategories?.parcel_minimum_shipping_charge) {
                return deliveryFee + extraCharge;
            } else {
                return parcelCategories?.parcel_minimum_shipping_charge + extraCharge;
            }
        } else {
            let deliveryFee =
                convertedDistance * configData?.parcel_per_km_shipping_charge;
            if (deliveryFee > configData?.parcel_minimum_shipping_charge) {
                return deliveryFee + extraCharge;
            } else {
                return configData?.parcel_minimum_shipping_charge + extraCharge;
            }
        }
    };
    const receiverDetails = JSON.stringify({
        id: null,
        address_type: "others",
        contact_person_number: parcelInfo?.receiverPhone,
        address: parcelInfo?.receiverAddress,
        additional_address: null,
        latitude: parcelInfo?.receiverLocations?.lat,
        longitude: parcelInfo?.receiverLocations?.lng,
        zone_id: zoneData?.zone_id[1],
        zone_ids: null,
        _method: null,
        contact_person_name: parcelInfo?.receiverName,
        road: parcelInfo?.road,
        house: parcelInfo?.house,
        floor: parcelInfo?.floor,
    });
    const orderMutationObject = {
        ...address,
        cart: [],
        order_amount: parcelDeliveryFree() + Number(deliveryTip),
        order_type: "parcel",
        payment_method: paymentMethod,
        distance: handleDistance(
            data?.rows[0]?.elements,
            parcelInfo?.senderLocations,
            parcelInfo?.receiverLocations
        ),
        discount_amount: 0,
        tax_amount: 0,
        receiver_details: receiverDetails,
        parcel_category_id: parcelCategories?.id,
        charge_payer: paidBy,
        dm_tips: deliveryTip,
    };
    const {data: order, isLoading, mutate: orderMutation} = useOrderPlace();
    const orderPlace = () => {
        if (paidBy === 'sender') {
            const handleSuccess = (res) => {
                if (res) {
                    if (paymentMethod === "digital_payment") {
                        localStorage.setItem("totalAmount", res?.total_ammount);
                        const callBackUrl = `${window.location.origin}/order?order_id=${res?.order_id}&total=${res?.total_ammount}`;
                        const url = `${baseUrl}/payment-mobile?order_id=${res?.order_id}&customer_id=${profileInfo?.id}&callback=${callBackUrl}`;
                        router.push(url, undefined, {shallow: true});
                    } else if (paymentMethod === "wallet") {
                        if (
                            Number(profileInfo?.wallet_balance) < Number(parcelDeliveryFree())
                        ) {
                            toast.error(t("Wallet balance is below total amount."), {
                                id: "wallet",
                                position: "bottom-right",
                            });
                        } else {
                            toast.success(res?.message);
                            router.push(
                                {
                                    pathname: "/order",
                                    query: {order_id: res?.order_id, total: res?.total_ammount},
                                },
                                undefined,
                                {shallow: true}
                            );
                        }
                    } else {
                        toast.success(res?.message);
                        router.push(
                            {
                                pathname: "/order",
                                query: {order_id: res?.order_id, total: res?.total_ammount},
                            },
                            undefined,
                            {shallow: true}
                        );
                    }
                }
            };

            orderMutation(orderMutationObject, {
                onSuccess: handleSuccess,
                onError: (error) => {
                    error?.response?.data?.errors?.forEach((item) =>
                        toast.error(item.message, {
                            position: "bottom-right",
                        })
                    );
                },
            });
        } else {
            if (paymentMethod === 'cash_on_delivery') {
                const handleSuccess = (res) => {
                    if (res) {
                        if (paymentMethod === "digital_payment") {
                            localStorage.setItem("totalAmount", res?.total_ammount);
                            const callBackUrl = `${window.location.origin}/order?order_id=${res?.order_id}&total=${res?.total_ammount}`;
                            const url = `${baseUrl}/payment-mobile?order_id=${res?.order_id}&customer_id=${profileInfo?.id}&callback=${callBackUrl}`;
                            router.push(url, undefined, {shallow: true});
                        } else if (paymentMethod === "wallet") {
                            if (
                                Number(profileInfo?.wallet_balance) < Number(parcelDeliveryFree())
                            ) {
                                toast.error(t("Wallet balance is below total amount."), {
                                    id: "wallet",
                                    position: "bottom-right",
                                });
                            } else {
                                toast.success(res?.message);
                                router.push(
                                    {
                                        pathname: "/order",
                                        query: {order_id: res?.order_id, total: res?.total_ammount},
                                    },
                                    undefined,
                                    {shallow: true}
                                );
                            }
                        } else {
                            toast.success(res?.message);
                            router.push(
                                {
                                    pathname: "/order",
                                    query: {order_id: res?.order_id, total: res?.total_ammount},
                                },
                                undefined,
                                {shallow: true}
                            );
                        }
                    }
                };

                orderMutation(orderMutationObject, {
                    onSuccess: handleSuccess,
                    onError: (error) => {
                        error?.response?.data?.errors?.forEach((item) =>
                            toast.error(item.message, {
                                position: "bottom-right",
                            })
                        );
                    },
                });
            } else {
                toast.error(t('Without any payment method, you can not place the order.'));
            }
        }
    };
    return (
        <CustomStackFullWidth paddingBottom={{sm: "20px", md: "80px"}}>
            <Stack paddingBottom="20px">
                <H1 text="Checkout"/>
            </Stack>
            <CustomStackFullWidth>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={4}>
                        <DeliveryInfo
                            configData={configData}
                            parcelInfo={parcelInfo}
                            parcelCategories={parcelCategories}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Billing
                            deliveryTip={deliveryTip}
                            setDeliveryTip={setDeliveryTip}
                            paidBy={paidBy}
                            setPaidBy={setPaidBy}
                            data={data}
                            parcelDeliveryFree={parcelDeliveryFree}
                            zoneData={{data: zoneData}}
                            senderLocation={parcelInfo?.senderLocations}
                            receiverLocation={parcelInfo?.receiverLocations}
                            configData={configData}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        {
                            !!currentZoneId && zoneData  && <PaymentMethod
                                setPaymentMethod={setPaymentMethod}
                                paymentMethod={paymentMethod}
                                paidBy={paidBy}
                                isLoading={isLoading}
                                orderPlace={orderPlace}
                                zoneData={{data: zoneData}}
                                configData={configData}
                                storeZoneId={currentZoneId}
                            />
                        }
                    </Grid>
                </Grid>
            </CustomStackFullWidth>
        </CustomStackFullWidth>
    );
};

export default React.memo(ParcelCheckout);
