import React from "react";
import PropTypes from "prop-types";
import CustomModal from "../../modal";
import { Paper, Typography } from "@mui/material";
import { getAmountWithSign } from "../../../helper-functions/CardHelpers";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import Form from "./Form";
import {Stack} from "@mui/system";

const LoyaltyModal = (props) => {
  const {
    openModal,
    handleClose,
    t,
    theme,
    configData,
    loyalitydata,
    refetch,
    profileRefetch,
  } = props;
  const point = t("points");
  return (
    <CustomModal openModal={openModal} handleClose={handleClose}>
      <Paper sx={{ p: "2rem" }}>
        <CustomStackFullWidth spacing={3}>
          <CustomStackFullWidth alignItems='center' justifyContent='center'>
            <Typography
              align="center"
              color={theme.palette.neutral[1000]}
              fontWeight="bold"
              variant="subtitle1"
            >
              {t(
                "Your loyalty point will convert to currency and transfer to wallet"
              )}
            </Typography>
            <Stack direction='row' alignItems='center' spacing={.5}>
              <Typography
                  align="center"
                  color="primary.main"
                  fontWeight="bold"
                  variant="subtitle1"
              >
                {`${
                    configData?.loyalty_point_exchange_rate
                } ${point}`} =
              </Typography>
              <Typography
                  align="center"
                  color="primary.main"
                  fontWeight="bold"
                  variant="subtitle1"
              >
                {`${getAmountWithSign(1)}`}
              </Typography>
            </Stack>
          </CustomStackFullWidth>
          <Form
            loyalitydata={loyalitydata}
            configData={configData}
            handleClose={handleClose}
            refetch={refetch}
            profileRefetch={profileRefetch}
            t={t}
          />
        </CustomStackFullWidth>
      </Paper>
    </CustomModal>
  );
};

LoyaltyModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LoyaltyModal;
