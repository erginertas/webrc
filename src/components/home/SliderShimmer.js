import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Card } from "./featured-categories/card";
import { ButtonLeft, ButtonRight } from "./featured-categories";

const SliderShimmer = () => {
  return (
    <CustomStackFullWidth spacing={3}>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Skeleton width="10%" height="30px" variant="text" />
        <Stack direction="row" alignItems="center" spacing={1}>
          <ButtonLeft onClick={() => slider.current.slickPrev()}>
            <KeyboardArrowLeftIcon color="whiteContainer.main" />
          </ButtonLeft>
          <ButtonRight onClick={() => slider.current.slickNext()}>
            <KeyboardArrowRightIcon />
          </ButtonRight>
        </Stack>
      </CustomStackFullWidth>
      <CustomStackFullWidth direction="row" alignItems="center" spacing={1}>
        {[...Array(6)].map((item, index) => (
          <Card key={index}>
            <Skeleton width="100%" height="100%" variant="rectangle" />
          </Card>
        ))}
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default SliderShimmer;
