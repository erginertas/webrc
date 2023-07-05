import React, { useEffect } from "react";
import ParcelHero from "./ParcelHero";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ParcelCategory from "./parcel-category/ParcelCategory";

const PercelComponents = () => {
  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);
  return (
    <CustomStackFullWidth spacing={5}>
      <ParcelHero />
      <ParcelCategory />
    </CustomStackFullWidth>
  );
};

export default PercelComponents;
