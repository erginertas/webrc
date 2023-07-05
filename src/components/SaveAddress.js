import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { alpha, Button, Typography, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { CustomStackFullWidth } from "../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import useGetAddressList from "../api-manage/hooks/react-query/address/useGetAddressList";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import AddNewAddress from "./address/add-new-address";
import { Skeleton } from "@mui/material";
const SaveAddress = ({
  handleSenderLocation,
  configData,
  setSenderFormattedAddress,
  setSenderLocation,
  setSenderOptionalAddress,
  setReceiverFormattedAddress,
  setReceiverLocation,
  sender,
  setReceiverOptionalAddress,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data, refetch, isRefetching, isLoading } = useGetAddressList();
  useEffect(() => {
    refetch();
  }, []);

  const handleClick = (adds) => {
    let location = { lat: adds?.latitude, lng: adds?.longitude };
    if (sender === "true") {
      setSenderLocation(location);
      setSenderFormattedAddress(adds.address);
      setSenderOptionalAddress(adds);
    } else {
      setReceiverLocation(location);
      setReceiverFormattedAddress(adds.address);
      setReceiverOptionalAddress(adds);
    }

    setSelectedAddress(adds?.id);
  };
  return (
    <CustomStackFullWidth spacing={2.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">{t("Saved Addresses")}</Typography>
        <AddNewAddress
          refetch={refetch}
          t={t}
          configData={configData}
          parcel="true"
        />
      </Stack>
      <SimpleBar style={{ maxHeight: 130 }}>
        {data?.addresses?.length > 0 &&
          data.addresses?.map((adds, index) => {
            return (
              <Stack
                key={adds.id}
                // alignItems="center"
                justifyContent="flex-start"
                direction="row"
                spacing={1}
                sx={{ cursor: "pointer" }}
                backgroundColor={
                  adds.id === selectedAddress &&
                  alpha(theme.palette.primary.main, 0.3)
                }
                onClick={() => handleClick(adds)}
                padding="1rem"
              >
                <HomeIcon
                  sx={{ width: "16.5px", height: "16.5px" }}
                  color="primary"
                />
                <Stack>
                  <Typography
                    fontSize="14px"
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    {t(adds?.address_type)}
                  </Typography>
                  <Typography fontSize="14px">{adds?.address}</Typography>
                </Stack>
              </Stack>
            );
          })}
        {isLoading && <Skeleton width="100%" height={120} />}
      </SimpleBar>
    </CustomStackFullWidth>
  );
};

export default SaveAddress;
