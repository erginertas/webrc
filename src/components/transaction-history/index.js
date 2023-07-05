import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Shimmer from "./Shimmer";
import Transaction from "./Transaction";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../../../public/static/nodata.png";
import { useTranslation } from "react-i18next";
import useGetWalletTransactionsList from "../../api-manage/hooks/react-query/useGetWalletTransactionsList";
import CustomDivider from "../CustomDivider";

const TransactionHistory = (props) => {
  const { data, isLoading, page } = props;

  const { t } = useTranslation();

  return (
    <>
      <Typography fontSize="18px" fontWeight="700" py="1rem">
        {t("Transaction History")}
      </Typography>
      <CustomDivider />
      {isLoading ? (
        <Shimmer />
      ) : data && data?.data?.length > 0 ? (
        data?.data?.map((item, index) => {
          return <Transaction key={index} data={item} page={page} />;
        })
      ) : (
        <>
          {data?.data?.length === 0 && (
            <CustomEmptyResult
              label="No transaction found"
              image={nodataimage}
            />
          )}
        </>
      )}
    </>
  );
};

export default TransactionHistory;
