import React, { useEffect, useState } from "react";
// import {
//   Search,
//   SearchIconWrapper,
//   StyledInputBase,
// } from "./CustomSearch.style";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
// import {
//   CloseIconWrapper,
//   CustomStackFullWidth,
// } from "../../styled-components/CustomStyles.style";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  CloseIconWrapper,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./CustomSearch.style";
const CustomSearch = ({
  handleSearchResult,
  label,
  isLoading,
  selectedValue,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const router = useRouter();
  let language_direction = undefined;
  if (typeof window !== "undefined") {
    language_direction = localStorage.getItem("direction");
  }
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchResult(e.target.value);
      e.preventDefault();
    }
  };
  const handleReset = () => {
    setValue("");
    handleSearchResult?.("");
  };
  const handleChange = (value) => {
    if (value === "") {
      handleSearchResult?.("");
    }
    setValue(value);
  };

  return (
    <CustomStackFullWidth>
      <form onSubmit={handleKeyPress}>
        <Search>
          <SearchIconWrapper language_direction={language_direction}>
            <SearchIcon fontSize="medium" color="primary" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={t(label)}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            inputProps={{ "aria-label": "search" }}
            onKeyPress={(e) => handleKeyPress(e)}
            language_direction={language_direction}
          />
          {value !== "" && (
            <>
              {isLoading ? (
                <CloseIconWrapper
                  right={-1}
                  language_direction={language_direction}
                >
                  <LoadingButton
                    loading
                    variant="text"
                    sx={{ width: "10px" }}
                  />
                </CloseIconWrapper>
              ) : (
                <CloseIconWrapper
                  onClick={() => handleReset()}
                  language_direction={language_direction}
                >
                  <IconButton>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </CloseIconWrapper>
              )}
            </>
          )}
        </Search>
      </form>
    </CustomStackFullWidth>
  );
};

CustomSearch.propTypes = {};

export default CustomSearch;
