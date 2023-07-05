import React, {useEffect} from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {alpha, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import CollapsableMenu from "./CollapsableMenu";

import useGetLatestStore from "../../../../api-manage/hooks/react-query/store/useGetLatestStore";
import {useGetCategories} from "../../../../api-manage/hooks/react-query/all-category/all-categorys";
import useGetPopularStore from "../../../../api-manage/hooks/react-query/store/useGetPopularStore";
import {CustomChip, CustomStackFullWidth} from "../../../../styled-components/CustomStyles.style";
import {useDispatch, useSelector} from "react-redux";
import {Scrollbar} from "../../../srollbar";
import ButtonsContainer from "./ButtonsContainer";
import {getStoresOrRestaurants} from "../../../../helper-functions/getStoresOrRestaurants";
import ThemeSwitches from "../ThemeSwitches";
import CallToAdmin from "../../../CallToAdmin";
import CustomLanguage from "../language/CustomLanguage";
import CustomDivider from "../../../CustomDivider";
import {setCategories, setNewStores, setPopularStores} from "../../../../redux/slices/storedData";

const MobileTopMenu = ({
                           handleRoute,
                           toggleDrawer,
                           setOpenDrawer,
                           handleLogout,
                           openModal,
                           isLogoutLoading,
                           setOpenModal,
                           t

                       }) => {
    const {wishLists} = useSelector((state) => state.wishList);
    const {configData, countryCode, language} = useSelector((state) => state.configData);
    const {categories, newStores, popularStores} = useSelector((state) => state.storedData);
    const router = useRouter();
    let token = undefined;
    let location = undefined;
    const dispatch = useDispatch()
    if (typeof window !== undefined) {
        location = localStorage.getItem("location");
        token = localStorage.getItem("token");
    }
    const queryKey = "navbar-stores";
    const type = "all";
    const {data: categoriesApiData, refetch} = useGetCategories();
    const {data: latestStore, refetch: refetchStore} = useGetLatestStore();
    const {
        data: popularData,
        refetch: popularRefetch,
        isLoading: popularIsLoading,
    } = useGetPopularStore(queryKey, type);
    useEffect(() => {
        if (categories.length === 0) {
            refetch();
        }
        if (newStores.length === 0) {
            refetchStore();
        }
        if (popularStores.length === 0) {
            popularRefetch();
        }
    }, []);
    useEffect(() => {
        if (categoriesApiData) {
            dispatch(setCategories(categoriesApiData?.data));
        }
        if (latestStore) {
            dispatch(setNewStores(latestStore));
        }
        if (popularData) {
            dispatch(setPopularStores(popularData));
        }
    }, [categoriesApiData, latestStore, popularData]);

    const collapsableMenu = {
        cat: {
            text: "Categories",
            items: categories?.map((item) => item),
            path: "/category",
        },
        latest: {
            text: `Latest ${getStoresOrRestaurants()}`,
            items: newStores?.map((i) => i),
            path: "/store",
        },
        popularStore: {
            text: `Popular ${getStoresOrRestaurants()}`,
            items: popularStores?.map((i) => i),
            path: "/store",
        },
        profile: {
            text: "Profile",
        },
    };
    const getWishlistCount = () => {
        return wishLists?.item?.length + wishLists?.store?.length;
    };

    return (
        <Box
            sx={{width: "auto"}}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
        >
            <Scrollbar style={{maxHeight: "550px"}}>
                <CustomStackFullWidth gap={1} direction='row' alignItems='center' justifyContent='flex-end' mt='10px'
                                      sx={{paddingInlineEnd: '10px'}}>
                    <CallToAdmin configData={configData}/>
                </CustomStackFullWidth>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    <>
                        <ListItemButton
                            sx={{
                                marginTop: "5px",
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.3),
                                },
                            }}
                        >
                            <ListItemText
                                primary={t("Home")}
                                onClick={() => handleRoute("/home")}
                            />
                        </ListItemButton>
                        {location && (
                            <>
                                <CollapsableMenu
                                    value={collapsableMenu.cat}
                                    setOpenDrawer={setOpenDrawer}
                                    toggleDrawers={toggleDrawer}
                                    pathName="/categories"
                                />
                                <CollapsableMenu
                                    value={collapsableMenu.latest}
                                    setOpenDrawer={setOpenDrawer}
                                    toggleDrawers={toggleDrawer}
                                    pathName="/store/popular"
                                />
                                <CollapsableMenu
                                    value={collapsableMenu.popularStore}
                                    setOpenDrawer={setOpenDrawer}
                                    toggleDrawers={toggleDrawer}
                                    pathName="/store/latest"
                                />
                            </>
                        )}

                        {token && (
                            <>
                                {router.pathname === "/" && (
                                    <ListItemButton
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.3),
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={t("Favorites")}
                                            onClick={() => handleRoute("wishlist")}
                                        />
                                        <CustomChip label={getWishlistCount()} color="secondary"/>
                                    </ListItemButton>
                                )}
                            </>
                        )}
                        <ListItemButton
                            onClick={() => handleRoute("terms-and-conditions")}
                            sx={{
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.3),
                                },
                            }}
                        >
                            <ListItemText primary={t("Terms & Conditions")}/>
                        </ListItemButton>
                        <ListItemButton
                            sx={{
                                "&:hover": {
                                    backgroundColor: (theme) =>
                                        alpha(theme.palette.primary.main, 0.3),
                                },
                            }}
                        >
                            <ListItemText
                                primary={t("Privacy Policy")}
                                onClick={() => handleRoute("privacy-policy")}
                            />
                        </ListItemButton>
                    </>
                </List>
                <CustomStackFullWidth sx={{mt: '-7px'}}>
                    <CustomDivider/>
                </CustomStackFullWidth>
                <CustomStackFullWidth spacing={1} sx={{paddingX: '14px', marginTop: '15px', marginBottom: '10px'}}>
                    <CustomStackFullWidth direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography color='text.secondary'>
                            {t('Theme mode')}
                        </Typography>
                        <ThemeSwitches noText/>
                    </CustomStackFullWidth>
                    <CustomStackFullWidth direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography color='text.secondary'>
                            {t('Language')}
                        </Typography>
                        <CustomLanguage
                            countryCode={countryCode}
                            language={language}
                            noPaddingRight
                        />
                    </CustomStackFullWidth>
                </CustomStackFullWidth>

            </Scrollbar>
            <ButtonsContainer
                token={token}
                handleRoute={handleRoute}
                handleLogout={handleLogout}
                openModal={openModal}
                isLogoutLoading={isLogoutLoading}
                setOpenModal={setOpenModal}
            />
        </Box>
    );
};

export default MobileTopMenu;
