import React from "react";
import { CustomColouredTypography } from "../../../styled-components/CustomStyles.style";
import { t } from "i18next";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import PropTypes from "prop-types";

const ViewMore = ({ redirect, handlePopoverCloseSub }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(redirect, undefined, { shallow: true });
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      justifyContent="center"
      padding="10px"
      sx={{ cursor: "pointer" }}
      onMouseEnter={handlePopoverCloseSub}
    >
      <Button onClick={() => handleClick()} variant="text">
        {t("View More")}
      </Button>
    </Stack>
  );
};
ViewMore.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default ViewMore;
