import React, {useEffect, useState} from "react";
import {Grid, Typography, useMediaQuery,} from "@mui/material";
import DeliveryDetails from "../item-checkout/DeliveryDetails";
import {Stack} from "@mui/system";
import useGetStoreDetails from "../../../api-manage/hooks/react-query/store/useGetStoreDetails";
import {useSelector} from "react-redux";
import PaymentMethod from "../PaymentMethod";
import {useMutation, useQuery} from "react-query";
import {GoogleApi} from "../../../api-manage/hooks/react-query/googleApi";
import PlaceOrder from "../item-checkout/PlaceOrder";
import {onErrorResponse} from "../../../api-manage/api-error-response/ErrorResponses";
import {CouponTitle} from "../CheckOut.style";
import {CustomPaperBigCard, CustomTextArea,} from "../../../styled-components/CustomStyles.style";
import {t} from "i18next";
import OrderCalculationShimmer from "../item-checkout/OrderCalculationShimmer";
import PrescriptionOrderCalculation from "../../Prescription/PrescriptionOrderCalculation";
import PrescriptionUpload from "../../Prescription/PrescriptionUpload";
import {handleDistance,} from "../../../utils/CustomFunctions";
import {OrderApi} from "../../../api-manage/another-formated-api/orderApi";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {prescription_image_error_text} from "../../../utils/toasterMessages";
import DeliveryManTip from "../DeliveryManTip";
import ItemSelectWithChip from "../../ItemSelectWithChip";
import {deliveryInstructions} from "../item-checkout/demoData";

const PrescriptionCheckout = ({storeId}) => {
    const router = useRouter();
    const matches = useMediaQuery("(max-width:1180px)");
    const [orderType, setOrderType] = useState("delivery");
    const [address, setAddress] = useState(undefined);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [prescriptionImages, setPrescriptionImages] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [unavailable_item_note, setUnavailable_item_note] = useState(null)
    const [delivery_instruction, setDelivery_instruction] = useState(null)
    const [deliveryTip, setDeliveryTip] = useState(0);
    const [note, setNote] = useState("");
    const {configData} = useSelector((state) => state.configData);
    const {data: storeData, refetch} = useGetStoreDetails(storeId);
    useEffect(() => {
        const currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
        const location = localStorage.getItem("location");
        setAddress({
            ...currentLatLng,
            latitude: currentLatLng?.lat,
            longitude: currentLatLng?.lng,
            address: location,
            address_type: "Selected Address",
        });
        refetch();
    }, [storeId]);
    const currentLatLng = JSON.parse(
        window.localStorage.getItem("currentLatLng")
    );
    const handleChange = (e) => {
        setNote(e.target.value);
    };

    const {data: zoneData} = useQuery(
        ["zoneId", location],
        async () => GoogleApi.getZoneId(currentLatLng),
        {
            retry: 1,
        }
    );
    const {data: distanceData, refetch: refetchDistance} = useQuery(
        ["get-distance", storeData, address],
        () => GoogleApi.distanceApi(storeData, address),
        {
            enabled: false,
            onError: onErrorResponse,
        }
    );
    useEffect(() => {
        storeData && address && refetchDistance();
        handleOrderTypeInitially()
    }, [storeData, address]);
    const handleOrderTypeInitially = () => {
        if (
            storeData?.delivery &&
            configData?.home_delivery_status===1 &&
            storeData?.take_away &&
            configData?.takeaway_status===1
        ) {
            setOrderType('delivery')
        } else if (storeData?.take_away && configData?.takeaway_status===1) {
            setOrderType('take_away')
        } else if (storeData?.delivery && configData?.home_delivery_status===1) {
            setOrderType('delivery')
        }
    }
    const {mutate: orderMutation, isLoading: orderLoading} = useMutation(
        "order-place",
        OrderApi.prescriptionPlaceOrder
    );

    const handleOrderMutationObject = () => {
        const originData = {
            latitude: storeData?.latitude,
            longitude: storeData?.longitude,
        };
        return {
            ...address,
            // order_time: scheduleAt,
            payment_method: paymentMethod,
            order_type: orderType,
            store_id: storeData?.id,
            distance: handleDistance(
                distanceData?.data?.rows?.[0]?.elements,
                originData,
                address
            ),
            prescriptionImages: prescriptionImages,
            order_note: note,
            dm_tips: deliveryTip,
            unavailable_item_note,
            delivery_instruction
        };
    };

    const handlePlaceOrder = () => {
        const handleSuccessSecond = (res) => {
            if (res?.data) {
                toast.success(res?.data?.message);
                router.push("/order", undefined, {shallow: true});
            }
        };
        let order = handleOrderMutationObject();
        orderMutation(order, {
            onSuccess: handleSuccessSecond,
            onError: (error) => {
                error?.response?.data?.errors?.forEach((item) =>
                    toast.error(item.message, {
                        position: "bottom-right",
                    })
                );
            },
        });
    };
    const placeOrder = () => {
        if (paymentMethod && paymentMethod === 'cash_on_delivery') {
            if (prescriptionImages.length > 0) {
                handlePlaceOrder();
            } else {
                toast.error(prescription_image_error_text);
            }
        } else {
            toast.error(t('Without any payment method, you can not place the order.'));
        }
    };
    const handleItemUnavailableNote = (value) => {
        setUnavailable_item_note(value)
    }
    const handleDeliveryInstructionNote = (value) => {
        setDelivery_instruction(value)
    }

    return (
        <Grid container spacing={3} mb="2rem">
            <Grid item xs={12} md={matches ? 12 : 7}>
                <Stack spacing={3}>
                    <PrescriptionUpload
                        prescriptionImages={prescriptionImages}
                        setPrescriptionImages={setPrescriptionImages}
                    />
                    <DeliveryDetails
                        storeData={storeData}
                        setOrderType={setOrderType}
                        orderType={orderType}
                        setAddress={setAddress}
                        address={address}
                        configData={configData}
                        forprescription="true"
                    />
                    <CustomPaperBigCard>
                        <DeliveryManTip
                            deliveryTip={deliveryTip}
                            setDeliveryTip={setDeliveryTip}
                        />
                    </CustomPaperBigCard>
                </Stack>
            </Grid>

            <Grid item xs={12} md={matches ? 12 : 5} height="auto">
                <CustomPaperBigCard height="auto" sx={{mb: '1.5rem'}}>
                    <ItemSelectWithChip title='Add More Delivery Instruction' data={deliveryInstructions}
                                        handleChange={handleDeliveryInstructionNote}/>
                </CustomPaperBigCard>
                <CustomPaperBigCard height="auto">
                    <Stack spacing={3} justifyContent="space-between" alignItems="center">
                        <CouponTitle variant="h6">{t("Order Summary")}</CouponTitle>
                        {distanceData && storeData ? (
                            <PrescriptionOrderCalculation
                                storeData={storeData}
                                distanceData={distanceData}
                                configData={configData}
                                orderType={orderType}
                                origin={{
                                    latitude: storeData?.latitude,
                                    longitude: storeData?.longitude,
                                }}
                                destination={address}
                                zoneData={zoneData}
                                totalOrderAmount={0}
                                deliveryTip={deliveryTip}
                            />
                        ) : (
                            <OrderCalculationShimmer/>
                        )}
                    </Stack>
                </CustomPaperBigCard>
            </Grid>
            <Grid item md={matches ? 12 : 7} xs={12}>
                <CustomPaperBigCard>
                    <Stack align="center">
                        <Typography variant="h6">{t("Additional Note")}</Typography>
                    </Stack>
                    <CustomTextArea
                        aria-label="empty textarea"
                        placeholder={t("Additional Note")}
                        style={{width: "100%", minHeight: "50px", marginTop: "20px"}}
                        onChange={(e) => handleChange(e)}
                    />
                </CustomPaperBigCard>
            </Grid>
            <Grid item md={matches ? 12 : 7} xs={12}>
                {zoneData && storeData && (
                    <PaymentMethod
                        configData={configData}
                        setPaymentMethod={setPaymentMethod}
                        paymentMethod={paymentMethod}
                        zoneData={zoneData}
                        forprescription="true"
                        storeZoneId={storeData?.zone_id}
                        prescriptionPayment
                    />
                )}
            </Grid>
            <Grid item md={12} xs={12}>
                <PlaceOrder
                    placeOrder={placeOrder}
                    orderLoading={orderLoading}
                    zoneData={zoneData}
                />
            </Grid>
        </Grid>
    );
};

export default PrescriptionCheckout;
