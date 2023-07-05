import React, { useEffect, useState } from "react";
import MainLayout from "../../src/components/layout/MainLayout";
import ParcelCheckout from "../../src/components/checkout/parcel";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import { useRouter } from "next/router";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import ItemCheckout from "../../src/components/checkout/item-checkout";
import { useSelector } from "react-redux";
import CustomAlert from "../../src/components/alert/CustomAlert";
import { getCartListModuleWise } from "../../src/helper-functions/getCartListModuleWise";
import PrescriptionCheckout from "../../src/components/checkout/Prescription";
import {getServerSideProps} from "../index";

const CheckOutPage = ({ configData }) => {
  const [rendered, setIsRendered] = useState(false);
  const router = useRouter();
  const { page, store_id, id } = router.query;
  useEffect(() => {
    setIsRendered(true);
  }, []);
  const {
    cartList: aliasCartList,
    campaignItemList,
    buyNowItemList,
    totalAmount,
  } = useSelector((state) => state.cart);
  const cartList = getCartListModuleWise(aliasCartList);

  const handleEmpty = () => {
    if (router.isReady) {
      if (page === "cart" && cartList.length === 0) {
        return (
          <CustomAlert
            type="warning"
            text="You have nothing in your cart to checkout."
          />
        );
      } else if (page === "campaign" && campaignItemList.length === 0) {
        return (
          <CustomAlert
            type="warning"
            text="You have nothing in your cart to checkout."
          />
        );
      } else if (page === "buy_now" && buyNowItemList.length === 0) {
        return (
          <CustomAlert
            type="warning"
            text="You have nothing in your cart to checkout."
          />
        );
      } else if (!page) {
        router.push("/home", undefined, { shallow: true });
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <MetaData title={`Checkout - ${configData?.business_name}`} />
      <MainLayout configData={configData}>
        <AuthGuard from="checkout">
          {rendered && (
            <>
              {page === "parcel" && <ParcelCheckout />}
              {page === "prescription" && (
                <PrescriptionCheckout storeId={store_id} />
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
              {page === "buy_now" && (
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
            </>
          )}
        </AuthGuard>
      </MainLayout>
    </>
  );
};

export default CheckOutPage;
export {getServerSideProps}
