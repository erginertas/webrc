import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CustomBoxForTips,
  CustomStackFullWidth,
  CustomTextField,
} from "../../styled-components/CustomStyles.style";
import { Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CouponTitle } from "./CheckOut.style";

const DeliveryManTip = ({ deliveryTip, setDeliveryTip }) => {
  const [show, setShow] = useState(false);
  const [fieldValue, setFieldValue] = useState(deliveryTip);
  const deliveryTips = [0, 20, 30, 50];
  const { t } = useTranslation();
  const handleOnChange = (e) => {
    if(e.target.value>-1){
      setFieldValue(e.target.value);
      setDeliveryTip(e.target.value)
    }
  };
  const handleClickOnTips = (tip) => {
    setFieldValue(tip);

  };
  useEffect(() => {
    setDeliveryTip(fieldValue);
  }, [fieldValue]);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <CustomStackFullWidth>
      <Grid container rowGap="14px">
        <Grid item xs={12} md={12}>
          <CouponTitle>{t("Delivery Man Tips")}</CouponTitle>
        </Grid>
        {!show && (
          <Grid item xs={12}>
            <CustomStackFullWidth
              direction="row"
              alignItems="center"
              gap='10px'
              flexWrap='wrap'
            >
              {deliveryTips.map((item, index) => {
                return (
                  <CustomBoxForTips
                    sx={{
                      borderColor: (theme) =>
                        fieldValue === item
                          ? theme.palette.primary.main
                          : theme.palette.neutral[200],
                    }}
                    key={index}
                    onClick={() => handleClickOnTips(item)}
                  >
                    <Typography fontSize="14px">{item}</Typography>
                  </CustomBoxForTips>
                );
              })}
              <CustomBoxForTips
                sx={{ borderColor: (theme) => theme.palette.neutral[200] }}
                onClick={handleShow}
              >
                <Typography fontSize="14px">{t("Others")}</Typography>
              </CustomBoxForTips>
            </CustomStackFullWidth>
          </Grid>
        )}
        {show && (
          <Stack width="100%" direction="row" spacing={1.8}>
            <Stack justifyContent="center" alignItems="center">
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.neutral[100],
                  minWidth: "35px",
                  padding: "8px 10px",
                  textAlign:'center',
                  "&:hover":{
                    backgroundColor: (theme) => theme.palette.primary.deep,
                  }

                }}
                onClick={handleClose}
              >
                <ArrowBackIosIcon sx={{ width: "15px", height: "20px" }} />
              </Button>
            </Stack>
            <CustomStackFullWidth>
              <CustomTextField
                label={t("Amount")}
                autoFocus={true}
                value={fieldValue}
                fullWidth
                onChange={(e) => handleOnChange(e)}
              />
            </CustomStackFullWidth>
          </Stack>
        )}
      </Grid>
    </CustomStackFullWidth>
  );
};

export default DeliveryManTip;
