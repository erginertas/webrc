import MainApi from "../../../MainApi";
import {
  categories_details_api,
  categories_details_Store_api,
  data_limit,
  my_orders_api,
  popular_items,
} from "../../../ApiRoutes";
import { useQuery } from "react-query";
import {
  onErrorResponse,
  onSingleErrorResponse,
} from "../../../api-error-response/ErrorResponses";

const getData = async (pageParams) => {
  const { category_id, page_limit, offset, type } = pageParams;
  const { data } = await MainApi.get(
    `${categories_details_Store_api}/${category_id}?limit=${page_limit}&offset=${offset}&type=${type}`
  );
  return data;
};

export default function useGetCategoriesForStore(pageParams) {
  return useQuery("categories-details-stores", () => getData(pageParams), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
