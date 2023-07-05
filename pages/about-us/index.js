import {useTranslation} from "react-i18next";
import useGetPolicyPage from "../../src/api-manage/hooks/react-query/useGetPolicyPage";
import {useEffect} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MetaData from "../meta-data";
import MainLayout from "../../src/components/layout/MainLayout";
import PolicyPage from "../../src/components/policy-page";
import {getServerSideProps} from "../index";

const Index = ({configData, landingPageData}) => {
    const {t} = useTranslation();
    const {data, refetch, isFetching} = useGetPolicyPage("/about-us");
    useEffect(() => {
        refetch();
    }, []);
    return (
        <>
            <CssBaseline/>
            <MetaData title={`About Us - ${configData?.business_name}`}/>
            <MainLayout configData={configData} landingPageData={landingPageData}>
                <PolicyPage
                    data={data}
                    title={t("About us")}
                    isFetching={isFetching}
                />
            </MainLayout>
        </>
    );
};

export default Index;
export {getServerSideProps};
