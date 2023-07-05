import React from "react";
import PropTypes from "prop-types";
import { CustomPaperBigCard } from "../../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import BasicInformationForm from "./BasicInformationForm";
import { Stack } from "@mui/system";
import CustomAlert from "../../alert/CustomAlert";
import AccountInformation from "./AccountInformation";

const BasicInformation = (props) => {
  const { data, t, refetch } = props;
  return (
    <CustomPaperBigCard>
      <Grid container>
        <Grid item xs={12}>
          <BasicInformationForm {...props} />
        </Grid>
        <Grid item xs={12}>
          {data?.social_id ? (
            <Stack ml="20px" mr="30px" mb="20px">
              <CustomAlert
                type="info"
                text={t(
                  "Password can not be updated while you are logged in by using social logins."
                )}
              />
            </Stack>
          ) : (
            <AccountInformation data={data} refetch={refetch} />
          )}
        </Grid>
      </Grid>
    </CustomPaperBigCard>
  );
};

BasicInformation.propTypes = {};

export default BasicInformation;
