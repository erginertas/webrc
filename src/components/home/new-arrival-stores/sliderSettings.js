export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
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
      breakpoint: 760,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 3,
        infinite: false,
      },
    },
    {
      breakpoint: 695,
      settings: {
        slidesToShow: 6,
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
      breakpoint: 340,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
  ],
};
