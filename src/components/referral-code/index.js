import React from "react";
import PropTypes from "prop-types";
import {
  CustomColouredTypography,
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, Typography } from "@mui/material";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import EarnMoney from "./svg/EarnMoney";
import ReferAFriend from "./svg/ReferAFriend";
import CodePreview from "./CodePreview";

const ReferralCode = (props) => {
  const { configData, t } = props;
  const referral = t("referral");
  const get = t("Get");
  const join = t("on joining");
  return (
    <CustomStackFullWidth
      my="2rem"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <CustomPaperBigCard sx={{ minHeight: "60vh" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={12} textAlign="center">
            <Typography
              color="primary.main"
              fontWeight="bold"
              variant="subtitle1"
            >
              {t("Earn money on every referral")}
            </Typography>
            <Typography fontWeight="bold">
              {`1 ${referral} = ${getAmountWithSign(
                configData?.ref_earning_exchange_rate
              )}`}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={6} height="100%">
            <CustomStackFullWidth
              alignItems="center"
              justifyContent="center"
              spacing={2}
              height="100%"
              p="1rem"
            >
              <ReferAFriend />
              <Typography variant="body1">
                {t("Refer your code to your friends")}
              </Typography>
            </CustomStackFullWidth>
          </Grid>
          <Grid xs={12} sm={6} md={6} height="100%">
            <CustomStackFullWidth
              alignItems="center"
              justifyContent="center"
              height="100%"
              spacing={2}
              p="1rem"
            >
              <EarnMoney />
              <Typography variant="body1">
                {`${get} ${getAmountWithSign(
                  configData?.ref_earning_exchange_rate
                )} ${join}`}
              </Typography>
            </CustomStackFullWidth>
          </Grid>
          <Grid xs={12}>
            <CodePreview t={t} />
          </Grid>
        </Grid>
      </CustomPaperBigCard>
    </CustomStackFullWidth>
  );
};

ReferralCode.propTypes = {};

export default ReferralCode;
