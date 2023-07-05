import React, { useState } from "react";
import { InputBase, Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { onErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { usePostNewsletterEmail } from "../../../api-manage/hooks/react-query/newsletter/usePostNewsletterEmail";

const Subscribe = () => {
    const [emailAddress, setEmailAddress] = useState(null);
    const { t } = useTranslation();
    const { mutate, isLoading } = usePostNewsletterEmail();
    const handleSubmit = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(emailAddress) === true) {
            mutate(
                { email: emailAddress },
                {
                    onSuccess: () =>
                        toast.success(t("Subscribed Successfully"), {
                            id: "subscribed-toaster",
                        }),
                    onError: onErrorResponse,
                }
            );
        } else {
            toast.error(t("Please insert a valid email."), {
                id: "subscribed-email-error",
            });
        }
    };
    return (
        <Paper
            elevation={0}
            sx={{
                mt: 1,
                p: "5px",
                display: "flex",
                alignItems: "center",
                backgroundColor: (theme) => theme.palette.neutral[200],
                width: { xs: "100%", sm: "370px" },
                mr: "auto",
                borderRadius: "10px",
            }}
        >
            <InputBase
                sx={{
                    ml: 1.5,
                    mr: 1.5,
                    flex: 1,
                    backgroundColor: (theme) => theme.palette.neutral[200],
                    color: "neutral[100]",
                    align: "center",
                }}
                type="email"
                placeholder={t("Your Email Address")}
                onChange={(e) => setEmailAddress(e.target.value)}
            />
            <LoadingButton
                loading={isLoading}
                sx={{
                    width: "100px",
                    borderRadius: "10px",
                    backgroundColor: "primary.main",
                }}
                variant="contained"
                type="submit"
                aria-label="search"
                onClick={() => handleSubmit()}
            >
                {t("Subscribe")}
            </LoadingButton>
        </Paper>
    );
};

export default Subscribe;
