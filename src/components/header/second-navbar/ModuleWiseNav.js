import React, {useEffect, useState} from "react";
import {Avatar, Grid} from "@mui/material";
import LogoSide from "../../logo/LogoSide";
import MobileModuleSelection, {getLocation} from "./mobile-module-select";
import {CustomBoxFullWidth, CustomStackFullWidth,} from "../../../styled-components/CustomStyles.style";
import DrawerMenu from "../top-navbar/drawer-menu/DrawerMenu";
import useGetModule from "../../../api-manage/hooks/react-query/useGetModule";
import {useSelector} from "react-redux";
import {getLanguage} from "../../../helper-functions/getLanguage";

const ModuleWiseNav = (props) => {
    const {router, configData, token, setToggled} = props;
    const [lanDirection, setLanDirection] = useState(null)
    const {data, refetch} = useGetModule();
    const {profileInfo} = useSelector((state) => state.profileInfo);
    const profileImageUrl = `${configData?.base_urls?.customer_image_url}/${profileInfo?.image}`;
    const location = getLocation();
    useEffect(() => {
        refetch();
        const lanDirection = getLanguage();
        if (lanDirection) {
            setLanDirection(lanDirection)
        }
    }, []);
    const handleProfileClick = () => {
        if (token) {
            router.push("/profile", undefined, {shallow: true});
        } else {
            router.push("/auth/sign-in", undefined, {shallow: true});
        }
    };
    const handleFlexendSide = () => (
        <CustomStackFullWidth
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
        >
            <Avatar
                src={profileImageUrl}
                sx={{width: 30, height: 30, cursor: "pointer"}}
                onClick={handleProfileClick}
            />
            <DrawerMenu setToggled={setToggled}/>
        </CustomStackFullWidth>
    );
    return (
        <CustomBoxFullWidth>
            <Grid container alignItems="center">
                {data && data?.length >= 2 ? (
                    <>
                        <Grid
                            item
                            xs={
                                router.pathname === "/home"
                                    ? 1
                                    : router.pathname === "/"
                                        ? 10
                                        : 0
                            }
                            align={
                                lanDirection
                                    ? lanDirection === "ltr"
                                        ? "left"
                                        : "right"
                                    : "left"
                            }
                        >
                            {router.pathname === "/" ? (
                                <LogoSide width="auto" height="50px" configData={configData}/>
                            ) : (
                                router.pathname === "/home" && <MobileModuleSelection/>
                            )}
                        </Grid>
                        {router.pathname !== "/" && (
                            <Grid
                                item
                                xs={router.pathname === "/home" ? 9 : 10}
                                align={
                                    router.pathname === "/home"
                                        ? "center"
                                        : lanDirection
                                            ? lanDirection === "ltr"
                                                ? "left"
                                                : "right"
                                            : "left"
                                }
                            >
                                {router.pathname !== "/" &&
                                    !router.pathname.includes("/auth") && (
                                        <LogoSide
                                            width="100%"
                                            height="40px"
                                            configData={configData}
                                        />
                                    )}
                            </Grid>
                        )}
                        <Grid item xs={2} align="right">
                            {handleFlexendSide()}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={8} align="left">
                            {router.pathname !== "/" ? (
                                !router.pathname.includes("/auth") && (
                                    <LogoSide
                                        width="100%"
                                        height="50px"
                                        configData={configData}
                                    />
                                )
                            ) : (
                                <LogoSide width="100%" height="50px" configData={configData}/>
                            )}
                        </Grid>
                        <Grid item xs={4} align="right">
                            {handleFlexendSide()}
                        </Grid>
                    </>
                )}
            </Grid>
        </CustomBoxFullWidth>
    );
};

ModuleWiseNav.propTypes = {};

export default ModuleWiseNav;
