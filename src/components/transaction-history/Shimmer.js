import React from "react";
import {
  CustomBoxFullWidth,
  CustomPaperBigCard,
} from "../../styled-components/CustomStyles.style";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";

const Shimmer = () => {
  return (
    <>
      {[...Array(4)].map((item, index) => {
        return (
          <Grid item xs={12} key={index} sx={{ padding: "10px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="10%" height={20} />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="10%" height={20} />
            </Stack>
          </Grid>
        );
      })}
    </>
  );
};

export default Shimmer;
