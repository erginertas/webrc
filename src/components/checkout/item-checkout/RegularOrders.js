import React from "react";
import {Grid, Stack, Typography} from "@mui/material";
import {OrderFoodAmount, OrderFoodName, OrderFoodSubtitle,} from "../CheckOut.style";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import Skeleton from "@mui/material/Skeleton";
import CustomImageContainer from "../../CustomImageContainer";
import {useTheme} from "@mui/material/styles";
import {getAmountWithSign,} from "../../../helper-functions/CardHelpers";
import {handleProductValueWithOutDiscount} from "../../../utils/CustomFunctions";
import VariationContent from "../../added-cart-view/VariationContent";

export const VegNonveg = ({theme, item, t}) => {
    return (
        <Stack
            sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",

                background: (theme) => theme.palette.primary.overLay,
                opacity: "0.6",
                // color: (theme)=>theme.palette.neutral[100],
                padding: "10px",
                height: "30%",
                alignItems: "center",
                justifyContent: "center",
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
            }}
        >
            <Typography align="center" color={theme.palette.neutral[100]}>
                {item?.veg === 0 ? t("Non-Veg") : t("Veg")}
            </Typography>
        </Stack>
    );
};
const RegularOrders = (props) => {
    const {configData, cartList, t} = props;
    const theme = useTheme();
    const productBaseUrl = configData?.base_urls?.item_image_url;

    return (
        <>
            {cartList.length > 0 ? (
                cartList.map((item, index) => (
                    <CustomStackFullWidth
                        key={index}
                        direction="row"
                        alignItems="flex-start"
                        spacing={2}
                        mt={index !== 0 && "1rem"}
                    >
                        <Stack position="relative">
                            <CustomImageContainer
                                height="90px"
                                width="95px"
                                src={`${productBaseUrl}/${item.image}`}
                                loading="lazy"
                                borderRadius="10px"
                            />
                            {item?.module?.module_type === "food" && (
                                <VegNonveg theme={theme} item={item} t={t}/>
                            )}
                        </Stack>
                        <Stack>
                            <OrderFoodName>{item.name}</OrderFoodName>
                            <VariationContent cartItem={item}/>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                <OrderFoodSubtitle>{t("Qty")}</OrderFoodSubtitle>
                                <OrderFoodSubtitle>:</OrderFoodSubtitle>
                                <OrderFoodSubtitle>{item.quantity}</OrderFoodSubtitle>
                            </Stack>
                            <OrderFoodAmount>
                                {getAmountWithSign(handleProductValueWithOutDiscount(item))}
                            </OrderFoodAmount>
                        </Stack>
                    </CustomStackFullWidth>
                ))
            ) : (
                <CustomStackFullWidth
                    direction="row"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Skeleton variant="rectangular" height="90px" width="95px"/>
                    <Stack>
                        <Skeleton variant="text" width="50px"/>
                        <Skeleton variant="text" width="50px"/>
                        <Skeleton variant="text" width="50px"/>
                    </Stack>
                </CustomStackFullWidth>
            )}
            <Grid item md={12} xs={12}>
                <Stack
                    width="100%"
                    sx={{
                        mt: "20px",
                        borderBottom: `2px solid ${theme.palette.neutral[300]}`,
                    }}
                ></Stack>
            </Grid>
        </>
    );
};

RegularOrders.propTypes = {};

export default RegularOrders;
