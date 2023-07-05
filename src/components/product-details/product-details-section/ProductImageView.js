import React, { useEffect, useRef, useState } from "react";
import {
  CustomStackFullWidth,
  CustomZoom,
  SliderCustom,
} from "../../../styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductsThumbnailsSettings } from "./ProductsThumbnailsSettings";
import { Box, Stack, width } from "@mui/system";
import ReactImageMagnify from "react-image-magnify";
import {
  alpha,
  IconButton,
  NoSsr,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  IconButtonGray,
  LeftArrowStyle,
  RightArrowStyle,
} from "../../home/best-reviewed-items/brt.style";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { handleDiscountChip } from "../../food-details/foodDetail-modal/helper-functions/handleDiscountChip";
import { getLanguage } from "../../../helper-functions/getLanguage";

const ChildrenImageWrapper = styled(Box)(({ theme, index, image_index }) => ({
  cursor: "pointer",
  border: index === image_index && `2px solid ${theme.palette.primary.main}`,
  borderRadius: ".5rem",
  boxSizing: "border-box",
  height: "80px",
  filter: "drop-shadow(0px 3.41085px 8.52713px rgba(0, 0, 0, 0.1))",
  position: "relative",
}));

const ProductImageView = ({
  productImage,
  productThumbImage,
  imageBaseUrl,
  configData,
}) => {
  const [preViewImage, setPreViewImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const tempProduct = productImage;
  useEffect(() => {
    setPreViewImage(tempProduct);
  }, [productImage]);

  const handleClick = (item, index) => {
    setPreViewImage(`${configData?.base_urls?.item_image_url}/${item}`);
    setImageIndex(index);
  };

  const borderColor = theme.palette.primary.main;
  return (
    <Stack justifyContent="flex-start" spacing={2} width="100%">
      <NoSsr>
        <Stack>
          <ReactImageMagnify
            className="magnify-container"
            {...{
              smallImage: {
                alt: "image",
                isFluidWidth: true,
                src: preViewImage,
                //sizes: "(min-width: 480px) 30vw, 80vw",
                // width: tem,
                // height: hs,
              },
              imageClassName: "magnify-image",

              largeImage: {
                src: preViewImage,
                width: 1200,
                height: 1800,
              },
              enlargedImageContainerStyle: {
                backgroundColor: theme.palette.neutral[100],
                zIndex: "1500",
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "100%",
              },
              enlargedImagePosition: isSmall ? "over" : "beside",
              enlargedImageContainerClassName:
                getLanguage() === "rtl" && "rtl-large-image",
            }}
          />
        </Stack>
      </NoSsr>

      {productThumbImage?.length > 0 && (
        <SliderCustom>
          <Slider {...ProductsThumbnailsSettings}>
            {productThumbImage?.map((item, index) => {
              return (
                <ChildrenImageWrapper
                  key={index}
                  onClick={() => handleClick(item, index)}
                  index={index}
                  image_index={imageIndex}
                >
                  <CustomImageContainer
                    src={`${imageBaseUrl}/${item}`}
                    width="100%"
                    height="100%"
                    objectfit="contained"
                    borderRadius=".5rem"
                  />
                </ChildrenImageWrapper>
              );
            })}
          </Slider>
        </SliderCustom>
      )}
    </Stack>
  );
};

export default ProductImageView;
