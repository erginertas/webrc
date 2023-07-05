import React from "react";
import { Router, useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
    CustomColouredTypography,
    CustomStackFullWidth,
} from "../../../styled-components/CustomStyles.style";
import { RouteLinksData } from "../demoLinks";
import { Typography } from "@mui/material";

const RouteLinks = (props) => {
    const { token, configData } = props;
    const { t } = useTranslation();
    const router = useRouter();
    const handleClick = (href, value) => {
        if (value === "loyalty_points" || value === "my_wallet") {
            if (token) {
                Router.push(href, undefined, { shallow: true });
            } else {
                toast.error(t("You must be login to access this page."));
            }
        } else if (value === "campaigns") {
            const zoneId = localStorage.getItem("zoneid");
            if (zoneId) {
                Router.push(href, undefined, { shallow: true });
            } else {
                toast.error(t("You must pick a zone to access this page."));
            }
        } else if (value === "restaurant_owner") {
            window.open(href);
        } else if (value === "delivery_man") {
            window.open(href);
        } else if (value === "help-and-support") {
            router.push(href, undefined, { shallow: true });
        }
    };
    let language_direction;
    // = localStorage.getItem("direction");
    const handleClickToRoute = (href) => {
        router.push(href, undefined, { shallow: true });
    };
    return (
        <CustomStackFullWidth spacing={2}>
            {RouteLinksData.map((item, index) => {
                return (
                    <Typography
                        key={index}
                        color="whiteContainer.main"
                        onClick={() => handleClick(item.link, item.value)}
                        sx={{
                            cursor: "pointer",
                            //transition: "all ease-out .3s",
                            "&:hover": {
                                fontWeight:'bold'
                            },
                        }}
                    >
                        {t(item.name)}
                    </Typography>
                );
            })}
            <Typography
                color="whiteContainer.main"
                onClick={() => handleClickToRoute("/terms-and-conditions")}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        fontWeight:'bold'
                    },
                }}
            >
                {t("Terms & Conditions")}
            </Typography>
            <Typography
                color="whiteContainer.main"
                onClick={() => handleClickToRoute("/privacy-policy")}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        fontWeight:'bold'
                    },
                }}
            >
                {t("Privacy Policy")}
            </Typography>
            {configData?.refund_policy !== 0 && (
                <Typography
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute("/refund-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            fontWeight:'bold'
                        },
                    }}
                >
                    {t("Refund Policy")}
                </Typography>
            )}
            {configData?.cancelation_policy !== 0 && (
                <Typography
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute("/cancellation-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            fontWeight:'bold'
                        },
                    }}
                >
                    {t("Cancellation Policy")}
                </Typography>
            )}
            {configData?.shipping_policy !== 0 && (
                <Typography
                    color="whiteContainer.main"
                    onClick={() => handleClickToRoute("/shipping-policy")}
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            fontWeight:'bold'
                        },
                    }}
                >
                    {t("Shipping Policy")}
                </Typography>
            )}
            <Typography
                color="whiteContainer.main"
                onClick={() => handleClickToRoute("/about-us")}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        fontWeight:'bold'
                    },
                }}
            >
                {t("About Us")}
            </Typography>
        </CustomStackFullWidth>
    );
};

RouteLinks.propTypes = {};

export default RouteLinks;
