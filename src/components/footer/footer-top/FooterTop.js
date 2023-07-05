import React from "react";
import {StyledFooterTop} from "../Footer.style";
import {alpha, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import Subscribe from "./Subscribe";
import CustomContainer from "../../container";
import {Box} from "@mui/system";
import SubscribeImage from "./SubscribeImage";

const FooterTop = (props) => {
    const {landingPageData} = props
    const {t} = useTranslation();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <StyledFooterTop>
                <CustomContainer>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{height: "100%"}}
                    >
                        <Grid item xs={12} sm={6} md={4}>
                            <CustomStackFullWidth
                                alignItems="flex-start"
                                height="100%"
                                sx={{
                                    position: "relative",
                                    width: {xs: "220px", sm: "300px"},
                                    height: {xs: "20px", sm: "118px"},
                                    marginInline: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: -100,
                                        left: {xs: 7, sm: -108, md: -77},
                                    }}
                                >
                                    <SubscribeImage/>
                                </Box>
                            </CustomStackFullWidth>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={8}
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{height: "100%", mt: {xs: "2rem", sm: "0px"}}}
                        >
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={6}
                                align={isSmall ? "center" : "left"}
                            >
                                <Stack
                                    height="100%"
                                    alignItems={isSmall ? "center" : "flex-start"}
                                    justifyContent="center"
                                    spacing={1}
                                    p="10px"
                                >
                                    <Typography variant="h4">{landingPageData?.fixed_newsletter_title}</Typography>
                                    <Typography
                                        variant="h7"
                                        fontWeight="400"
                                        sx={{
                                            color: (theme) => alpha(theme.palette.neutral[500], 0.8),
                                        }}
                                    >
                                        {landingPageData?.fixed_newsletter_sub_title}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Subscribe/>
                            </Grid>
                        </Grid>
                    </Grid>
                </CustomContainer>
            </StyledFooterTop>
            <StyledFooterTop sx={{padding: "0px", height: "20px"}}>
                <Box sx={{width: "100%"}}></Box>
            </StyledFooterTop>
        </>
    );
};

FooterTop.propTypes = {};

export default FooterTop;
