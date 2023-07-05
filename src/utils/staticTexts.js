import { getStoresOrRestaurants } from "../helper-functions/getStoresOrRestaurants";
import { getItemsOrFoods } from "../helper-functions/getItemsOrFoods";

export const not_found_text_store = `No ${getStoresOrRestaurants()} found`;
export const not_found_text_item = `No ${getItemsOrFoods()} found`;
export const forgot_password_header =
  "Please enter your registered mobile number";
