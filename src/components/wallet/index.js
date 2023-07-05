import React, { useEffect, useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/system";
import CustomImageContainer from "../CustomImageContainer";
import wallet from "./assets/wallet.png";
import { setUser } from "../../redux/slices/profileInfo";
import useGetProfile from "../../api-manage/hooks/react-query/profile/useGetProfile";
import { useDispatch } from "react-redux";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";

import { Skeleton } from "@mui/material";
import TransactionHistory from "../transaction-history";
import useGetWalletTransactionsList from "../../api-manage/hooks/react-query/useGetWalletTransactionsList";

export const WallatBox = styled(Box)(({ theme, nobackground }) => ({
  display: "flex",
  height: "123px",
  background: nobackground === "true" ? "inherit" : theme.palette.primary.main,
  borderRadius: "10px",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
    maxWidth:'343px',
  },
  [theme.breakpoints.up("md")]: {
    width: "330px",
  },
  // padding:'30px'
}));

const Wallet = (props) => {
  const { configData, t } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const userOnSuccessHandler = (res) => {
    dispatch(setUser(res));
    //handleClose()
  };
  const { data: userData, refetch: profileRefetch } =
    useGetProfile(userOnSuccessHandler);
  const [offset, setOffset] = useState(1);
  let pageParams = { offset: offset };
  const { data, refetch, isLoading } = useGetWalletTransactionsList(pageParams);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await refetch();
    await profileRefetch();
  };

  return (
    <CustomStackFullWidth
      my="2rem"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <CustomPaperBigCard sx={{ paddingTop: "4rem", minHeight: "60vh" }}>
        <Grid container >
          <Grid xs={12} md={12} align="center">
            <WallatBox>
              <CustomStackFullWidth
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
              >
                <CustomImageContainer
                  src={wallet?.src}
                  width="60px"
                  height="60px"
                />
                <Stack alignItems="flex-start">
                  <Typography
                    fontWeight="bold"
                    color={theme.palette.whiteContainer.main}
                  >
                    {t("Wallet Amount")}
                  </Typography>
                  <Typography
                    fontSize="20px"
                    fontWeight="bold"
                    color={theme.palette.whiteContainer.main}
                  >
                    {userData ? (
                      getAmountWithSign(userData?.wallet_balance)
                    ) : (
                      <Skeleton variant="text" width="100px" />
                    )}
                  </Typography>
                </Stack>
              </CustomStackFullWidth>
            </WallatBox>
          </Grid>
          <Grid item xs={12}>
            <TransactionHistory data={data} isLoading={isLoading} />
          </Grid>
        </Grid>
      </CustomPaperBigCard>
    </CustomStackFullWidth>
  );
};

Wallet.propTypes = {};

export default Wallet;
