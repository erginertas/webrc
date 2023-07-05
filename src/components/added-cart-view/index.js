import React from "react";
import { Drawer, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import CartActions from "./CartActions";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import CartContents from "./CartContents";
import { getCartListModuleWise } from "../../helper-functions/getCartListModuleWise";
import { useRouter } from "next/router";
const DrawerHeader = styled("div")(({ theme }) => ({
  width: 300,
  marginTop: "60px",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  [theme.breakpoints.down("sm")]: {
    marginTop: "10px",
  },
}));
const CardView = (props) => {
  const { sideDrawerOpen, setSideDrawerOpen, cartList } = props;
  const { configData } = useSelector((state) => state.configData);
  const imageBaseUrl = configData?.base_urls?.item_image_url;
  const router = useRouter();
  return (
    <Drawer
      anchor="right"
      open={sideDrawerOpen}
      onClose={() => setSideDrawerOpen(false)}
      variant="temporary"
      style={{ zIndex: router.pathname === "/" && 1250 }}
    >
      <CustomStackFullWidth
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%" }}
        p="10px"
      >
        <DrawerHeader />
        {getCartListModuleWise(cartList)?.length === 0 ? (
          <EmptyCart />
        ) : (
          <CartContents
            cartList={getCartListModuleWise(cartList)}
            imageBaseUrl={imageBaseUrl}
          />
        )}
        {getCartListModuleWise(cartList).length > 0 && (
          <CartActions setSideDrawerOpen={setSideDrawerOpen} />
        )}
      </CustomStackFullWidth>
    </Drawer>
  );
};

export default CardView;
