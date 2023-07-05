import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import {
  CustomSearchField,
  SearchLocationTextField,
} from "../landing-page/hero-section/HeroSection.style";
import { Autocomplete } from "@mui/material";
import { alpha, IconButton } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import SearchIcon from "@mui/icons-material/Search";
import { FacebookCircularProgress } from "../loading-spinners/FacebookLoading";
const CustomMapSearch = ({
  showCurrentLocation,
  predictions,
  handleChange,
  HandleChangeForSearch,
  handleAgreeLocation,
  currentLocation,
  handleCloseLocation,
  frommap,
  placesIsLoading,
  currentLocationValue,
  fromparcel,
  isLoading,
  noleftborder,
  testLocation,
}) => {
  return (
      <>
        {!showCurrentLocation ? (
            <Autocomplete
                fullWidth
                options={predictions}
                getOptionLabel={(option) => option.description}
                onChange={(event, value) => handleChange(event, value)}
                value={currentLocationValue}
                clearOnBlur={false}
                loading={frommap === "true" ? placesIsLoading : null}
                loadingText={
                  frommap === "true" ? t("Search suggestions are loading...") : ""
                }
                renderInput={(params) => (
                    <SearchLocationTextField
                        noleftborder={noleftborder}
                        frommap={frommap}
                        fromparcel={fromparcel}
                        id="outlined-basic"
                        {...params}
                        placeholder={t("Search location here...")}
                        onChange={(event) => HandleChangeForSearch(event)}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment:
                              frommap === "true" ? (
                                  <IconButton
                                      sx={{
                                        mr: "-65px",
                                        backgroundColor: (theme) =>
                                            alpha(theme.palette.primary.main, 0.2),
                                        borderRadius: "0px",
                                        padding: "7px 10px",
                                      }}
                                      // onClick={() => handleAgreeLocation()}
                                  >
                                    <SearchIcon color="primary" />
                                  </IconButton>
                              ) : currentLocationValue?.description ? (
                                  <IconButton
                                      sx={{
                                        mr: "-61px",
                                      }}
                                  >
                                    <CloseIcon
                                        style={{ cursor: "pointer", height: "23px" }}
                                        onClick={() => handleCloseLocation()}
                                    />
                                  </IconButton>
                              ) : (
                                  <IconButton
                                      sx={{
                                        mr: fromparcel === "true" ? "-61px" : "-31px",
                                        display: "none",
                                      }}
                                      //onClick={() => handleAgreeLocation()}
                                  >
                                    <SearchIcon color="primary" />
                                  </IconButton>
                              ),
                        }}
                        required={true}
                    />
                )}
            />
        ) : (
            <SearchLocationTextField
                margin_top="true"
                size="small"
                variant="outlined"
                id="outlined-basic"
                placeholder={t("Search location here...")}
                value={testLocation ? testLocation : currentLocation}
                onChange={(event) => HandleChangeForSearch(event)}
                required={true}
                frommap={frommap}
                fromparcel={fromparcel}
                InputProps={{
                  endAdornment: !showCurrentLocation ? (
                      <IconButton onClick={() => handleAgreeLocation()}>
                        <GpsFixedIcon color="primary" />
                      </IconButton>
                  ) : (
                      <>
                        {isLoading ? (
                            <FacebookCircularProgress />
                        ) : (
                            <CloseIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleCloseLocation()}
                            />
                        )}
                      </>
                  ),
                }}
            />
        )}
      </>
  );
};

export default CustomMapSearch;
