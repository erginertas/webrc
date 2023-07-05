import MainApi from "../../../MainApi";
import { store_item_search_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { storeId, searchKey, offset, limit, type } = pageParams;
  const { data } = await MainApi.get(
    `${store_item_search_api}?store_id=${storeId}&name=${searchKey}&offset=${offset}&limit=${limit}&type=${type}`
  );
  return data;
};

export default function useGetSearchedStoreItems(
  pageParams,
  handleSearchSuccess
) {
  return useQuery("searched-store-items", () => getData(pageParams), {
    enabled: false,
    onSuccess: handleSearchSuccess,
    onError: onErrorResponse,
  });
}
