import MainApi from "../../../MainApi";
import { filtered_stores_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { offset, limit, type } = pageParams;
  const { data } = await MainApi.get(
    `${filtered_stores_api}/${
      type === "take away" ? "take_away" : type
    }?offset=${offset}&limit=${limit}`
  );
  return data;
};

export default function useGetStoresByFiltering(pageParams) {
  return useQuery("filtered-stores", () => getData(pageParams), {
    enabled: false,
    onError: onErrorResponse,
  });
}
