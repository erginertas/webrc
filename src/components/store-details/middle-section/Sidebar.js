import React, { useEffect, useReducer, useState } from "react";
import { Scrollbar } from "../../srollbar";
import {
  Button,
  Drawer,
  styled,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Skeleton } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import H1 from "../../typographies/H1";
import CustomDivider from "../../CustomDivider";
import CustomSlider from "../../search/CustomSlider";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@emotion/react";

const CustomPaperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "paper.default",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: "1rem",
  color: theme.palette.neutral[900],
}));
const initialState = {
  categories: [],
  isSelected: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setCategories":
      return {
        ...state,
        categories: action.payload,
      };
    case "setIsSelected":
      return {
        ...state,
        isSelected: action.payload,
      };
    default:
      return state;
  }
};
const ACTION = {
  setCategories: "setCategories",
  setIsSelected: "setIsSelected",
};
const Sidebar = (props) => {
  const {
    open,
    onClose,
    ownCategories,
    handleCategoryId,
    handleChangePrice,
    priceFilterRange,
    storesApiLoading,
    searchIsLoading,
    storeId
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { t } = useTranslation();
  const theme = useTheme();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const [minMax, setMinMax] = useState([0, 0]);
  const handleOnSuccess = (res) => {
    if (ownCategories?.length > 0 && res?.data?.length > 0) {
      const common = res?.data?.filter((item) =>
        ownCategories.some((oItem) => oItem === item?.id)
      );
      dispatch({ type: ACTION.setCategories, payload: common });
    }
  };
  const searchKey = "";
  const queryKey = "stores-categories";

  const { refetch, isFetched, isFetching, isLoading } = useGetCategories(
    searchKey,
    handleOnSuccess,
    queryKey
  );
  useEffect(() => {
    refetch();
  }, [storeId]);

  const handleCategoriesClick = (id) => {
    dispatch({ type: ACTION.setIsSelected, payload: id });
    handleCategoryId?.(id);
  };
  const handleMinMax = (value) => {
    if (value[0] === 0) {
      value[0] = priceFilterRange?.[0]?.min_price;
    }
    setMinMax(value);
  };
  const handleFilter = () => {
    handleChangePrice(minMax);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          width: "100%",
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <CustomStackFullWidth sx={{ padding: "1rem" }} spacing={2}>
          <CustomPaperBox>
            <CustomStackFullWidth p="1rem">
              <Typography fontWeight="bold" color={theme.palette.neutral[1000]}>
                {" "}
                {t("Categories")}
              </Typography>
              <List>
                <ListItemButton
                  selected={state.isSelected === 0}
                  onClick={() => handleCategoriesClick(0)}
                >
                  <ListItemText
                    sx={{
                      color: (theme) =>
                        state.isSelected === 0
                          ? "primary.main"
                          : theme.palette.neutral[1000],
                      fontWeight: state.isSelected === 0 && "bold",
                    }}
                  >
                    {t("All")}
                  </ListItemText>
                  {/*{state.isSelected === 0 && <KeyboardArrowRightIcon />}*/}
                </ListItemButton>
                <Scrollbar style={{ maxHeight: "200px" }}>
                  {state.categories.length > 0 &&
                    state.categories.map((item, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          selected={state.isSelected === item?.id}
                          onClick={() => handleCategoriesClick(item?.id)}
                        >
                          <ListItemText
                            sx={{
                              color: (theme) =>
                                state.isSelected === item?.id
                                  ? "primary.main"
                                  : theme.palette.neutral[1000],
                              fontWeight:
                                state.isSelected === item?.id && "bold",
                            }}
                          >
                            {item?.name}
                          </ListItemText>
                          {/*{state.isSelected === item?.id && (*/}
                          {/*  <KeyboardArrowRightIcon />*/}
                          {/*)}*/}
                        </ListItemButton>
                      );
                    })}
                  {isFetching &&
                    [...Array(4)].map((item, index) => {
                      return (
                        <ListItemButton key={index}>
                          <ListItemText>
                            <Skeleton
                              variant="rectangle"
                              height="10px"
                              width="100%"
                            />
                          </ListItemText>
                        </ListItemButton>
                      );
                    })}
                </Scrollbar>
              </List>
            </CustomStackFullWidth>
          </CustomPaperBox>
          <CustomPaperBox>
            <CustomStackFullWidth p="1rem" spacing={1} key={"12"}>
              <Typography fontWeight="bold" color={theme.palette.neutral[1000]}>
                {t("Price Range")}
              </Typography>
              <CustomDivider />
              <CustomSlider
                handleChangePrice={handleMinMax}
                minMax={minMax}
                priceFilterRange={
                  priceFilterRange?.length > 0 && priceFilterRange[0]
                }
              />
              <CustomStackFullWidth
                direction="column"
                alignItems="center"
                spacing={2}
                //flexWrap='wrap'
              >
                <TextField
                  variant="outlined"
                  value={minMax[0] === 0 ? "" : minMax[0]}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setMinMax((prevState) => [e.target.value, prevState[1]]);
                    }
                  }}
                  label={t("Min")}
                />
                <TextField
                  variant="outlined"
                  value={minMax[1] === 0 ? "" : minMax[1]}
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      setMinMax((prevState) => [prevState[0], e.target.value]);
                    }
                  }}
                  label={t("Max")}
                />
                <LoadingButton
                  variant="contained"
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.light,
                  }}
                  onClick={() => handleFilter()}
                  loading={storesApiLoading}
                  disabled={JSON.stringify(minMax) === JSON.stringify([0, 0])}
                >
                  <ArrowRightIcon fontSize="large" />
                </LoadingButton>
              </CustomStackFullWidth>
            </CustomStackFullWidth>
          </CustomPaperBox>
        </CustomStackFullWidth>
      </Scrollbar>
    </>
  );
  if (lgUp) {
    return (
      <Box
        sx={{
          //backgroundColor: "paper.default",
          width: "100%",
          py: "3px",
          height: "100%",
        }}
      >
        {content}
      </Box>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "paper.default",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
