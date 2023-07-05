import MainApi from "../../../MainApi";
import { latest_items_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { storeId, categoryId, productId, offset, type, limit, minMax } =
    pageParams;
  const { data } = await MainApi.get(
    `${latest_items_api}?store_id=${storeId}&category_id=${categoryId}&product_id=${productId}&offset=${offset}&limit=${limit}&type=${type}`
  );
  return data;
};

export default function useGetMoreFromStores(pageParams, handleSuccess) {
  return useQuery("stores-categories-item", () => getData(pageParams), {
    enabled: false,
    onSuccess: handleSuccess,
    onError: onErrorResponse,
  });
}
