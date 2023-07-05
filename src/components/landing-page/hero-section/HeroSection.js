import React, {useEffect, useState} from "react";
import {alpha, Box, Grid, NoSsr, useMediaQuery, useTheme,} from "@mui/material";
import {CustomBoxFullWidth, CustomStackFullWidth,} from "../../../styled-components/CustomStyles.style";
import HeroTitleSection from "./HeroTitleSection";
import HeroLocationForm from "./HeroLocationForm";
import CustomContainer from "../../container";
import CustomImageContainer from "../../CustomImageContainer";
import iconicBg from "../assets/hero_background.png";
import {useTranslation} from "react-i18next";
import mobileImage from "../assets/mobile.png";
import bags from "../assets/bags.png";
import dynamic from 'next/dynamic';

const DynamicModuleSelection = dynamic(() =>
    import('./module-selection/ModuleSelectionRaw')
);
const HeroSection = ({configData, landingPageData, handleOrderNow}) => {
    const theme = useTheme();
    const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const {t} = useTranslation();
    const [currentLocation, setCurrentLocation] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentLocation(window.localStorage.getItem("location"))
        }
    }, [])


    return (
        <CustomContainer>
            <CustomBoxFullWidth
                sx={{
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    marginTop: {xs: "5rem", sm: "5rem", md: "7rem"},
                    borderRadius: "20px",
                    position: "relative",
                }}
            >
                <Box sx={{position: "absolute"}}>
                    <CustomImageContainer
                        src={iconicBg.src}
                        alt={t("Background")}
                        height="100%"
                        width="100%"
                        borderRadius="20px"
                        objectfit="contained"
                    />
                </Box>
                <Grid container>
                    <Grid
                        item
                        xs={8}
                        md={7}
                        sx={{padding: {xs: "1rem", sm: "3rem"}}}
                    >
                        <NoSsr>
                            <HeroTitleSection
                                configData={configData}
                                landingPageData={landingPageData}
                                handleOrderNow={handleOrderNow}
                            />
                        </NoSsr>
                    </Grid>
                    <Grid item xs={4} md={5} align="right">
                        <CustomStackFullWidth
                            height="100%"
                            alignItems="flex-start"
                            justifyContent="flex-end"
                        >
                            <Box
                                sx={{
                                    height: {xs: "125px", sm: "300px", md: "400px"},
                                    width: {xs: "70px", sm: "200px", md: "250px"},
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px",
                                    border: (theme) =>
                                        `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                    backgroundColor: (theme) => theme.palette.neutral[100],
                                    marginInline: "auto",
                                }}
                            >
                                <CustomImageContainer
                                    src={`${landingPageData?.base_urls?.header_banner_url}/${landingPageData?.header_banner}`}
                                    alt={t("Banner")}
                                    height="100%"
                                    width="100%"
                                    objectfit="contained"
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    height: {xs: "52px", sm: "100px", md: "170px"},
                                    width: {xs: "52px", sm: "100px", md: "170px"},
                                    bottom: 0,
                                    right: {xs: 7, sm: 25, md: 30},
                                }}
                            >
                                <CustomImageContainer
                                    src={`${landingPageData?.base_urls?.header_icon_url}/${landingPageData?.header_icon}`}
                                    alt={t("icon")}
                                    height="100%"
                                    width="100%"
                                    objectfit="contained"
                                />
                            </Box>
                        </CustomStackFullWidth>
                    </Grid>
                </Grid>
            </CustomBoxFullWidth>
            {isXSmall && (
                <>
                    {currentLocation ? (
                        <DynamicModuleSelection isSmall/>
                    ) : (
                        <CustomStackFullWidth mt="10px">
                            <HeroLocationForm/>
                        </CustomStackFullWidth>
                    )}
                </>
            )}
        </CustomContainer>
    );
};

export default HeroSection;
