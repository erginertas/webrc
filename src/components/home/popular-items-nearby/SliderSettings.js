import NextIcon from "../../icons/NextIcon";
import PrevIcon from "../../icons/PrevIcon";
import React from "react";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import {getLanguage} from "../../../helper-functions/getLanguage";

const PrevWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  left: 0,
}));
const NextWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  right: 0,
}));
const Next = ({ onClick, className }) => {
  return (
    <NextWrapper
      className={`client-nav client-next ${className}`}
      onClick={onClick}
    >
      {getLanguage()==="rtl"?<PrevIcon />:<NextIcon />}

    </NextWrapper>
  );
};
const Prev = ({ onClick, className }) => {
  return (
    <PrevWrapper
      className={`client-nav client-prev ${className}`}
      onClick={onClick}
    >
      {getLanguage()==="rtl"?<NextIcon />:<PrevIcon />}

    </PrevWrapper>
  );
};
export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 510,
      settings: {
        slidesToShow: 1.5,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
  prevArrow: <Prev />,
  nextArrow: <Next />,
};
