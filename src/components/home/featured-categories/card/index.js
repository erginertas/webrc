import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomImageContainer from "../../../CustomImageContainer";
import comp1 from "../../../../../public/static/landing-page/comp1.svg";
import { textWithEllipsis } from "../../../../styled-components/TextWithEllipsis";
import { getModuleId } from "../../../../helper-functions/getModuleId";
import Link from "next/link";

export const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  width: "100px",
  borderRadius: "16px",
  padding: "5px",
  [theme.breakpoints.down("sm")]: {
    height: "110px",
    width: "110px",
  },
}));
const FeaturedItemCard = (props) => {
  const { image, title, id } = props;
  const [hover, setHover] = useState(false);
  const classes = textWithEllipsis();

  // router.push({
  //   pathname: "/category/[id]",
  //   query: { id: `${item?.id}-${getModuleId()}` },
  // });
  return (
    <Link
      href={{
        pathname: "/category/[id]",
        query: {
          id: `${id}`,
          module_id: `${getModuleId()}`,
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          cursor: "pointer",
          //boxShadow: hover && "0 3px 20px rgb(0 0 0 / 0.2)",
          padding: ".8rem",
        }}
      >
        <Card>
          <CustomImageContainer
            src={image}
            alt={title}
            height="100%"
            width="100%"
            borderRadius="16px"
            objectfit="contained"
          />
        </Card>
        <Typography
          textAlign="center"
          // fontWeight="bold"
          className={classes.multiLineEllipsis}
          maxHeight="40px"
          color={hover && "primary.main"}
        >
          {title}
        </Typography>
      </Stack>
    </Link>
  );
};

export default FeaturedItemCard;
