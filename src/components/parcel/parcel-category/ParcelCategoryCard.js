import React, { useEffect } from "react";
import { alpha, Card, Grid, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ButtonLeft, ButtonRight } from "../../home/featured-categories";
import Link from "next/link";
import { setParcelCategories } from "../../../redux/slices/parcelCategoryData";
import { useRouter } from "next/router";
import { textWithEllipsis } from "../../../styled-components/TextWithEllipsis";
import { getLanguage } from "../../../helper-functions/getLanguage";

const ParcelCategoryCard = (props) => {
  const { data } = props;
  const { configData } = useSelector((state) => state.configData);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(setParcelCategories(data));
    router.push("/parcel-delivery-info", undefined, { shallow: true });
  };
  const classes = textWithEllipsis();
  return (
    <CustomStackFullWidth>
      <Card
        {...props}
        sx={{
          padding: "10px",
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Grid container spacing={3}>
          <Grid item xs={4} sm={4} md={4} alignSelf="center">
            <CustomImageContainer
              width="100%"
              src={`${configData?.base_urls?.parcel_category_image_url}/${data?.image}`}
              height="100%"
              objectfit="contain"
              borderRadius=".7rem"
            />
          </Grid>
          <Grid item xs={8} sm={8} md={8} alignSelf="center">
            <Stack width="100%">
              <Typography variant="h6">{data?.name}</Typography>
              <Typography
                className={classes.multiLineEllipsis}
                maxHeight="40px"
              >
                {data?.description}
              </Typography>
            </Stack>
            <Stack justifyContent="flex-end" alignItems="end">
              <ButtonLeft language_direction={getLanguage()}>
                <KeyboardArrowRightIcon />
              </ButtonLeft>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </CustomStackFullWidth>
  );
};

export default ParcelCategoryCard;
