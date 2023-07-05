import { useQuery } from "react-query";

import { popular_store_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getPopularStore = async (type) => {
  const { data } = await MainApi.get(
    `${popular_store_api}?type=${type === "take away" ? "take_away" : type}`
  );
  return data;
};

export default function useGetPopularStore(queryKey, type) {
  return useQuery(
    queryKey ? queryKey : "popular-store",
    () => getPopularStore(type),
    {
      enabled: false,
      onError: onSingleErrorResponse,
    }
  );
}
