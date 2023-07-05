import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import MetaData from "../meta-data";
import Profile from "../../src/components/profile";
import UserLayout from "../../src/components/layout/UserLayout";
import {useTranslation} from "react-i18next";
import {NoSsr} from "@mui/material";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import {useRouter} from "next/router";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData,}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Profile - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    <AuthGuard from={router.pathname.replace("/", "")}>
                        <UserLayout
                            component={<Profile configData={configData} t={t}/>}
                            configData={configData}
                            t={t}
                        />
                    </AuthGuard>
                </NoSsr>
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps}
