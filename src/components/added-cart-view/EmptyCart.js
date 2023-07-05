import React from "react";
import { Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import emptycart from "./assets/emptycart.png";
import { CustomTypographyBold } from "../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import EmptyCartSvg from "../svg-components/EmptyCartSvg";

const EmptyCart = () => {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      container="true"
    >
      <EmptyCartSvg />
      <CustomTypographyBold align="center">
        {t("Cart is Empty")}
      </CustomTypographyBold>
    </Stack>
  );
};

export default EmptyCart;
