import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { alpha, styled, Typography } from "@mui/material";
import {
  CustomStackFullWidth,
  CustomTypographyGray,
} from "../../styled-components/CustomStyles.style";
import { useSelector } from "react-redux";
import CustomCopyWithTooltip from "../custom-copy-with-tooltip";

const Wrapper = styled(CustomStackFullWidth)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  padding: "15px",
  border: "2px dashed",
  borderColor: theme.palette.primary.main,
}));

const CodePreview = (props) => {
  const { t } = props;
  const { profileInfo } = useSelector((state) => state.profileInfo);
  return (
    <CustomStackFullWidth sx={{ p: "1rem" }} spacing={1}>
      <Typography
        fontWeight="bold"
        variant="h6"
        sx={{ color: (theme) => theme.palette.customColor.textGrayDeep }}
      >
        {t("Your Referral Code")}
      </Typography>
      <Wrapper
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold">{profileInfo?.ref_code} </Typography>
        <CustomCopyWithTooltip t={t} value={profileInfo?.ref_code} />
      </Wrapper>
    </CustomStackFullWidth>
  );
};

CodePreview.propTypes = {};

export default CodePreview;
