import React, {useEffect} from "react";
import {alpha, Popover, Stack, Typography, useTheme} from "@mui/material";
import CustomImageContainer from "../../CustomImageContainer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {CustomTypographyGray,} from "../../../styled-components/CustomStyles.style";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {makeStyles} from "@mui/styles";
import {useGetCategories} from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import NavCategoryShimmer from "./NavCategoryShimmer";
import ViewMore from "./ViewMore";
import {getModuleId} from "../../../helper-functions/getModuleId";
import {useRouter} from "next/router";
import {getLanguage} from "../../../helper-functions/getLanguage";
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "../../../redux/slices/storedData";
import {Box} from "@mui/system";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
    },
    paper: {
        pointerEvents: "auto",
        padding: ".5rem",
    },
}));

const CategoryPopover = ({
                             handlePopoverOpenSub,
                             catImageUrl,
                             openSub,
                             anchorElSub,
                             subCategory,
                             shimmer,
                             handlePopoverCloseSub,
                         }) => {
    const {categories} = useSelector((state) => state.storedData);
    const searchKey = "";
    const router = useRouter();
    const theme = useTheme();
    const classes = useStyles();
    const {
        data: categoriesData,
        refetch,
        isFetched,
        isFetching,
        isLoading,
    } = useGetCategories();
    const dispatch = useDispatch();
    useEffect(() => {
        if (categories.length === 0) {
            refetch();
        }
    }, []);
    useEffect(() => {
        if (categoriesData?.data) {
            dispatch(setCategories(categoriesData?.data));
        }
    }, [categoriesData]);
    const primaryColor = theme.palette.primary.main;
    const handleClick = (item) => {
        router.push(
            {
                pathname: "/category/[id]",
                query: {
                    id: `${item?.slug ? item?.slug : item?.id}`,
                    module_id: `${getModuleId()}`,
                },
            },
            undefined,
            {shallow: true}
        );
    };
    const handleClickToSubCategory = (item) => {
        router.push(
            {
                pathname: "/sub-category/[id]",
                query: {
                    id: `${item?.slug ? item?.slug : item?.id}`,
                    module_id: `${getModuleId()}`,
                },
            },
            undefined,
            {shallow: true}
        );
    };
    return (
        <Stack width="305px" padding="20px" spacing={0.5}>
            {isFetching ? (
                <>
                    <NavCategoryShimmer/>
                </>
            ) : (
                <>
                    {categories && categories.length > 0 && (
                        <>
                            {categories?.slice(0, 10)?.map((category, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        onClick={() => handleClick(category)}
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        padding="5px"
                                        onMouseEnter={(event) =>
                                            handlePopoverOpenSub(event, category)
                                        }
                                        sx={{
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.2),
                                            },
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{minWidth: "18px"}}
                                            width="100%"
                                        >
                                            <CustomImageContainer
                                                src={`${catImageUrl}/${category.image}`}
                                                width="25px"
                                                height="25px"
                                                loading="lazy"
                                                borderRadius="0.13rem"
                                            />
                                            <Box style={{width: "170px", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                <Typography
                                                    underline="none"
                                                    variant="subtitle2"
                                                    fontWeight="400"
                                                    color={theme.palette.neutral[1000]}
                                                    sx={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: "1",
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {category.name}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            gap={1}
                                            justifyContent="space-between"
                                        >
                                            <CustomTypographyGray
                                                variant="subtitle2"
                                                nodefaultfont="true"
                                                sx={{
                                                    paddingRight:
                                                        category?.childes.length === 0 && "20px",
                                                }}
                                            >
                                                {category?.childes_count > 0 &&
                                                    `(${category?.childes_count})`}
                                            </CustomTypographyGray>

                                            {category?.childes.length > 0 &&
                                                (getLanguage() === "rtl" ? (
                                                    <ArrowBackIosIcon
                                                        style={{
                                                            width: "12px",
                                                            height: "12px",
                                                        }}
                                                        color={theme.palette.neutral[400]}
                                                    />
                                                ) : (
                                                    <ArrowForwardIosIcon
                                                        style={{
                                                            width: "12px",
                                                            height: "12px",
                                                        }}
                                                        color={theme.palette.neutral[400]}
                                                    />
                                                ))}
                                        </Stack>
                                    </Stack>
                                );
                            })}
                        </>
                    )}
                </>
            )}
            {/*sub category popover*/}
            <Popover
                open={openSub}
                anchorEl={anchorElSub}
                anchorOrigin={{
                    vertical: "20px",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
            >
                <Stack
                    height="100%"
                    sx={{cursor: "pointer"}}
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    {subCategory?.length > 0 && (
                        <>
                            {subCategory?.map((sub) => {
                                return (
                                    <Stack
                                        key={sub?.id}
                                        direction="row"
                                        spacing={2}
                                        px="1rem"
                                        py=".5rem"
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.2),
                                            },
                                        }}
                                        onClick={() => handleClickToSubCategory(sub)}
                                    >
                                        <Typography
                                            // sx={{ color: 'black',  }}
                                            // href="#"
                                            underline="none"
                                            variant="subtitle2"
                                            fontWeight="400"
                                            color={theme.palette.neutral[1000]}
                                            width="200px"
                                            overflow="hidden"
                                            textOverflow="ellipsis"
                                        >
                                            {sub.name}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </>
                    )}
                </Stack>
            </Popover>
            <ViewMore
                redirect="/categories"
                handlePopoverCloseSub={handlePopoverCloseSub}
            />
        </Stack>
    );
};

export default CategoryPopover;
