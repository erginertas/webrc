import React, { useEffect, useState } from "react";
import { Slider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useIsMount } from "../first-render-useeffect-controller/useIsMount";

const CustomSlider = ({ handleChangePrice, minMax, priceFilterRange }) => {
  const { filterData } = useSelector((state) => state.searchFilterStore);
  const [value, setValue] = useState(
    filterData.price !== "" ? filterData.price : minMax ? minMax : [0, 1]
  );
  const minDistance = 1;
  const isMount = useIsMount();
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  useEffect(() => {
    if (isMount) {
      //for doing nothing on first render
    } else {
      handleChangePrice(value);
    }
  }, [value]);
  return (
    <Stack
      direction="row"
      sx={{ mb: 1, ml: 1 }}
      alignItems="center"
      spacing={1}
    >
      <Slider
        key={minMax}
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disabled={priceFilterRange?.min_price === priceFilterRange?.max_price}
        min={priceFilterRange ? priceFilterRange?.min_price : 0}
        max={priceFilterRange ? priceFilterRange?.max_price : 1000}
        sx={{
          marginLeft: "10px",

          "& .MuiSlider-rail": {
            backgroundColor: (theme) => theme.palette.neutral[600],
          },
        }}
        // getAriaValueText={valuetext}
        disableSwap
      ></Slider>
    </Stack>
  );
};

export default CustomSlider;
