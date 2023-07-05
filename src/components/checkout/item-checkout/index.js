import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {Stack} from "@mui/system";
import {CustomPaperBigCard, CustomStackFullWidth,} from "../../../styled-components/CustomStyles.style";
import DeliveryDetails from "./DeliveryDetails";
import useGetStoreDetails from "../../../api-manage/hooks/react-query/store/useGetStoreDetails";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
    getDayNumber,
    getFinalTotalPrice,
    getInfoFromZoneData,
    getProductDiscount,
    getTaxableTotalPrice,
    getVariation,
    handleDistance,
    isAvailable,
    isFoodAvailableBySchedule,
} from "../../../utils/CustomFunctions";
import {today, tomorrow} from "../../../utils/formatedDays";
import {GoogleApi} from "../../../api-manage/hooks/react-query/googleApi";
import {useMutation, useQuery} from "react-query";
import {onErrorResponse, onSingleErrorResponse,} from "../../../api-manage/api-error-response/ErrorResponses";
import {toast} from "react-hot-toast";
import Router from "next/router";
import {OrderApi} from "../../../api-manage/another-formated-api/orderApi";
import {ProfileApi} from "../../../api-manage/another-formated-api/profileApi";
import RestaurantScheduleTime from "./RestaurantScheduleTime";
import HaveCoupon from "./HaveCoupon";
import DeliveryManTip from "../DeliveryManTip";
import {CouponTitle} from "../CheckOut.style";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import OrderSummaryDetails from "./OrderSummaryDetails";
import OrderCalculationShimmer from "./OrderCalculationShimmer";
import OrderCalculation from "./OrderCalculation";
import PaymentMethod from "../PaymentMethod";
import PlaceOrder from "./PlaceOrder";
import {baseUrl} from "../../../api-manage/MainApi";
import {cod_exceeds_message} from "../../../utils/toasterMessages";
import {setClearCart, setRemoveItemFromCart,} from "../../../redux/slices/cart";
import {getCurrentModuleType} from "../../../helper-functions/getCurrentModuleType";
import SinglePrescriptionUpload from "../Prescription/SinglePrescriptionUpload";
import useGetVehicleCharge from "../../../api-manage/hooks/react-query/order-place/useGetVehicleCharge";
import {getStoresOrRestaurants} from "../../../helper-functions/getStoresOrRestaurants";
import moment from "moment/moment";
import Cutlery from "./Cutlery";
import ItemSelectWithChip from "../../ItemSelectWithChip";
import {deliveryInstructions, productUnavailableData} from "./demoData";

const ItemCheckout = (props) => {
    const {configData, router, page, cartList, campaignItemList, totalAmount} =
        props;
    const [orderType, setOrderType] = useState(null);
    const [address, setAddress] = useState(undefined);
    const {couponInfo} = useSelector((state) => state.profileInfo);
    const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
    const [numberOfDay, setDayNumber] = useState(getDayNumber(today));
    const [couponDiscount, setCouponDiscount] = useState(null);
    const [scheduleAt, setScheduleAt] = useState("now");
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [taxAmount, setTaxAmount] = useState(0);
    const [cutlery, setCutlery] = useState(0)
    const [unavailable_item_note, setUnavailable_item_note] = useState(null)
    const [delivery_instruction, setDelivery_instruction] = useState(null)
    const [total_order_amount, setTotalOrderAmount] = useState(0);
    const [enabled, setEnabled] = useState(cartList?.length ? true : false);
    const [deliveryTip, setDeliveryTip] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [isImageSelected, setIsImageSelected] = useState([]);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const currentModuleType = getCurrentModuleType();
    const storeId =
        page === "campaign"
            ? campaignItemList?.[0]?.store_id
            : cartList?.[0]?.store_id;
    const {data: storeData, refetch} = useGetStoreDetails(storeId);

    const handleAddress = () => {
        const currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
        const location = localStorage.getItem("location");
        setAddress({
            ...currentLatLng,
            latitude: currentLatLng?.lat,
            longitude: currentLatLng?.lng,
            address: location,
            address_type: "Selected Address",
        });
    }
    const currentLatLng = JSON.parse(
        window.localStorage.getItem("currentLatLng")
    );
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
    const tempDistance = handleDistance(
        distanceData?.data?.rows?.[0]?.elements,
        {latitude: storeData?.latitude, longitude: storeData?.longitude},
        address
    );

    const {
        data: extraCharge,
        isLoading: extraChargeLoading,
        refetch: extraChargeRefetch,
    } = useGetVehicleCharge({tempDistance});
    useEffect(() => {
        if (distanceData) {
            extraChargeRefetch();
        }
    }, [distanceData]);
    const handleChange = (event) => {
        setDayNumber(event.target.value);
    };
    //order post api
    const {mutate: orderMutation, isLoading: orderLoading} = useMutation(
        "order-place",
        OrderApi.placeOrder
    );
    const userOnSuccessHandler = (res) => {
        // dispatch(setUser(res.data))
        // dispatch(setWalletAmount(res?.data?.wallet_balance))
    };
    const {isLoading: customerLoading, data: customerData} = useQuery(
        ["profile-info"],
        ProfileApi.profileInfo,
        {
            onSuccess: userOnSuccessHandler,
            onError: onSingleErrorResponse,
        }
    );
    useEffect(() => {
        handleAddress()
        refetch();
    }, [storeId]);

    useEffect(() => {
        storeData && address && refetchDistance();
        handleOrderTypeInitially()
    }, [storeData, address]);

    useEffect(() => {
        const taxAmount = getTaxableTotalPrice(
            cartList,
            couponDiscount,
            storeData?.tax,
            storeData
        );
        setTaxAmount(taxAmount);
    }, [cartList, couponDiscount, storeData]);
    useEffect(() => {
        const total_order_amount = getFinalTotalPrice(
            cartList,
            couponDiscount,
            taxAmount,
            storeData
        );
        setTotalOrderAmount(total_order_amount);
    }, [cartList, couponDiscount, taxAmount]);
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

    const handleValuesFromCartItems = (variationValues) => {
        let value = [];
        if (variationValues?.length > 0) {
            variationValues?.forEach((item) => {
                if (item?.isSelected) {
                    value.push(item.label);
                }
            });
        } else {
            value.push(variationValues[0].label);
        }
        return value;
    };
    const handleProductList = (productList, totalQty) => {
        return productList?.map((cart) => {
            return {
                add_on_ids:
                    cart?.selectedAddons?.length > 0
                        ? cart?.selectedAddons?.map((add) => {
                            return add.id;
                        })
                        : [],
                add_on_qtys:
                    cart?.selectedAddons?.length > 0
                        ? cart?.selectedAddons?.map((add) => {
                            totalQty += add.quantity;
                            return totalQty;
                        })
                        : [],
                add_ons:
                    cart?.selectedAddons?.length > 0
                        ? cart?.selectedAddons?.map((add) => {
                            return {
                                id: add.id,
                                name: add.name,
                                price: add.price,
                            };
                        })
                        : [],
                item_id: cart?.available_date_starts ? null : cart?.id,
                item_campaign_id: cart?.available_date_starts ? cart?.id : null,

                price: cart?.price,
                quantity: cart?.quantity,
                variant:
                    cart?.module_type === "food" ? getVariation(cart?.variation) : [],
                //new variation form needs to added here
                variation:
                    cart?.module_type === "food"
                        ? cart?.food_variations?.length > 0
                            ? cart?.food_variations?.map((variation) => {
                                return {
                                    name: variation.name,
                                    values: {
                                        label: handleValuesFromCartItems(variation.values),
                                    },
                                };
                            })
                            : []
                        : cart?.selectedOption?.length > 0
                            ? cart?.selectedOption
                            : [],
            };
        });
    };
    const handleOrderMutationObject = (carts, productList) => {
        const originData = {
            latitude: storeData?.latitude,
            longitude: storeData?.longitude,
        };
        if (getCurrentModuleType() === "pharmacy") {
            const formData = new FormData();
            formData.append("cart", JSON.stringify(carts));
            if (scheduleAt !== "now") {
                formData.append("schedule_at", scheduleAt);
            }

            formData.append("payment_method", paymentMethod);
            formData.append("order_type", orderType);

            formData.append("store_id", storeData?.id);
            if (couponDiscount?.code) {
                formData.append("coupon_code", couponDiscount?.code);
            }

            formData.append("coupon_discount_amount", couponDiscount?.discount);
            formData.append("coupon_discount_title", couponDiscount?.title);

            formData.append("discount_amount", getProductDiscount(productList));
            formData.append(
                "distance",
                handleDistance(
                    distanceData?.data?.rows?.[0]?.elements,
                    originData,
                    address
                )
            );
            formData.append("order_amount", totalAmount);
            formData.append("dm_tips", deliveryTip);

            formData.append("address", address?.address);
            formData.append("address_type", address?.address_type);
            formData.append("lat", address?.lat);
            formData.append("latitude", address?.latitude);

            formData.append("lng", address?.lng);
            formData.append("longitude", address?.longitude);
            if (isImageSelected?.length > 0) {
                isImageSelected?.forEach((item) =>
                    formData.append("order_attachment", item)
                );
            }
            return formData;
        } else {
            return {
                cart: JSON.stringify(carts),
                ...address,
                schedule_at: scheduleAt === "now" ? null : scheduleAt,
                // order_time: scheduleAt,
                payment_method: paymentMethod,
                order_type: orderType,
                store_id: storeData?.id,
                coupon_code: couponDiscount?.code,
                coupon_discount_amount: couponDiscount?.discount,
                coupon_discount_title: couponDiscount?.title,
                discount_amount: getProductDiscount(productList),
                distance: handleDistance(
                    distanceData?.data?.rows?.[0]?.elements,
                    originData,
                    address
                ),
                order_amount: 100,
                dm_tips: deliveryTip,
                cutlery: cutlery,
                unavailable_item_note,
                delivery_instruction

            };
        }
    };
    const handlePlaceOrder = () => {
        const itemsList = page === "campaign" ? campaignItemList : cartList;
        const isAvailable = storeData?.schedule_order
            ? isFoodAvailableBySchedule(itemsList, scheduleAt)
            : true;
        if (isAvailable) {
            const walletAmount = customerData?.data?.wallet_balance;
            let productList = page === "campaign" ? campaignItemList : cartList;
            if (paymentMethod === "wallet") {
                if (Number(walletAmount) < Number(totalAmount)) {
                    toast.error(t("Wallet balance is below total amount."), {
                        id: "wallet",
                        position: "bottom-right",
                    });
                } else {
                    let totalQty = 0;
                    let carts = handleProductList(productList, totalQty);
                    const handleSuccessSecond = (response) => {
                        if (response?.data) {
                            if (paymentMethod === "digital_payment") {
                                toast.success(response?.data?.message);
                                const newBaseUrl = baseUrl;
                                const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}&total=${response?.data?.total_ammount}`;
                                const url = `${newBaseUrl}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&callback=${callBackUrl}`;
                                localStorage.setItem("totalAmount", totalAmount);
                                dispatch(setClearCart());
                                Router.push(url, undefined, {shallow: true});
                            } else if (paymentMethod === "wallet") {
                                toast.success(response?.data?.message);
                                setOrderSuccess(true);
                            } else {
                                if (response.status === 203) {
                                    toast.error(response.data.errors[0].message);
                                }
                                //setOrderSuccess(true)
                            }
                        }
                    };
                    if (carts?.length > 0) {
                        let order = handleOrderMutationObject(carts, productList);
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
                    }
                }
            } else {
                let totalQty = 0;
                let carts = handleProductList(productList, totalQty);
                const handleSuccess = (response) => {
                    if (response?.data) {
                        toast.success(response?.data?.message, {
                            id: paymentMethod,
                        });

                        if (paymentMethod === "digital_payment") {
                            const callBackUrl = `${window.location.origin}/order?order_id=${response?.data?.order_id}&total=${response?.data?.total_ammount}`;
                            const url = `${baseUrl}/payment-mobile?order_id=${response?.data?.order_id}&customer_id=${customerData?.data?.id}&callback=${callBackUrl}`;
                            localStorage.setItem("totalAmount", totalAmount);
                            dispatch(setClearCart());
                            Router.push(url, undefined, {shallow: true});
                        } else {
                            setOrderSuccess(true);
                        }
                    }
                };
                if (carts?.length > 0) {
                    let order = handleOrderMutationObject(carts, productList);
                    orderMutation(order, {
                        onSuccess: handleSuccess,
                        onError: (error) => {
                            error?.response?.data?.errors?.forEach((item) =>
                                toast.error(item.message, {
                                    position: "bottom-right",
                                })
                            );
                        },
                    });
                }
            }
        } else {
            toast.error(
                t(
                    "One or more item is not available for the chosen preferable schedule time."
                )
            );
        }
    };

    const isStoreOpen = () => {
        // storeData?.schedule_order
    };
    const storeCloseToast = () =>
        toast.error(
            t(`${getStoresOrRestaurants().slice(0, -1)} is closed. Try again later.`)
        );
    const handlePlaceOrderBasedOnAvailability = () => {
        //cod -> cash on delivery
        const codLimit =
            getInfoFromZoneData(zoneData)?.pivot?.maximum_cod_order_amount;
        if (orderType === "take_away") {
            handlePlaceOrder();
        } else {
            if (paymentMethod === 'cash_on_delivery' && codLimit) {
                if (totalAmount <= codLimit) {
                    handlePlaceOrder();
                } else {
                    toast.error(t(cod_exceeds_message), {
                        duration: 5000,
                    });
                }
            } else {
                handlePlaceOrder();
            }
        }
    };
    const placeOrder = () => {

        if (storeData?.active) {
            //checking restaurant or shop open or not
            if (storeData?.schedules.length > 0) {
                const todayInNumber = moment().weekday();
                let isOpen = false;
                let filteredSchedules = storeData?.schedules.filter(
                    (item) => item.day === todayInNumber
                );
                let isAvailableNow = [];
                filteredSchedules.forEach((item) => {
                    if (isAvailable(item?.opening_time, item?.closing_time)) {
                        isAvailableNow.push(item);
                    }
                });
                if (isAvailableNow.length > 0) {
                    isOpen = true;
                } else {
                    isOpen = false;
                }
                if (isOpen) {
                    handlePlaceOrderBasedOnAvailability();
                }
            } else {
                storeCloseToast();
            }
        } else {
            storeCloseToast();
        }
    };
    const couponRemove = () => {
    };
    useEffect(() => {
        orderSuccess && handleOrderSuccess();
    }, [orderSuccess]);
    const handleOrderSuccess = () => {
        if (page === "buy_now") {
            dispatch(setRemoveItemFromCart(cartList?.[0]));
        }
        localStorage.setItem("totalAmount", totalAmount);
        Router.push("/order", undefined, {shallow: true});
    };
    const handleImageUpload = (value) => {
        setIsImageSelected([value]);
    };
    const paymentMethodShow = () => (<PaymentMethod
        setPaymentMethod={setPaymentMethod}
        paymentMethod={paymentMethod}
        zoneData={zoneData}
        configData={configData}
        storeZoneId={storeData?.zone_id}
    />)

    const handleCutlery = (status) => {
        if (status) {
            setCutlery(1)
        } else {
            setCutlery(1)
        }
    }
    const handleItemUnavailableNote = (value) => {
        setUnavailable_item_note(value)
    }
    const handleDeliveryInstructionNote = (value) => {
        setDelivery_instruction(value)
    }
    return (
        <Grid container spacing={3} mb="2rem">
            <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                    <DeliveryDetails
                        storeData={storeData}
                        setOrderType={setOrderType}
                        orderType={orderType}
                        setAddress={setAddress}
                        address={address}
                        configData={configData}
                        setDeliveryTip={setDeliveryTip}
                    />
                    <RestaurantScheduleTime
                        storeData={storeData}
                        handleChange={handleChange}
                        today={today}
                        tomorrow={tomorrow}
                        numberOfDay={numberOfDay}
                        configData={configData}
                        setScheduleAt={setScheduleAt}
                    />
                    {storeData && (
                        <HaveCoupon
                            store_id={storeData?.id}
                            setCouponDiscount={setCouponDiscount}
                            counponRemove={couponRemove}
                            couponDiscount={couponDiscount}
                            totalAmount={totalAmount}
                            deliveryFee={deliveryFee}
                            deliveryTip={deliveryTip}
                        />
                    )}

                    {orderType === 'delivery' ? Number.parseInt(configData?.dm_tips_status) === 0 && (
                        <CustomPaperBigCard>
                            <DeliveryManTip
                                deliveryTip={deliveryTip}
                                setDeliveryTip={setDeliveryTip}
                            />
                        </CustomPaperBigCard>
                    ) : <>
                        {zoneData && storeData && paymentMethodShow()}
                    </>}
                </Stack>
            </Grid>
            <Grid item xs={12} md={5} height="auto">
                <CustomStackFullWidth spacing={3}>
                    <CustomPaperBigCard height="auto">
                        <Stack
                            spacing={3}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <CouponTitle variant="h6">{t("Order Summary")}</CouponTitle>
                            <SimpleBar style={{maxHeight: "500px", width: "100%"}}>
                                <OrderSummaryDetails
                                    page={page}
                                    configData={configData}
                                    cartList={cartList}
                                    t={t}
                                    campaignItemList={campaignItemList}

                                />
                            </SimpleBar>
                            {
                                getCurrentModuleType() === 'food' && storeData?.cutlery &&
                                <Cutlery isChecked={cutlery} handleChange={handleCutlery}/>
                            }
                            <ItemSelectWithChip title='If Any product is not available' data={productUnavailableData}
                                                handleChange={handleItemUnavailableNote}/>
                            <ItemSelectWithChip title='Add More Delivery Instruction' data={deliveryInstructions}
                                                handleChange={handleDeliveryInstructionNote}/>
                            {distanceData && storeData ? (
                                <OrderCalculation
                                    cartList={page === "campaign" ? campaignItemList : cartList}
                                    storeData={storeData}
                                    couponDiscount={couponDiscount}
                                    taxAmount={taxAmount}
                                    distanceData={distanceData}
                                    total_order_amount={total_order_amount}
                                    configData={configData}
                                    couponInfo={couponInfo}
                                    orderType={orderType}
                                    deliveryTip={deliveryTip}
                                    origin={{
                                        latitude: storeData?.latitude,
                                        longitude: storeData?.longitude,
                                    }}
                                    destination={address}
                                    zoneData={zoneData}
                                    extraCharge={extraCharge && extraCharge}
                                    setDeliveryFee={setDeliveryFee}
                                    extraChargeLoading={extraChargeLoading}
                                    deliveryFee={deliveryFee}
                                />
                            ) : (
                                extraChargeLoading && <OrderCalculationShimmer/>
                            )}
                        </Stack>
                    </CustomPaperBigCard>
                    {currentModuleType === "pharmacy" && (
                        <CustomPaperBigCard>
                            <SinglePrescriptionUpload
                                t={t}
                                handleImageUpload={handleImageUpload}
                            />
                        </CustomPaperBigCard>
                    )}
                </CustomStackFullWidth>
            </Grid>
            {
                orderType === 'delivery' ? <Grid item md={7} xs={12}>
                    {zoneData && storeData && paymentMethodShow()}
                </Grid> : null
            }

            <Grid item md={12} xs={12}>
                <PlaceOrder
                    placeOrder={placeOrder}
                    orderLoading={orderLoading}
                    zoneData={zoneData}
                    orderType={orderType}
                />
            </Grid>
        </Grid>
    );
};

ItemCheckout.propTypes = {};

export default ItemCheckout;
