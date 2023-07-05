import React from "react";
import { Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HeadingBox } from "../myorders.style";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { CustomTypography } from "../../landing-page/hero-section/HeroSection.style";
import CustomFormatedDateTime from "../../date/CustomFormatedDateTime";
const TopDetails = ({ data, trackData }) => {
  const { t } = useTranslation();
  return (
    <HeadingBox>
      <CustomStackFullWidth alignItems="center" justifyContent="center">
        {data ? (
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "36px",
              fontWeight: "600",
            }}
          >
            {t("Order")} # {data?.[0]?.order_id?data?.[0]?.order_id:data?.id}
          </Typography>
        ) : (
          <Skeleton variant="text" width="200px" height="50px" />
        )}
        {data ? (
          <CustomTypography
            sx={{ color: (theme) => theme.palette.neutral[400] }}
          >
            {t("Order placed")} :{" "}
            <CustomFormatedDateTime date={data?.[0]?.created_at} />
          </CustomTypography>
        ) : (
          <Skeleton variant="text" width="240px" height="20px" />
        )}

        {trackData?.data?.scheduled === 1 && (
          <CustomTypography>
            {t("Order scheduled")} :
            <CustomFormatedDateTime date={trackData?.data?.schedule_at} />
          </CustomTypography>
        )}
      </CustomStackFullWidth>
    </HeadingBox>
  );
};

export default TopDetails;
