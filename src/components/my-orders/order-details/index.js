import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ParcelOrder from "./parcel-order/ParcelOrder";
import OtherOrder from "./other-order";
import { useRouter } from "next/router";
import useGetOrderDetails from "../../../api-manage/hooks/react-query/order/useGetOrderDetails";
import useGetTrackOrderData from "../../../api-manage/hooks/react-query/order/useGetTrackOrderData";

const OrderDetails = ({ configData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { refetch, data, isRefetching } = useGetOrderDetails(id);
  const { refetch: refetchTrackOrder, data: trackOrderData } =
    useGetTrackOrderData(id);
  useEffect(() => {
    refetch();
    refetchTrackOrder();
  }, [id]);


  return (
    <div>
      {!isRefetching && data && data.module_type === "parcel" ? (
        <ParcelOrder
          configData={configData}
          data={data}
          trackOrderData={trackOrderData}
          id={id}
          refetch={refetch}
          refetchTrackOrder={refetchTrackOrder}
        />
      ) : (
        <OtherOrder configData={configData} data={data} refetch={refetch} />
      )}
    </div>
  );
};

OrderDetails.propTypes = {};

export default OrderDetails;
