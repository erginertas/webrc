import React, { useEffect } from "react";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import H1 from "../../typographies/H1";
import ParcelCategoryCard from "./ParcelCategoryCard";
import { Grid } from "@mui/material";
import useGetParcelCategory from "../../../api-manage/hooks/react-query/percel/usePercelCategory";
import ParcelCategoryShimmer from "./ParcelCategoryShimmer";

const ParcelCategory = () => {
  const { data, refetch } = useGetParcelCategory();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <CustomStackFullWidth spacing={2.5} sx={{ paddingBottom: "100px" }}>
      <Stack>
        <H1 text="What are you sending ?" />
      </Stack>
      <CustomStackFullWidth>
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }}>
          {data?.length > 0 ? (
            <>
              {data?.map((item) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ParcelCategoryCard data={item} />
                  </Grid>
                );
              })}
            </>
          ) : (
            <CustomStackFullWidth sx={{ marginTop: "70px" }}>
              <ParcelCategoryShimmer />
            </CustomStackFullWidth>
          )}
        </Grid>
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default ParcelCategory;
