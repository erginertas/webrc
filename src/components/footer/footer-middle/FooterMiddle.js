import React from "react";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {Grid, useMediaQuery, useTheme} from "@mui/material";
import SocialLinks from "./SocialLinks";
import RouteLinks from "./RouteLinks";
import SomeInfo from "./SomeInfo";
import {useTranslation} from "react-i18next";
import AppLinks from "./AppLinks";
import ractangle from "../../../../public/static/footer/Rectangle.svg";
import phone from "../../../../public/static/footer/phone.svg";
import magnifying from "../../../../public/static/footer/magnifying.svg";
import CustomImageContainer from "../../CustomImageContainer";
import {Box} from "@mui/system";

const FooterMiddle = (props) => {
    const {configData, landingPageData} = props;
    const {t} = useTranslation();
    let zoneid = undefined;
    if (typeof window !== "undefined") {
        zoneid = localStorage.getItem("zoneid");
    }
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    let token;
    const businessLogo = `${configData?.base_urls?.business_logo_url}/${configData?.logo}`;
    return (
        <CustomStackFullWidth sx={{py: {xs: "10px", sm: "3rem"}}}>
            <Grid container spacing={{xs: 3, md: 4}} justifyContent="flex-start">
                <Grid item xs={12} sm={6} md={4}>
                    <CustomStackFullWidth
                        spacing={2}
                        alignItems={{xs: "center", sm: "flex-start"}}
                        justifyContent="flex-start"
                    >
                        <CustomImageContainer
                            src={businessLogo}
                            alt={`${configData?.business_name}`}
                            width="auto"
                            height="50px"
                            objectfit="contain"
                        />

                        <>
                            <SocialLinks configData={configData} landingPageData={landingPageData}/>
                            {(Number.parseInt(
                                        landingPageData?.download_user_app_links?.playstore_url_status) === 1 ||
                                    Number.parseInt(landingPageData?.download_user_app_links?.apple_store_url_status) ===
                                    1) &&
                                <AppLinks configData={configData} changeSingle landingPageData={landingPageData}/>}

                        </>
                    </CustomStackFullWidth>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Box
                        sx={{
                            backgroundImage: {
                                xs: "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                                sm: "none",
                                md: "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                            },
                            backdropFilter: "blur(20px)",
                            borderRadius: "23px",
                            padding: "30px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3} align={isSmall && "center"}>
                                <RouteLinks token={token} configData={configData}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                sx={{
                                    display: {xs: "flex", sm: "none", md: "flex"},
                                    alignItems: "flex-start",
                                }}
                            >
                                <SomeInfo
                                    image={ractangle}
                                    alt="rantangle"
                                    title="Send us mails"
                                    info={configData?.email}
                                    t={t}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                sx={{
                                    display: {xs: "flex", sm: "none", md: "flex"},
                                    alignItems: "flex-start",
                                }}
                            >
                                <SomeInfo
                                    image={phone}
                                    alt="Phone"
                                    title="Contact us"
                                    info={configData?.phone}
                                    t={t}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                sx={{
                                    display: {xs: "flex", sm: "none", md: "flex"},
                                    alignItems: "flex-start",
                                }}
                            >
                                <SomeInfo
                                    image={magnifying}
                                    alt="magnifying"
                                    title="Find us here"
                                    info={configData?.address}
                                    t={t}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{display: {xs: "none", sm: "inherit", md: "none"}}}
                >
                    <Box
                        sx={{
                            width: "100%",
                            backgroundImage: {
                                xs: "none",
                                sm: "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                                md: "none",
                            },
                            backdropFilter: "blur(20px)",
                            borderRadius: "23px",
                            padding: "30px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <SomeInfo
                                    image={ractangle}
                                    alt="rantangle"
                                    title="Send us mails"
                                    info={configData?.email}
                                    t={t}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SomeInfo
                                    image={phone}
                                    alt="Phone"
                                    title="Contact us"
                                    info={configData?.phone}
                                    t={t}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SomeInfo
                                    image={magnifying}
                                    alt="magnifying"
                                    title="Find us here"
                                    info={configData?.address}
                                    t={t}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </CustomStackFullWidth>
    );
};

FooterMiddle.propTypes = {};

export default FooterMiddle;
