import React, { useState } from "react";
import {
    CustomBoxFullWidth,
    CustomStackFullWidth,
    SliderCustom,
} from "../../../../styled-components/CustomStyles.style";
import { alpha, styled, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import CustomImageContainer from "../../../CustomImageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCurrentModuleType } from "../../../../helper-functions/getCurrentModuleType";
import { settings } from "./sliderSettings";
import Slider from "react-slick";
import { IsSmallScreen } from "../../../../utils/CommonValues";
import { setSelectedModule } from "../../../../redux/slices/utils";

const CardWrapper = styled(Stack)(({theme, bg_change}) => ({
    backgroundColor:
        bg_change === "true"
            ? theme.palette.primary.main
            : theme.palette.background.paper,
    color: bg_change === "true" ? theme.palette.whiteContainer.main : "inherit",
    width: "163px",
    height: "55px",
    padding: "12px",
    border: `1px solid ${alpha(theme.palette.neutral[400], 0.2)}`,
    borderRadius: "10px",
    cursor: "pointer",
    position: 'relative',

}));
const ImageWrapper = styled(Box)(({ theme }) => ({
    width: "33px",
    height: "33px",
    position: "relative",
}));
const Card = ({ item, configData, isSelected, handleClick }) => {
    const theme = useTheme();
    return (
        <CardWrapper
            onClick={() => handleClick(item)}
            bg_change={isSelected === item?.module_type ? "true" : "false"}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={.4}
        >
            <Typography
                sx={{
                    cursor: "pointer",
                }}
                variant={IsSmallScreen() ? "h7" : "h6"}
            >
                {item?.module_name}
            </Typography>
            <ImageWrapper>
                <CustomImageContainer
                    src={`${configData?.base_urls?.module_image_url}/${item?.icon}`}
                    alt={item?.module_name}
                    height="100%"
                    width="100%"
                    obejctfit="contained"
                    borderRadius="5px"
                />
            </ImageWrapper>
        </CardWrapper>
    );
};

const ModuleSelectionRaw = (props) => {
    const { isSmall } = props;
    const { modules, configData } = useSelector((state) => state.configData);
    const [isSelected, setIsSelected] = useState(getCurrentModuleType());
    const router = useRouter();
    const dispatch = useDispatch();
    const handleClick = (item) => {
        setIsSelected(item?.module_type);
        dispatch(setSelectedModule(item));
        localStorage.setItem("module", JSON.stringify(item));
        router.replace("/home");
    };

    return (
        <>
            {isSmall ? (
                <CustomBoxFullWidth sx={{ mt: "15px" }}>
                    <SliderCustom>
                        <Slider {...settings}>
                            {modules?.length > 0 &&
                                modules.map((item, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            item={item}
                                            configData={configData}
                                            isSelected={isSelected}
                                            handleClick={handleClick}
                                        />
                                    );
                                })}
                        </Slider>
                    </SliderCustom>
                </CustomBoxFullWidth>
            ) : (
                <CustomStackFullWidth
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                    gap="15px"
                    mt="30px"
                >
                    {modules?.length > 0 &&
                        modules.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    item={item}
                                    configData={configData}
                                    isSelected={isSelected}
                                    handleClick={handleClick}
                                />
                            );
                        })}
                </CustomStackFullWidth>
            )}
        </>
    );
};

ModuleSelectionRaw.propTypes = {};

export default ModuleSelectionRaw;