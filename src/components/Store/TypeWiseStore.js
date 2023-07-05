import React, { useEffect, useState } from "react";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import H1 from "../typographies/H1";
import StoreList from "./StoreList";
import useGetTypeWiseStore from "../../api-manage/hooks/react-query/typewise-store/useGetTypeWiseStore";
import { useRouter } from "next/router";
import useGetPopularStore from "../../api-manage/hooks/react-query/store/useGetPopularStore";

const TypeWiseStore = ({ storeType, title }) => {
  const [type, setType] = useState("all");
  const { data, refetch, isLoading } = useGetTypeWiseStore(storeType, type);
  useEffect(() => {
    if (storeType === "latest") {
      refetch();
    } else {
      popularRefetch();
    }
  }, [type]);
  const queryKey = "navbar-stores";
  const router = useRouter();
  const {
    data: popularData,
    refetch: popularRefetch,
    isLoading: popularIsLoading,
  } = useGetPopularStore(queryKey, type);

  return (
    <>
      <CustomPaperBigCard>
        <H1 text={title} textAlign="left" />
        <StoreList
          storeType={storeType}
          type={type}
          setType={setType}
          data={storeType === "latest" ? data : popularData}
          isLoading={storeType === "latest" ? isLoading : popularIsLoading}
        />
      </CustomPaperBigCard>
    </>
  );
};

export default TypeWiseStore;
