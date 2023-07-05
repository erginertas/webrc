import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import { ButtonLeft, ButtonRight } from "./index";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { getLanguage } from "../../../helper-functions/getLanguage";
import PrevIcon from "../../icons/PrevIcon";
import NextIcon from "../../icons/NextIcon";

const PrevWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  top: -35,
  right: 35,
  left: "unset",
}));
const NextWrapper = styled(Box)(({ theme }) => ({
  top: -35,
  zIndex: 1,
  right: 0,
}));
const Next = ({ onClick, className }) => {
  return (
    <NextWrapper
      className={`client-nav client-next ${className}`}
      onClick={onClick}
    >
      {getLanguage() === "rtl" ? <PrevIcon /> : <NextIcon />}
    </NextWrapper>
  );
};
const Prev = ({ onClick, className }) => {
  return (
    <PrevWrapper
      className={`client-nav client-prev ${className}`}
      onClick={onClick}
    >
      {getLanguage() === "rtl" ? <NextIcon /> : <PrevIcon />}
    </PrevWrapper>
  );
};

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  nextArrow: <Next />,
  prevArrow: <Prev />,

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 840,
      settings: {
        slidesToShow: 6.5,
        slidesToScroll: 2,
        infinite: false,
      },
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5.2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4.2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
  ],
};
