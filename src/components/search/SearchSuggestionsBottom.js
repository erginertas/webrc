import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip, Paper, Popover, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import useGetSuggestedProducts from "../../api-manage/hooks/react-query/search/useGetSuggestedProducts";
import { CustomTypography } from "../landing-page/hero-section/HeroSection.style";
const CustomPaper = styled(Paper)(({ theme, display }) => ({
  position: "absolute",
  top: 50,
  width: "100%",
  padding: "1rem",
  display: display ? display : "inherit",
  [theme.breakpoints.down("md")]: {
    zIndex: 999,
  },
}));
const SearchSuggestionsBottom = (props) => {
  const { setOpenSearchSuggestions, setOnSearchdiv, setSelectedValue } = props;
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
  const [list, setList] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  let token = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const handleSearchSuccess = (res) => {
    if(res?.length>0){
      setSuggestedKeywords(res);
    }
    else{
     if(list?.length===0){
       setOpenSearchSuggestions(false);
     }
    }

  };

  const { refetch, isRefetching } =
    useGetSuggestedProducts(handleSearchSuccess);
  useEffect(() => {
    let getItem = JSON.parse(localStorage.getItem("searchedValues"));
    if (getItem && getItem.length > 0) {
      setList(getItem);
    }
    if (token) {
      refetch();
    }
  }, []);
  const handleSearchHistoryOnClick = (value) => {
    setSelectedValue(value);
    setOpenSearchSuggestions(false);
    router.push(
      {
        pathname: "/search",
        query: {
          searchValue: value,
        },
      },
      "/search"
    );
  };
  const handleSearchSuggestionsOnClick = (value) => {
    setSelectedValue(value);
    setOpenSearchSuggestions(false);
    router.push(
      {
        pathname: "/search",
        query: {
          searchValue: value.substring(0, value.indexOf(" ")),
        },
      },
      "/search"
    );
  };

  const handleDeleteAble = (value) => {
    let getItem = JSON.parse(localStorage.getItem("searchedValues"));
    if (getItem && getItem.length > 0) {
      let newItems = getItem.filter((item) => item !== value);
      setList(newItems);
      localStorage.setItem("searchedValues", JSON.stringify(newItems));
    }
  };
  return (
    <>
      {
        (list?.length > 0 || suggestedKeywords?.length > 0) && <CustomPaper
            elevation={8}
            onMouseEnter={() => setOnSearchdiv(true)}
            onMouseLeave={() => setOnSearchdiv(false)}
            display={token ? "inherit" : list.length > 0 ? "inherit" : "none"}
        >
          <CustomStackFullWidth spacing={1}>
            {list.length > 0 && (
                <Stack spacing={1}>
                  <CustomTypography>{t("History")}</CustomTypography>
                  <Stack direction="row" gap="10px" flexWrap="wrap" flexGrow={1}>
                    {list
                        .slice(0, 5)
                        .reverse()
                        .map((item, index) => {
                          return (
                              <Chip
                                  key={index}
                                  label={item}
                                  onClick={() => handleSearchHistoryOnClick(item)}
                                  onDelete={() => handleDeleteAble(item)}
                                  sx={{ margin: "0px" }}
                              />
                          );
                        })}
                  </Stack>
                </Stack>
            )}
            {suggestedKeywords?.length > 0 && (
                <Stack spacing={1}>
                  <CustomTypography>{t("Suggestions")}</CustomTypography>
                  <Stack
                      direction="row"
                      // spacing={1}
                      flexWrap="wrap"
                      flexGrow={1}
                      alignItems="center"
                      justifyContent="flex-start"
                      gap="10px"
                  >
                    {suggestedKeywords.map((item, index) => {
                      return (
                          <Chip
                              key={index}
                              label={item.name}
                              onClick={() => handleSearchSuggestionsOnClick(item.name)}
                          />
                      );
                    })}
                  </Stack>
                </Stack>
            )}
          </CustomStackFullWidth>
        </CustomPaper>
      }
    </>
  );
};

SearchSuggestionsBottom.propTypes = {};

export default SearchSuggestionsBottom;
