import MainApi from "../../../MainApi";
import { latest_items_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { storeId, categoryId, offset, type, limit, minMax } = pageParams;
  if (minMax[0] !== 0 && minMax[1] !== 1) {
    const { data } = await MainApi.get(
      `${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}&min_price=${minMax[0]}&max_price=${minMax[1]}`
    );
    return data;
  } else {
    const { data } = await MainApi.get(
      `${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&offset=${offset}&limit=${limit}&type=${type}`
    );
    return data;
  }
};

export default function useGetStoresCategoriesItem(pageParams, handleSuccess) {
  return useQuery("stores-categories-item", () => getData(pageParams), {
    enabled: false,
    onSuccess: handleSuccess,
    onError: onErrorResponse,
  });
}
