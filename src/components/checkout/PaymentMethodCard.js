import React from "react";
import { Card, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { t } from "i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentMethodCard = (props) => {
  const {
    image,
    description,
    type,
    paymentMethod,
    setPaymentMethod,
    paymentType,
    paidBy,
  } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card
      elevation={9}
      {...props}
      sx={{ padding: "20px", cursor:'pointer' }}
      onClick={() => setPaymentMethod(type)}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 3, md: 4 }}
      >
        <Grid item xs={2}>
          <CustomImageContainer
            src={image.src}
            objectfit="contain"
            height={paidBy ? "100%" : isSmall ? "35px" : "40px"}
            width={paidBy ? "100%" : isSmall ? "35px" : "60px"}
          />
        </Grid>
        <Grid item xs={8}>
          <CustomStackFullWidth>
            <Typography fontWeight="500">{t(paymentType)}</Typography>
            {/*<Typography fontSize="12px">{description}</Typography>*/}
          </CustomStackFullWidth>
        </Grid>

        <Grid item xs={2} textAlign="right">
          <CustomStackFullWidth>
            {paymentMethod === type && <CheckCircleIcon color="success" />}
          </CustomStackFullWidth>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PaymentMethodCard;
