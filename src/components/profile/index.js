import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import CustomShimmerForProfile from "./Shimmer";
import ProfileStatistics from "./ProfileStatistics";
import user from "../../../public/static/profile/profile.png";
import wallet from "../../../public/static/profile/wallet.png";
import loyalty from "../../../public/static/profile/loyality.png";
import order from "../../../public/static/profile/image 38 (2).png";
import useGetUserInfo from "../../api-manage/hooks/react-query/user/useGetUserInfo";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import BasicInformation from "./basic-information";
import { setWalletAmount } from "../../redux/slices/cart";
import { setUser } from "../../redux/slices/profileInfo";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const { configData, t } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSuccess = (res) => {
    localStorage.setItem("wallet_amount", res?.wallet_balance);
    dispatch(setWalletAmount(res?.wallet_balance));
    dispatch(setUser(res));
  };
  const { data, refetch } = useGetUserInfo(handleSuccess);
  // useEffect(() => {
  //   refetch();
  // }, []);
  return (
    <>
      {data ? (
        <>
          <Grid
            container
            spacing={3}
            sx={{ paddingTop: "30px", paddingBottom: "15px" }}
          >
            <Grid item xs={6} sm={6} md={3}>
              <ProfileStatistics
                value={data?.member_since_days}
                title="Days since Joining"
                image={user.src}
                pathname="/profile"
              />
            </Grid>

            {configData?.customer_wallet_status !== 0 && (
              <Grid item xs={6} sm={6} md={3}>
                <ProfileStatistics
                  value={getAmountWithSign(data?.wallet_balance)}
                  title="Amount in Wallet"
                  image={wallet.src}
                  pathname="/wallet"
                />
              </Grid>
            )}
            <Grid item xs={6} sm={6} md={3}>
              <ProfileStatistics
                value={data?.order_count}
                title="My Orders"
                image={order.src}
                pathname="/my-orders"
              />
            </Grid>
            {configData?.loyalty_point_status !== 0 && (
              <Grid item xs={6} sm={6} md={3}>
                <ProfileStatistics
                  value={data?.loyalty_point}
                  title="Loyalty Points"
                  image={loyalty.src}
                  pathname="/loyalty-points"
                />
              </Grid>
            )}
          </Grid>

          <BasicInformation
            data={data}
            refetch={refetch}
            configData={configData}
            t={t}
          />
        </>
      ) : (
        <CustomShimmerForProfile />
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
