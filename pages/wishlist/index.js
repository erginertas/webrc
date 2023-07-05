import React from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import {NoSsr} from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import Wishlists from "../../src/components/wishlist";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Wishlist - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    <AuthGuard from={router.pathname.replace("/", "")}>
                        <Wishlists configData={configData} t={t}/>
                    </AuthGuard>
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
