import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";
import { latest_store_api } from "../../../ApiRoutes";
import { useQuery } from "react-query";
import MainApi from "../../../MainApi";

const getLatestStore = async () => {
  const { data } = await MainApi.get(latest_store_api);
  return data;
};

export default function useGetLatestStore() {
  return useQuery("latest-store", getLatestStore, {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
