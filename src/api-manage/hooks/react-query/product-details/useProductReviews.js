import MainApi from "../../../MainApi";
import { useQuery } from "react-query";
import { product_reviews_api } from "../../../ApiRoutes";
import { onSingleErrorResponse } from "../../../api-error-response/ErrorResponses";

const getProductReviews = async (id) => {
  const { data } = await MainApi.get(`${product_reviews_api}/${id}`);
  return data;
};

export default function useGetProductReviews(id) {
  return useQuery(["product-reviews", id], () => getProductReviews(id), {
    enabled: false,
    onError: onSingleErrorResponse,
  });
}
