import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { ConditionTypography } from "../CheckOut.style";
import { useTranslation } from "react-i18next";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
// import { CustomTypographyGray } from '../../error/Errors.style'
// import { CustomTypography } from '../../custom-tables/Tables.style'
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import Link from "next/link";

const PlaceOrder = (props) => {
  const { placeOrder, orderLoading, zoneData, orderType } = props;
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <CustomPaperBigCard>
      <CustomStackFullWidth alignItems="center" spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChange} />}
            label={
              <CustomTypography>
                {t(`I agree that placing the order places me under`)}{" "}
                <Link
                  href="/terms-and-conditions"
                  style={{ textDecoration: "underline" }}
                >
                  {t("Terms and Conditions")}
                </Link>{" "}
                {t("&")}
                <Link
                  href="/privacy-policy"
                  style={{ textDecoration: "underline" }}
                >
                  {" "}
                  {t("Privacy Policy")}
                </Link>
              </CustomTypography>
            }
          />
        </FormGroup>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          onClick={placeOrder}
          loading={orderLoading}
          disabled={!checked}
        >
          {t("Place Order")}
        </LoadingButton>
      </CustomStackFullWidth>
    </CustomPaperBigCard>
  );
};

PlaceOrder.propTypes = {};

export default PlaceOrder;
