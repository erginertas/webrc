import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";

const containerStyle = {
  width: "100%",
  height: "450px",
};
const initialState = {
  isMounted: false,
  map: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setIsMounted":
      return {
        ...state,
        isMounted: action.payload,
      };
    case "setMap":
      return {
        ...state,
        map: action.payload,
      };
    default:
      return state;
  }
};
const ACTION = {
  setIsMounted: "setIsMounted",
  setMap: "setMap",
};
const MapComponent = (props) => {
  const { latitude, longitude } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  const options = useMemo(
    () => ({
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }),
    []
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    dispatch({ type: ACTION.setMap, payload: map });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    dispatch({ type: ACTION.setMap, payload: null });
  }, []);
  useEffect(() => {
    if (state.map) {
      dispatch({ type: ACTION.setIsMounted, payload: true });
    }
  }, [state.map]);
  return isLoaded ? (
    <Stack className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        zoom={10}
        onUnmount={onUnmount}
        options={options}
      >
        {state.isMounted ? (
          <Marker
            position={center}
            // icon={{
            //     url: require('../../../../public/static/markerIcon.png'),
            //     scale: 7,
            // }}
          ></Marker>
        ) : (
          <Stack
            alignItems="center"
            style={{
              zIndex: 3,
              position: "absolute",
              marginTop: -37,
              marginLeft: -11,
              left: "50%",
              top: "50%",
            }}
          >
            <CircularProgress />
          </Stack>
        )}
      </GoogleMap>
    </Stack>
  ) : (
    <></>
  );
};

MapComponent.propTypes = {};

export default MapComponent;
