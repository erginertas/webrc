import React, { useEffect } from "react";
import useGetCoupons from "../../api-manage/hooks/react-query/useGetCoupons";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../../../public/static/nodata.png";
import Coupon from "./Coupon";
import CustomShimmerCard from "./Shimmer";

const Coupons = (props) => {
  const { data, refetch, isLoading } = useGetCoupons();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box mt="2rem" minHeight="80vh">
      <Grid container spacing={2}>
        {data &&
          data.length > 0 &&
          data.map((coupon, index) => {
            return (
              <Grid item sm={6} xs={12} key={index}>
                <Coupon coupon={coupon} />
              </Grid>
            );
          })}
        {data && data.length === 0 && (
          <CustomEmptyResult label="No Coupon Found" image={nodataimage} />
        )}
        {isLoading && <CustomShimmerCard />}
      </Grid>
    </Box>
  );
};

Coupons.propTypes = {};

export default Coupons;
