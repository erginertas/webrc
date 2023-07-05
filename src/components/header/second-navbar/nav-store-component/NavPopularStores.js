import React, { useEffect } from "react";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../../../styled-components/CustomStyles.style";
//import Subtitle1 from "../../../typographies/Subtitle1";
import H4 from "../../../typographies/H4";
import { alpha, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/system";
import Link from "next/link";
import useGetPopularStore from "../../../../api-manage/hooks/react-query/store/useGetPopularStore";
import NavStoreShimmer from "./NavStoreShimmer";
import ViewMore from "../ViewMore";

import { getModuleId } from "../../../../helper-functions/getModuleId";
import { useRouter } from "next/router";
import { getStoresOrRestaurants } from "../../../../helper-functions/getStoresOrRestaurants";
import { useDispatch, useSelector } from "react-redux";
import { setPopularStores } from "../../../../redux/slices/storedData";

const NavPopularStore = () => {
  const { t } = useTranslation();
  const queryKey = "navbar-stores";
  const filterBy = "all";
  const router = useRouter();
  const { data, refetch, isFetching } = useGetPopularStore(queryKey, filterBy);
  const { popularStores } = useSelector((state) => state.storedData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (popularStores.length === 0) {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(setPopularStores(data));
    }
  }, [data]);

  const handleClick = (item) => {
    router.push(
      {
        pathname: "/store/[id]",
        query: {
          id: `${item?.slug ? item?.slug : item?.id}`,
          module_id: `${getModuleId()}`,
        },
      }
    );
  };
  const popular = t("Popular");
  return (
    <CustomStackFullWidth spacing={4}>
      <Typography variant="h6" fontWeight="500">
        {t(`${popular} ${getStoresOrRestaurants()}`)}
      </Typography>
      <Stack width="100%" spacing={2.5}>
        {!isFetching ? (
          <>
            {popularStores?.slice(0, 6).map((store) => {
              return (
                <Stack
                  key={store.id}
                  width="100%"
                  onClick={() => handleClick(store)}
                >
                  <CustomTypographyGray
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      cursor: "pointer",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    {store.name}
                  </CustomTypographyGray>
                </Stack>
              );
            })}
          </>
        ) : (
          <Stack width="100%">
            <NavStoreShimmer />
          </Stack>
        )}
        <Stack width="70%" justifyContent="flex-start" alignItems="center">
          <ViewMore redirect="/store/popular" />
        </Stack>
      </Stack>
    </CustomStackFullWidth>
  );
};

export default NavPopularStore;
