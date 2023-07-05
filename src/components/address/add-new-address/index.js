import React, { useEffect, useReducer } from "react";
import { Box } from "@mui/system";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../modal";
import CloseIcon from "@mui/icons-material/Close";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CustomMapSearch from "../../Map/CustomMapSearch";
import { ACTIONS, initialState, reducer } from "../states";
import {
  handleAgreeLocation,
  handleChange,
  handleChangeForSearch,
  handleClick,
  handleCloseLocation,
  handleCloseModal,
} from "../HelperFunctions";
import { useGeolocated } from "react-geolocated";
import useGetAutocompletePlace from "../../../api-manage/hooks/react-query/google-api/usePlaceAutoComplete";
import useGetGeoCode from "../../../api-manage/hooks/react-query/google-api/useGetGeoCode";
import useGetZoneId from "../../../api-manage/hooks/react-query/google-api/useGetZone";
import useGetPlaceDetails from "../../../api-manage/hooks/react-query/google-api/useGetPlaceDetails";
import GoogleMapComponent from "../../Map/GoogleMapComponent";
import AddressForm from "./AddressForm";
import useGetAddressList from "../../../api-manage/hooks/react-query/address/useGetAddressList";

const AddNewAddress = (props) => {
  const { configData, refetch, t, parcel } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  //useEffect calls for getting data

  //****getting current location/***/
  const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      isGeolocationEnabled: true,
    });

  useEffect(() => {
    dispatch({
      type: ACTIONS.setLocation,
      payload: configData?.default_location,
    });
  }, []);

  const { data: places, isLoading } = useGetAutocompletePlace(
    state.searchKey,
    state.enabled
  );
  useEffect(() => {
    if (places) {
      dispatch({ type: ACTIONS.setPredictions, payload: places?.predictions });
    }
  }, [places]);
  const { data: geoCodeResults, isFetching: isFetchingGeoCode } = useGetGeoCode(
    state.location,
    state.geoLocationEnable
  );
  useEffect(() => {
    if (geoCodeResults?.results) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: geoCodeResults?.results[0]?.formatted_address,
      });
    }
  }, [geoCodeResults, state.location]);
  const { data: zoneData } = useGetZoneId(state.location, state.zoneIdEnabled);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (zoneData) {
        // dispatch(setZoneData(zoneData?.data?.zone_data));
        localStorage.setItem("zoneid", zoneData?.zone_id);
      }
    }
  }, [zoneData]);
  // //********************Pick Location */
  const { isLoading: isLoading2, data: placeDetails } = useGetPlaceDetails(
    state.placeId,
    state.placeDetailsEnabled
  );
  //
  useEffect(() => {
    if (placeDetails) {
      dispatch({
        type: ACTIONS.setLocation,
        payload: placeDetails?.result?.geometry?.location,
      });
    }
  }, [placeDetails]);

  // const orangeColor = theme.palette.primary.main;
  let data = {};

  useEffect(() => {
    if (state.placeDescription) {
      dispatch({
        type: ACTIONS.setCurrentLocation,
        payload: state.placeDescription,
      });
    }
  }, [state.placeDescription]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Box>
      {parcel === "true" ? (
        <Button onClick={() => handleClick(dispatch)}>
          <Typography>{t("Add New Address")}</Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleClick(dispatch)}
          sx={{
            width: { xs: "40px", sm: "inherit" },
            color: (theme) => theme.palette.whiteContainer.main,
          }}
        >
          {isSmall ? t("Add+") : t("Add new address +")}
        </Button>
      )}

      {state.openModal && (
        <CustomModal
          openModal={state.openModal}
          handleClose={() => handleCloseModal(dispatch)}
        >
          <Paper
            sx={{
              position: "relative",
              width: { xs: "300px", sm: "450px", md: "550px", lg: "600px" },
              p: "1.5rem",
            }}
          >
            <IconButton
              onClick={() => handleCloseModal(dispatch)}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon sx={{ fontSize: "16px" }} />
            </IconButton>
            <SimpleBar style={{ maxHeight: "60vh" }}>
              <CustomStackFullWidth alignItems="center" justifyContent="center" sx={{marginBottom:'1rem'}}>
                <Typography variant="h6" mb="5px">
                  {t("Add new address")}
                </Typography>
                <CustomMapSearch
                  showCurrentLocation={state.showCurrentLocation}
                  predictions={state.predictions}
                  handleChange={(event, value) =>
                    handleChange(event, value, dispatch)
                  }
                  HandleChangeForSearch={(event) =>
                    handleChangeForSearch(event, dispatch)
                  }
                  handleAgreeLocation={() =>
                    handleAgreeLocation(coords, dispatch)
                  }
                  currentLocation={state.currentLocation}
                  handleCloseLocation={() => handleCloseLocation(dispatch)}
                  currentLocationValue={{
                    description: state.currentLocation,
                  }}
                  frommap="false"
                  fromParcel="false"
                  isLoading={isFetchingGeoCode}
                />
                {/*<SimpleBar style={{ maxHeight: "60vh" }}></SimpleBar>*/}
              </CustomStackFullWidth>
              <GoogleMapComponent
                height="250px"
                key={state.rerenderMap}
                setLocation={(values) =>{
                  dispatch({
                    type: ACTIONS.setLocation,
                    payload: values,
                  })

                }
                }
                // setCurrentLocation={setCurrentLocation}
                // locationLoading={locationLoading}
                location={state.location}
                setPlaceDetailsEnabled={(value) =>
                  dispatch({
                    type: ACTIONS.setPlaceDetailsEnabled,
                    payload: value,
                  })
                }
                placeDetailsEnabled={state.placeDetailsEnabled}
                locationEnabled={state.locationEnabled}
              />
              <CustomStackFullWidth mt="1.3rem">
                <AddressForm
                  configData={configData}
                  deliveryAddress={
                    geoCodeResults?.results[0]?.formatted_address
                  }
                  personName={data?.f_name}
                  phone={data?.phone}
                  lat={state.location?.lat || ""}
                  lng={state.location?.lng || ""}
                  popoverClose={() =>
                    dispatch({ type: ACTIONS.setOpenModal, payload: false })
                  }
                  refetch={refetch}
                  isRefetcing={isFetchingGeoCode}
                />
              </CustomStackFullWidth>
            </SimpleBar>
          </Paper>
        </CustomModal>
      )}
    </Box>
  );
};

AddNewAddress.propTypes = {};

export default AddNewAddress;
