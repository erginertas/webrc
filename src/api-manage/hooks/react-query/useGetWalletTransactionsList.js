import MainApi from "../../MainApi";
import {
  data_limit,
  transactions_list_api,
  wallet_transactions_list_api,
} from "../../ApiRoutes";
import { useQuery } from "react-query";

const getData = async (pageParams) => {
  const { offset } = pageParams;
  const { data } = await MainApi.get(
    `${wallet_transactions_list_api}?offset=${offset}&limit=${data_limit}`
  );
  return data;
};

export default function useGetWalletTransactionsList(pageParams) {
  return useQuery("wallet-transactions-list", () => getData(pageParams), {
    enabled: false,
  });
}
