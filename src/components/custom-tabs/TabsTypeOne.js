import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import { styled } from "@mui/material/styles";
import { alpha, Button } from "@mui/material";

const CustomButton = styled(Button)(({ theme, isactive }) => ({
  borderRadius: "8px",
  backgroundColor:
    isactive === "true" ? "primary.main" : theme.palette.neutral[200],
  color: isactive === "true" ? "white" : "black",
  width: "178px",
  "&:hover": {
    color: "white",
    backgroundColor: alpha(theme.palette.primary.main, 0.8),
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
  },
}));

const TabsTypeOne = (props) => {
  const { currentTab, setCurrentTab, tabs, t } = props;
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={2}
    >
      {tabs &&
        tabs.length > 0 &&
        tabs.map((item, index) => {
          return (
            <CustomButton
              variant="contained"
              key={index}
              isactive={currentTab === item?.value ? "true" : "false"}
              onClick={() => setCurrentTab(item?.value)}
              sx={{ textTransform: "capitalize" }}
            >
              {t(item?.title)}
            </CustomButton>
          );
        })}
    </Stack>
  );
};

TabsTypeOne.propTypes = {};

export default TabsTypeOne;
