import React from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import ParcelCheckout from "../../src/components/checkout/parcel";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import {useRouter} from "next/router";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import ItemCheckout from "../../src/components/checkout/item-checkout";
import {useSelector} from "react-redux";
import {getCartListModuleWise} from "../../src/helper-functions/getCartListModuleWise";
import PrescriptionCheckout from "../../src/components/checkout/Prescription";
import CustomNoSsr from "../custom-no-ssr";
import {getServerSideProps} from "../index";

const CheckOutPage = ({configData, landingPageData}) => {
    const router = useRouter();
    const {page, store_id, id} = router.query;
    const {
        cartList: aliasCartList,
        campaignItemList,
        buyNowItemList,
        totalAmount,
    } = useSelector((state) => state.cart);
    const cartList = getCartListModuleWise(aliasCartList);
    const handleRouteRedirect = () => {
        if (typeof window !== "undefined") {
            router.push("/home", undefined, {shallow: true});
        }
    };

    const handleEmpty = () => {
        if (router.isReady) {
            if (page === "cart" && cartList.length === 0) {
                return <CustomNoSsr>{handleRouteRedirect()}</CustomNoSsr>;
            } else if (page === "campaign" && campaignItemList.length === 0) {
                return <CustomNoSsr>{handleRouteRedirect()}</CustomNoSsr>;
            } else if (!page) {
                router.push("/home", undefined, {shallow: true});
            }
        }
    };
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Checkout - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <AuthGuard from="checkout">
                    {page === "parcel" && <ParcelCheckout/>}
                    {page === "prescription" && (
                        <PrescriptionCheckout storeId={store_id}/>
                    )}
                    {page === "campaign" && campaignItemList.length > 0 && (
                        <ItemCheckout
                            router={router}
                            configData={configData}
                            page={page}
                            cartList={cartList}
                            campaignItemList={campaignItemList}
                            totalAmount={totalAmount}
                        />
                    )}
                    {page === "cart" && cartList.length > 0 && (
                        <ItemCheckout
                            router={router}
                            configData={configData}
                            page={page}
                            cartList={cartList}
                            campaignItemList={campaignItemList}
                            totalAmount={totalAmount}
                        />
                    )}
                    {page === "buy_now" && buyNowItemList.length > 0 && (
                        <ItemCheckout
                            router={router}
                            configData={configData}
                            page={page}
                            cartList={buyNowItemList}
                            campaignItemList={campaignItemList}
                            totalAmount={totalAmount}
                        />
                    )}
                    {handleEmpty()}
                </AuthGuard>
            </MainLayout>
        </>
    );
};

export default CheckOutPage;
export {getServerSideProps}
