import { combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "../slices/example";
import themeSettingsReducer from "../slices/themeSettings";
import configDataReducer from "../slices/configData";
import parcelInfoDataReducer from "../slices/parcelDeliveryInfo";
import utilsReducers from "../slices/utils";
import profileInfoReducers from "../slices/profileInfo";
import parcelCategoriesReducers from "../slices/parcelCategoryData";
import cartReducer from "../slices/cart";
import wishListReducer from "../slices/wishList";
import searchFilterReducer from "../slices/searchFilter";
import fbCredentialSliceReducer from "../slices/fbCredentials";
import storedDataSliceReducer from "../slices/storedData";

//register all reducers here
export const rootReducer = combineReducers({
  example: exampleReducer,
  themeSettings: themeSettingsReducer,
  configData: configDataReducer,
  parcelInfoData: parcelInfoDataReducer,
  utilsData: utilsReducers,
  profileInfo: profileInfoReducers,
  parcelCategories: parcelCategoriesReducers,
  cart: cartReducer,
  wishList: wishListReducer,
  searchFilterStore: searchFilterReducer,
  fbCredentialsStore: fbCredentialSliceReducer,
  storedData: storedDataSliceReducer,
});
