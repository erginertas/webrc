import React from "react";
import { Grid, Typography } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CustomImageContainer from "../../../CustomImageContainer";
import { Box, Stack } from "@mui/system";
import { getAmountWithSign } from "../../../../helper-functions/CardHelpers";
import OrderCalculation from "./OrderCalculation";
import Shimmer from "./Shimmer";

const getAddOnsNames = (addOns) => {
  const names = addOns.map(
    (item, index) =>
      `${addOns[0].name}(${addOns[0].quantity})${
        index !== addOns.length - 1 ? "," : ""
      }`
  );
  return names;
};

const OrderSummery = (props) => {
  const { trackOrderData, configData, t, data } = props;
  return (
    <Box>
      {trackOrderData ? (
        <Grid container mt="1rem">
          <Grid item xs={12} md={12} align="center">
            <Typography fontWeight="bold">{t("Order Summery")}</Typography>
          </Grid>
          <Grid item xs={12} md={12} align="center" mt="1rem">
            <SimpleBar style={{ maxHeight: "300px" }}>
              {data &&
                data?.length > 0 &&
                data?.map((product) => (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    md={12}
                    xs={12}
                    spacing={{ xs: 1 }}
                    key={product?.id}
                    mb="1rem"
                  >
                    <Grid item md={3} xs={4} sm={2}>
                      {product.item_campaign_id ? (
                        <CustomImageContainer
                          src={`${configData?.base_urls?.campaign_image_url}/${product.item_details.image}`}
                          height="90px"
                          maxWidth="90px"
                          width="100%"
                          loading="lazy"
                          smHeight="50px"
                        />
                      ) : (
                        <CustomImageContainer
                          src={`${configData?.base_urls?.item_image_url}/${product.item_details.image}`}
                          height="90px"
                          maxWidth="90px"
                          width="100%"
                          loading="lazy"
                          smHeight="70px"
                          borderRadius=".7rem"
                        />
                      )}
                    </Grid>
                    <Grid item md={9} xs={8} sm={8} align="left">
                      <Typography>{product?.item_details?.name}</Typography>
                      <Typography>
                        {t("Qty")}: {product?.quantity}
                      </Typography>
                      {product?.add_ons.length > 0 && (
                        <Typography>
                          {t("Addons")}: {getAddOnsNames(product?.add_ons)}
                        </Typography>
                      )}
                      {/*{product?.variation?.length > 0 && (*/}
                      {/*    <>{getVariationNames(product, t)}</>*/}
                      {/*)}*/}

                      <Typography
                        color="primary.main"
                        fontSize="16px"
                        fontWeight="bold"
                      >
                        {getAmountWithSign(product?.item_details?.price)}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </SimpleBar>
            <Grid item md={12} xs={12} mb="10px">
              <Stack
                width="100%"
                sx={{
                  mt: "20px",
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.neutral[300]}`,
                }}
              ></Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <OrderCalculation
                data={data}
                t={t}
                trackOrderData={trackOrderData}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Shimmer />
      )}
    </Box>
  );
};

OrderSummery.propTypes = {};

export default OrderSummery;
