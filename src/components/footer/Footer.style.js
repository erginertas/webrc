import {alpha, Box, Paper, styled} from "@mui/material";
import footerBg from "./footerBg.svg";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
export const StyledFooterBackground = styled(Box)(
    ({ theme, nobottommargin }) => ({
        //minHeight: '500px',
        width: "100%",
        background: theme.palette.primary.deep,
        borderRadius: "20px 20px 0px 0px",
        [theme.breakpoints.down("md")]: {
            marginBottom: nobottommargin === "true" ? "none" : "70px",
        },
    })
);

export const StyledFooterTop = styled(CustomStackFullWidth)(({ theme }) => ({
    padding: "1rem",
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    width: "100%",
}));
