import MainApi from "../../../MainApi";
import { useQuery } from "react-query";

import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { suggestedProducts_api } from "../../../ApiRoutes";

const getSearch = async (pageParams) => {
  const {
    currentTab: search_type,
    searchValue,
    offset,
    page_limit,
  } = pageParams;
  const { data } = await MainApi.get(
    `/api/v1/${search_type}/search?name=${searchValue}&offset=${offset}&limit=${page_limit}`
  );
  return data;
};

export default function useGetSearch(pageParams, handleAPiCallOnSuccess) {
  return useQuery("search-products", () => getSearch(pageParams), {
    enabled: false,
    onSuccess: handleAPiCallOnSuccess,
    onError: onSingleErrorResponse,
  });
}
