import React, { useEffect, useState } from "react";
import useGetTypeWiseStore from "../../api-manage/hooks/react-query/typewise-store/useGetTypeWiseStore";
import { Box } from "@mui/system";
import { Card, Grid } from "@mui/material";
import StoresInfoCard from "../home/stores-with-filter/cards-grid/StoresInfoCard";
import { getModuleId } from "../../helper-functions/getModuleId";
import { useSelector } from "react-redux";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import GroupButtons from "../GroupButtons";
import { Skeleton } from "@mui/material";
import Shimmer from "../home/stores-with-filter/Shimmer";
import useMediaQuery from "@mui/material/useMediaQuery";

const StoreList = ({ storeType, type, setType, data, isLoading }) => {
  const { selectedModule } = useSelector((state) => state.utilsData);
  const matchesXs = useMediaQuery("(max-width:470px)");
  const { configData } = useSelector((state) => state.configData);
  const store_image_url = `${configData?.base_urls?.store_image_url}`;
  return (
    <Box marginTop="20px" minHeight="60vh">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="flex-start"
        // alignItems="center"
      >
        {selectedModule?.module_type === "food" && (
          <Grid item xs={12} sm={12} md={12} align="center">
            <CustomStackFullWidth alignItems="center" justifyContent="center">
              <GroupButtons setType={setType} type={type} />
            </CustomStackFullWidth>
          </Grid>
        )}

        {data &&
          data?.length > 0 &&
          data?.map((store) => {
            return (
              <Grid
                key={store?.id}
                item
                xs={matchesXs ? 12 : 6}
                sm={6}
                md={3}
                lg={2.4}
              >
                <StoresInfoCard
                  image={`${store_image_url}/${store?.logo}`}
                  title={store?.name}
                  avgRating={store?.avg_rating}
                  address={store?.address}
                  id={store?.id}
                  data={store}
                  moduleId={getModuleId()}
                />
              </Grid>
            );
          })}
      </Grid>
      {isLoading && (
        <Box marginTop="40px">
          <Shimmer count="10" />
        </Box>
      )}
    </Box>
  );
};

export default StoreList;
