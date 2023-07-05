import {useTranslation} from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import {NoSsr} from "@mui/material";
import UserLayout from "../../src/components/layout/UserLayout";
import React from "react";
import Wallet from "../../src/components/wallet";
import AuthGuard from "../../src/components/route-guard/AuthGuard";
import {useRouter} from "next/router";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <>
            <CssBaseline/>
            <MetaData title={`Wallet - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <NoSsr>
                    <AuthGuard from={router.pathname.replace("/", "")}>
                        <UserLayout
                            component={<Wallet configData={configData} t={t}/>}
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
