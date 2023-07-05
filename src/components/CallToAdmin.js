import React from 'react';
import {TopBarButton} from "./header/NavBar.style";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {Typography} from "@mui/material";
import ClickToCall from "./header/top-navbar/ClickToCall";

const CallToAdmin = props => {
    const {configData} = props
    return (
        <ClickToCall>
            <TopBarButton
                size="small"
                variant="text"
                startIcon={
                    <LocalPhoneIcon
                        sx={{
                            ml: 1,
                            color: (theme) => theme.palette.neutral[1000],
                        }}
                    />
                }
            >
                <Typography sx={{color: theme => theme.palette.neutral[1000]}}>
                    {configData?.phone}
                </Typography>
            </TopBarButton>
        </ClickToCall>
    );
};

CallToAdmin.propTypes = {};

export default CallToAdmin;