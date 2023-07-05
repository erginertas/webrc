import React, { useEffect, useState } from "react";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import { Grid, Typography, useTheme } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import { Stack } from "@mui/system";
import { Skeleton } from "@mui/material";
import TransactionHistory from "../transaction-history";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/profileInfo";
import useGetProfile from "../../api-manage/hooks/react-query/profile/useGetProfile";
import { WallatBox } from "../wallet";
import tropy from "./assets/tropy.png";
import { PrimaryButton } from "../Map/map.style";
import useGetLoyaltyPointTransactionsList from "../../api-manage/hooks/react-query/loyalty-points/useGetLoyaltyPointTransactionList";
import LoyaltyModal from "./loyalty-modal";

const LoyaltyPoints = (props) => {
  const { configData, t } = props;
  const [offset, setOffset] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const userOnSuccessHandler = (res) => {
    dispatch(setUser(res));
  };
  const { data: userData, refetch: profileRefetch } =
    useGetProfile(userOnSuccessHandler);
  let pageParams = { offset: offset };
  const { data, refetch, isLoading } =
    useGetLoyaltyPointTransactionsList(pageParams);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await profileRefetch();
    await refetch();
  };
  const handleConvertCurrency = () => {
    setOpenModal(true);
  };
  return (
    <CustomStackFullWidth
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <CustomPaperBigCard sx={{ paddingTop: "4rem", minHeight: "60vh" }}>
        <Grid container>
          <Grid xs={12} md={12} align="center">
            <WallatBox nobackground="true">
              <CustomStackFullWidth
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
              >
                <CustomImageContainer
                  src={tropy?.src}
                  width="50px"
                  height="50px"
                />
                <Stack alignItems="flex-start">
                  <Typography
                    fontSize="20px"
                    fontWeight="bold"
                    color={theme.palette.neutral[1000]}
                  >
                    {userData ? (
                      <>{userData?.loyalty_point}</>
                    ) : (
                      <Skeleton variant="text" width="100px" />
                    )}
                  </Typography>
                  <Typography color={theme.palette.neutral[1000]}>
                    {t("Loyalty Points")}
                  </Typography>
                </Stack>
                <PrimaryButton
                  variant="contained"
                  onClick={() => handleConvertCurrency()}
                >
                  {t("Convert to currency now")}
                </PrimaryButton>
              </CustomStackFullWidth>
            </WallatBox>
          </Grid>
          <Grid item xs={12}>
            <TransactionHistory
              data={data}
              isLoading={isLoading}
              page="loyalty"
            />
          </Grid>
        </Grid>
      </CustomPaperBigCard>
      {openModal && (
        <LoyaltyModal
          configData={configData}
          theme={theme}
          t={t}
          openModal={openModal}
          handleClose={() => setOpenModal(false)}
          loyalitydata={userData?.loyalty_point}
          refetch={refetch}
          profileRefetch={profileRefetch}
        />
      )}
    </CustomStackFullWidth>
  );
};

export default LoyaltyPoints;
