import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, NoSsr } from "@mui/material";
import { Box, Stack } from "@mui/system";
import CustomEmptyResult from "../custom-empty-result";
import nodata from "../../../public/static/nodata.png";
import useGetAddressList from "../../api-manage/hooks/react-query/address/useGetAddressList";
import AddNewAddress from "./add-new-address";
import { Skeleton } from "@mui/material";
import Shimmer from "./Shimmer";
import AddressCard from "./address-card";

const Address = (props) => {
  const { configData, t } = props;
  const { data, isLoading, refetch } = useGetAddressList();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <CustomStackFullWidth>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={12} align="right">
          <AddNewAddress refetch={refetch} t={t} configData={configData} />
        </Grid>
        <Grid item xs={12} md={12}>
          <NoSsr>
            <CustomPaperBigCard sx={{ minHeight: "60vh" }}>
              {isLoading ? (
                <Shimmer />
              ) : data && data?.addresses?.length > 0 ? (
                <Box>
                  <Grid container spacing={3}>
                    {data?.addresses?.map((item, index) => {
                      return (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={4}>
                          <AddressCard {...item} refetch={refetch} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              ) : (
                <Stack
                  width="100%"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <CustomEmptyResult label="No Address Found" image={nodata} />
                </Stack>
              )}
            </CustomPaperBigCard>
          </NoSsr>
        </Grid>
      </Grid>
    </CustomStackFullWidth>
  );
};

Address.propTypes = {};

export default Address;
