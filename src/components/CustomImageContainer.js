import React, { useEffect, useState } from "react";
import { CustomImageContainerStyled } from "../styled-components/CustomStyles.style";
import placeholder from "../../public/static/no-image-found.png";

const CustomImageContainer = ({
  cursor,
  mdHeight,
  maxWidth,
  height,
  width,
  objectfit,
  minwidth,
  src,
  alt,
  borderRadius,
  marginBottom,
  smHeight,
  smMb,
  smMaxWidth,
  smWidth,
  aspectRatio,
}) => {
  const [imageFile, setState] = useState(null);
  useEffect(() => {
    setState(src);
  }, [src]);

  return (
    <CustomImageContainerStyled
      height={height}
      width={width}
      objectfit={objectfit}
      minwidth={minwidth}
      border_radius={borderRadius}
      margin_bottom={marginBottom}
      smheight={smHeight}
      sm_mb={smMb}
      max_width={maxWidth}
      sm_max_width={smMaxWidth}
      sm_width={smWidth}
      md_height={mdHeight}
      cursor={cursor}
      aspect_ratio={aspectRatio}
    >
      <img
        src={imageFile}
        alt={alt}
        onError={() => {
          // currentTarget.onerror = null; // prevents looping
          setState(placeholder.src);
        }}
        loading="lazy"
      />
    </CustomImageContainerStyled>
  );
};
export default CustomImageContainer;
