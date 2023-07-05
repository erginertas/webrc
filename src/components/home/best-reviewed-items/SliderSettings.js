import React from "react";
import {useTheme} from "@mui/material";

export const bestReviewedSliderSettings = {
  //centerMode: true,
  initialSlide: 0,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
        infinite: false,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1.7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
      },
    },
  ],
};
