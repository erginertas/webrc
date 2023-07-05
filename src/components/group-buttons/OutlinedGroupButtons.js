import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import { buttonsData } from "../store-details/buttonsData";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const OutlinedGroupButtons = (props) => {
  const { data, selected, handleSelection } = props;
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {buttonsData?.length > 0 &&
        buttonsData?.map((item, index) => {
          return (
            <Button
              key={index}
              sx={{
                borderRadius: "2px",
                borderBottom: "3px solid",
                borderBottomColor:
                  selected === item?.value
                    ? (theme) => theme.palette.primary.main
                    : "transparent",
              }}
              onClick={() => handleSelection(item.value)}
            >
              <Typography
                variant="h6"
                sx={{
                  color:
                    selected === item?.value
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.neutral[1000],
                }}
              >
                {t(item?.title)}
              </Typography>
            </Button>
          );
        })}
    </Stack>
  );
};

OutlinedGroupButtons.propTypes = {};

export default OutlinedGroupButtons;
