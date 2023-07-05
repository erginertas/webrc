import React, {useEffect, useReducer, useState} from "react";
import {CustomStackFullWidth,} from "../../../styled-components/CustomStyles.style";
import {Skeleton, Typography, useTheme} from "@mui/material";
import {Stack} from "@mui/system";
import VariationsManager from "./VariationsManager";
import IncrementDecrementManager from "./IncrementDecrementManager";
import ProductInformationBottomSection from "./ProductInformationBottomSection";

import {ACTION, initialState, reducer} from "./states";
import {setCart, setUpdateItemToCart} from "../../../redux/slices/cart";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import CustomModal from "../../modal";
import CartClearModal from "./CartClearModal";
import {handleInitialTotalPriceVarPriceQuantitySet} from "./helperFunction";
import {
    not_logged_in_message,
    out_of_stock,
    product_update_to_cart_message,
    update_error_text,
} from "../../../utils/toasterMessages";
import {useAddToWishlist} from "../../../api-manage/hooks/react-query/wish-list/useAddWishList";
import {addWishList} from "../../../redux/slices/wishList";
import CustomRatings from "../../search/CustomRatings";
import {getCartListModuleWise} from "../../../helper-functions/getCartListModuleWise";
import Link from "next/link";
import {getModuleId} from "../../../helper-functions/getModuleId";
import PricePreviewWithStock from "./PricePreviewWithStock";
import CustomImageContainer from "../../CustomImageContainer";
import {handleDiscountChip} from "./ProductDetailsSection";
import {useTranslation} from "react-i18next";
import OrganicTag from "../../organic-tag";

const ProductInformation = ({
                                productDetailsData,
                                productUpdate,
                                handleModalClose,
                                modalmanage,
                                imageSrcUrl,
                                isSmall,
                            }) => {
    const theme = useTheme();
    const [wishListCount, setWishListCount] = useState(
        productDetailsData?.whislists_count
    );
    const [clearCartModal, setClearCartModal] = React.useState(false);
    const {cartList: aliasCartList} = useSelector((state) => state.cart);
    //this aliasCartList has been added so that we can use cartList as per module wise.
    const cartList = getCartListModuleWise(aliasCartList);
    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {t} = useTranslation();
    const handleClearCartModalOpen = () => setClearCartModal(true);
    const handleClose = (value) => {
        if (value === "add-item") {
            dispatchRedux(
                setCart({
                    ...state.modalData[0],
                })
            );
        }
        setClearCartModal(false);
    };

    useEffect(() => {
        handleInitialTotalPriceVarPriceQuantitySet(
            productDetailsData,
            dispatch,
            cartList,
            handleChoices,
            state.selectedOptions,
            state.modalData
        );
    }, [productDetailsData]);

    const handleChoices = (option, choice) => {
        if (cartList.length > 0) {
            const itemIsInCart = cartList.find(
                (item) =>
                    item?.id === productDetailsData?.id &&
                    JSON.stringify(item?.selectedOption?.[0]) === JSON.stringify(option)
            );
            if (itemIsInCart) {
                dispatch({
                    type: ACTION.setModalData,
                    payload: {
                        ...itemIsInCart,
                    },
                });
            } else {
                dispatch({
                    type: ACTION.setModalData,
                    payload: {
                        ...productDetailsData,
                        selectedOption: [option],
                        quantity: 1,
                        price: option.price,
                        totalPrice: option.price,
                    },
                });
            }
        } else {
            dispatch({
                type: ACTION.setModalData,
                payload: {
                    ...state.modalData[0],
                    selectedOption: [option],
                    price: option?.price,
                    totalPrice: option?.price,
                    quantity: 1,
                },
            });
        }
    };
    const decrementQuantity = () => {
        dispatch({type: ACTION.decrementQuantity});
    };

    const incrementQuantity = () => {
        if (productDetailsData?.stock > state.modalData[0]?.quantity) {
            dispatch({type: ACTION.incrementQuantity});
        } else {
            toast.error(t(out_of_stock));
        }
    };

    const handleAddToCartOnDispatch = () => {
        dispatchRedux(
            setCart({
                ...state.modalData[0],
            })
        );
        toast.success(t("Item added to cart"));
        handleModalClose?.();
    };

    const addToCard = () => {
        //handleAddToCartOnDispatch();
        if (cartList?.length > 0) {
            const isStoreExist = cartList.find(
                (item) => item?.store_id === productDetailsData?.store_id
            );
            if (isStoreExist) {
                handleAddToCartOnDispatch();
            } else {
                if (cartList.length !== 0) {
                    handleClearCartModalOpen();
                }
            }
        } else {
            handleAddToCartOnDispatch();
        }
    };

    const handleUpdateToCart = () => {
        if (
            JSON.stringify(productDetailsData) === JSON.stringify(state.modalData[0])
        ) {
            toast(t(update_error_text), {
                icon: "⚠️",
            });
        } else {
            dispatchRedux(setUpdateItemToCart(state.modalData[0]));
            toast.success(t(product_update_to_cart_message));
            handleModalClose?.();
            if (productUpdate) {
                handleModalClose?.();
            }
        }
    };

    let token = undefined;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }

    const {mutate: addFavoriteMutation} = useAddToWishlist();
    const addToFavorite = () => {
        if (token) {
            addFavoriteMutation(productDetailsData?.id, {
                onSuccess: (response) => {
                    if (response) {
                        dispatchRedux(addWishList(productDetailsData));
                        toast.success(response?.message);
                        setWishListCount(wishListCount + 1);
                    }
                },
                onError: (error) => {
                    toast.error(error.response.data.message);
                },
            });
        } else toast.error(t(not_logged_in_message));
    };
    const topInformation = () => {
        return (
            <>
                {state.modalData[0]?.name ? (
                    <Typography variant="h5" fontWeight="600">
                        {state.modalData[0]?.name}
                    </Typography>
                ) : (
                    <Skeleton width={100} variant="text"/>
                )}
                {state.modalData[0]?.store_name ? (
                    <Link
                        href={{
                            pathname: "/store/[id]",
                            query: {
                                id: `${state.modalData[0]?.store_id}`,
                                module_id: `${getModuleId()}`,
                            },
                        }}
                    >
                        {" "}
                        <Typography variant="h6" fontWeight="400">
                            {state.modalData[0]?.store_name}
                        </Typography>{" "}
                    </Link>
                ) : (
                    <Skeleton width={100} variant="text"/>
                )}
                {
                    state.modalData[0]?.isCampaignItem ? null : <Stack
                        width="100%"
                        direction="row"
                        alignItems="base-line"
                        spacing={0.8}
                    >
                        <Typography
                            color={theme.palette.warning.main}
                            fontWeight="600"
                            fontSize="22px"
                            marginTop="3px"
                        >
                            {state.modalData[0]?.avg_rating}
                        </Typography>
                        <CustomRatings
                            ratingValue={state.modalData[0]?.avg_rating}
                            readOnly
                        />
                    </Stack>
                }

                <PricePreviewWithStock
                    state={state}
                    theme={theme}
                    productDetailsData={productDetailsData}
                />
            </>
        );
    };
    const handleModal = () => {
        if (modalmanage) {
            return (
                <CustomStackFullWidth
                    direction={{xs: "column", sm: "row"}}
                    alignItems="flex-start"
                    spacing={2}
                >
                    {handleDiscountChip(productDetailsData, t)}
                    <OrganicTag status={productDetailsData?.organic} top={isSmall ? 20 : 50} left={isSmall ? 0 : -15}/>
                    <CustomImageContainer
                        width="100%"
                        height={isSmall ? "200px" : "250px"}
                        src={imageSrcUrl}
                        alt='image'
                        objectfit="contained"
                    />
                    <CustomStackFullWidth>{topInformation()}</CustomStackFullWidth>
                </CustomStackFullWidth>
            );
        } else {
            return <>{topInformation()}</>;
        }
    };

    return (
        <>
            {state.modalData.length > 0 && (
                <CustomStackFullWidth spacing={2}>
                    {handleModal()}
                    <Typography
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {productDetailsData?.description}
                    </Typography>
                    {state.modalData[0]?.variations?.length > 0 && (
                        <VariationsManager
                            productDetailsData={state.modalData[0]}
                            handleChoices={handleChoices}
                        />
                    )}
                    {/*<SizeVariation productDetailsData={productDetailsData} />*/}
                    {state.modalData.length > 0 && (
                        <IncrementDecrementManager
                            decrementQuantity={decrementQuantity}
                            incrementQuantity={incrementQuantity}
                            modalData={state?.modalData[0]}
                            productUpdate={productUpdate}
                        />
                    )}
                    <ProductInformationBottomSection
                        addToCard={addToCard}
                        handleUpdateToCart={handleUpdateToCart}
                        productDetailsData={state.modalData[0]}
                        selectedOptions={state?.selectedOptions}
                        dispatchRedux={dispatchRedux}
                        addToFavorite={addToFavorite}
                        wishListCount={wishListCount}
                        setWishListCount={setWishListCount}
                        cartItemQuantity={state?.modalData[0]?.quantity}
                        t={t}
                    />
                    <CustomModal openModal={clearCartModal} handleClose={handleClose}>
                        <CartClearModal
                            handleClose={handleClose}
                            dispatchRedux={dispatchRedux}
                        />
                    </CustomModal>
                </CustomStackFullWidth>
            )}
        </>
    );
};

export default ProductInformation;
