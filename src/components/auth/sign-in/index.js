import React, {useEffect, useState} from "react";
import {
    CustomPaperBigCard,
    CustomStackFullWidth,
    CustomTypographyGray,
} from "../../../styled-components/CustomStyles.style";
import {Checkbox, FormControlLabel, NoSsr, Typography, useTheme,} from "@mui/material";
import {Box} from "@mui/system";

import SignInForm from "./SignInForm";
import {CustomTypography} from "../../landing-page/hero-section/HeroSection.style";
import {t} from "i18next";
// import AcceptTermsAndConditions from "../../../../pages/auth/AcceptTermsAndConditions";
import AuthHeader from "../AuthHeader";
import LoadingButton from "@mui/lab/LoadingButton";
import {useRouter} from "next/router";
import SignUpValidation from "./SignInValidation";
import toast from "react-hot-toast";
import {onErrorResponse, onSingleErrorResponse,} from "../../../api-manage/api-error-response/ErrorResponses";
import {useFormik} from "formik";
import {useSignIn} from "../../../api-manage/hooks/react-query/auth/useSignIn";
import {ModuleSelection} from "../../landing-page/hero-section/module-selection";
import useGetProfile from "../../../api-manage/hooks/react-query/profile/useGetProfile";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/slices/profileInfo";
import {loginSuccessFull, moduleSelected, SigninSuccessFull,} from "../../../utils/toasterMessages";
import Link from "next/link";
import SocialLogins from "./social-login/SocialLogins";
import {useVerifyPhone} from "../../../api-manage/hooks/react-query/forgot-password/useVerifyPhone";
import CustomModal from "../../modal";
import OtpForm from "../sign-up/OtpForm";
import {setWishList} from "../../../redux/slices/wishList";
import {useWishListGet} from "../../../api-manage/hooks/react-query/wish-list/useWishListGet";
import {SettingsConsumer, SettingsProvider,} from "../../../contexts/settings-context";
import {setDefaultLanguage} from "../../../utils/setDefaultLanguage";

const SignIn = ({configData}) => {
    const router = useRouter();
    const previousRouteName = router.query.from
    const dispatch = useDispatch();
    const [openModuleSelection, setOpenModuleSelection] = useState(false);
    const [openOtpModal, setOpenOtpModal] = useState(false);
    const [otpData, setOtpData] = useState({phone: ""});
    const [mainToken, setMainToken] = useState(null);
    const [isApiCalling, setIsApiCalling] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const theme = useTheme();
    const textColor = theme.palette.whiteContainer.main;
    let userDatafor = undefined;
    if (typeof window !== "undefined") {
        userDatafor = JSON.parse(localStorage.getItem("userDatafor"));
    }
    const loginFormik = useFormik({
        initialValues: {
            phone: userDatafor ? userDatafor.phone : "",
            password: userDatafor ? userDatafor.password : "",
            tandc: false,
        },
        validationSchema: SignUpValidation(),
        onSubmit: async (values, helpers) => {
            try {
                if (isRemember) {
                    localStorage.setItem("userDatafor", JSON.stringify(values));
                }
                formSubmitHandler(values);
            } catch (err) {
                console.log(err);
            }
        },
    });
    let location = undefined;
    let isModuleSelected = undefined;
    let lanDirection = undefined;
    if (typeof window !== "undefined") {
        location = localStorage.getItem("location");
        isModuleSelected = JSON.parse(localStorage.getItem("module"));
        lanDirection = JSON.parse(localStorage.getItem("settings"));
    }

    const handleOnChange = (value) => {
        loginFormik.setFieldValue("phone", `+${value}`);
    };
    const passwordHandler = (value) => {
        loginFormik.setFieldValue("password", value);
    };
    const handleCheckbox = (e) => {
        loginFormik.setFieldValue("tandc", e.target.checked);
    };
    useEffect(() => {
        if (otpData?.phone !== "") {
            setOpenOtpModal(true);
        }
    }, [otpData]);

    const onSuccessHandler = (response) => {
        dispatch(setWishList(response));
        setIsApiCalling(false);
    };
    const {refetch: wishlistRefetch, isLoading: isLoadingWishlist} =
        useWishListGet(onSuccessHandler);

    const userOnSuccessHandler = (res) => {
        dispatch(setUser(res));
        //handleClose()
    };
    const {data: userData, refetch: profileRefetch} =
        useGetProfile(userOnSuccessHandler);

    const handleTokenAfterSignIn = async (response) => {
        if (response?.data) {
            localStorage.setItem("token", response?.data?.token);
            await wishlistRefetch();
            await profileRefetch();
            toast.success(t(loginSuccessFull));
        }
    };

    const handleTokenAfterSignUp = async (response) => {
        if (response) {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", response?.token);
                await profileRefetch();
                await wishlistRefetch();
            }
            toast.success(t(SigninSuccessFull));
            if (location && !isModuleSelected) {
                setOpenModuleSelection(true);
            } else {
                if (previousRouteName) {
                    router.push('/home')
                } else {
                    await router.back();
                }

            }
            // dispatch(setToken(response?.data?.token));
            // router.push("/");
        }
    };
    const handleCloseModuleModal = (item) => {
        if (item) {
            toast.success(t(moduleSelected));
            if (previousRouteName) {
                router.push('/home')
            } else {
                router.back();
            }
        }
        setOpenModuleSelection(false);
    };
    const handleError = () => {
        setIsApiCalling(false);
    };
    const {mutate} = useSignIn(handleError);
    const formSubmitHandler = (values) => {
        setIsApiCalling(true);
        mutate(values, {
            onSuccess: async (response) => {
                setDefaultLanguage();
                if (configData?.customer_verification) {
                    if (Number.parseInt(response?.is_phone_verified) === 1) {
                        await handleTokenAfterSignUp(response);
                    } else {
                        setOtpData({phone: values?.phone});
                        setMainToken(response);
                    }
                } else {
                    await handleTokenAfterSignUp(response);
                }
            },
            onError: onErrorResponse,
        });
    };

    const {mutate: otpVerifyMutate, isLoading: isLoadingOtpVerifyApi} =
        useVerifyPhone();
    const otpFormSubmitHandler = (values) => {
        const onSuccessHandler = (res) => {
            toast.success(res?.message);
            setOpenOtpModal(false);
            handleTokenAfterSignIn(mainToken);
        };
        otpVerifyMutate(values, {
            onSuccess: onSuccessHandler,
            onError: onSingleErrorResponse,
        });
    };
    const handleFormBasedOnDirection = () => (
        <SettingsProvider>
            <SettingsConsumer>
                {(value) => (
                    <SignInForm
                        configData={configData}
                        handleOnChange={handleOnChange}
                        passwordHandler={passwordHandler}
                        loginFormik={loginFormik}
                        lanDirection={value?.settings?.direction}
                    />
                )}
            </SettingsConsumer>
        </SettingsProvider>
    );
    const rememberMeHandleChange = (e) => {
        if (e.target.checked) {
            setIsRemember(true);
        } else {
            localStorage.removeItem("userDatafor");
        }
    };
    return (
        <>
            <NoSsr>
                <CustomStackFullWidth
                    justifyContent="center"
                    alignItems="center"
                    // mt="10rem"
                    pb="80px"
                >
                    <Box maxWidth="500px" width="100%">
                        <CustomPaperBigCard>
                            <CustomStackFullWidth
                                // justifyContent="center"
                                // alignItems="center"
                                spacing={2}
                            >
                                <AuthHeader configData={configData} title={t("Sign In")}/>

                                <form noValidate onSubmit={loginFormik.handleSubmit}>
                                    <CustomStackFullWidth spacing={2}>
                                        {handleFormBasedOnDirection()}
                                        <CustomStackFullWidth
                                            justifyContent="space-between"
                                            alignItems="center"
                                            direction="row"
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value="remember"
                                                        color="primary"
                                                        onChange={rememberMeHandleChange}
                                                    />
                                                }
                                                label={
                                                    <CustomTypography fontSize="14px">
                                                        {t("Remember me")}
                                                    </CustomTypography>
                                                }
                                            />
                                            <Link href="/forgot-password">
                                                {t("Forgot password?")}
                                            </Link>
                                        </CustomStackFullWidth>
                                        {/*<AcceptTermsAndConditions*/}
                                        {/*  handleCheckbox={handleCheckbox}*/}
                                        {/*  formikType={loginFormik}*/}
                                        {/*/>*/}
                                        <CustomStackFullWidth spacing={2}>
                                            <LoadingButton
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                loading={isApiCalling}
                                                sx={{color: textColor}}
                                            >
                                                {t("Sign In")}
                                            </LoadingButton>
                                            {configData?.social_login?.length > 0 &&
                                                configData?.social_login?.some(
                                                    (item) => item.status === true
                                                ) && (
                                                    <CustomStackFullWidth
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        spacing={1}
                                                    >
                                                        <CustomTypographyGray nodefaultfont="true">
                                                            {t("Or")}
                                                        </CustomTypographyGray>
                                                        <CustomTypography>
                                                            {t("Login with")}
                                                        </CustomTypography>
                                                        <SocialLogins
                                                            socialLogin={configData?.social_login}
                                                        />
                                                    </CustomStackFullWidth>
                                                )}

                                            <Typography>
                                                {t("Don't have an account?")}{" "}
                                                <Link
                                                    href="/auth/sign-up"
                                                    style={{
                                                        color: theme.palette.primary.main,
                                                        textDecoration: "underline",
                                                    }}
                                                >
                                                    {t("Sign Up")}
                                                </Link>
                                            </Typography>
                                        </CustomStackFullWidth>
                                    </CustomStackFullWidth>
                                </form>
                            </CustomStackFullWidth>
                        </CustomPaperBigCard>
                    </Box>
                </CustomStackFullWidth>
            </NoSsr>
            {openModuleSelection && (
                <ModuleSelection
                    location={location}
                    closeModal={handleCloseModuleModal}
                    disableAutoFocus
                />
            )}
            <CustomModal
                handleClose={() => setOpenOtpModal(false)}
                openModal={openOtpModal}
            >
                <OtpForm
                    data={otpData}
                    formSubmitHandler={otpFormSubmitHandler}
                    isLoading={isLoadingOtpVerifyApi}
                />
            </CustomModal>
        </>
    );
};

export default SignIn;
