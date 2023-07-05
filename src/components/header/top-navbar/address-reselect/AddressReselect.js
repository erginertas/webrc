import React, {useEffect, useRef, useState} from "react";
import RoomIcon from "@mui/icons-material/Room";
import {Stack, Typography, useTheme} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useTranslation} from "react-i18next";
import AddressReselectPopover from "./AddressReselectPopover";
import toast from "react-hot-toast";
import {useRouter} from "next/router";

const AddressReselect = ({location}) => {
    const theme = useTheme();
    const router = useRouter();
    const [openReselectModal, setOpenReselectModal] = useState(false);
    //const { configData, token } = useSelector((state) => state.configDataSettings);
    const [openPopover, setOpenPopover] = useState(false);
    const [address, setAddress] = useState(null);
    const {t} = useTranslation();
    let token = undefined;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }
    useEffect(() => {
        let currentLatLng;
        if (typeof localStorage.getItem("currentLatLng") !== undefined) {
            currentLatLng = JSON.parse(localStorage.getItem("currentLatLng"));
            const location = localStorage.getItem("location");

            setAddress({
                ...currentLatLng,
                latitude: currentLatLng?.lat,
                longitude: currentLatLng?.lng,
                address: location,
                address_type: "Selected Address",
            });
        }
    }, []);

    useEffect(() => {
        if (address) {
            localStorage.setItem("location", address?.address);
            const values = {lat: address?.lat, lng: address?.lng};
            localStorage.setItem("currentLatLng", JSON.stringify(values));
            if (address.zone_ids && address.zone_ids.length > 0) {
                const value = [address.zone_ids];

                localStorage.setItem("zoneid", JSON.stringify(address.zone_ids));
                toast.success(t("New delivery address selected."));
                handleClosePopover();
                window.location.reload();
            }
        }
    }, [address]);
    const handleClickToLandingPage = () => {
        setOpenPopover(true);
        // if (token) {
        // } else {
        //   toast.error(t("Login required."));
        // }
        //
        // setOpenReselectModal(true);
        // localStorage.removeItem("location");
        // localStorage.removeItem("zoneid");
        // router.push("/");
    };
    const handleModalClose = () => {
        setOpenReselectModal(false);
    };
    const anchorRef = useRef(null);
    const handleClosePopover = () => {
        setOpenPopover(false);
    };
    return (
        <>
            <Stack
                sx={{
                    color: (theme) => theme.palette.neutral[1000],
                }}
                direction="row"
                spacing={1}
                onClick={handleClickToLandingPage}
                ref={anchorRef}
            >
                <RoomIcon fontSize="small" color="primary"/>
                <Typography
                    fontSize="16px"
                    align="center"
                    color={theme.palette.neutral[1000]}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        width: "220px",
                    }}
                >
                    {location}
                </Typography>
                <KeyboardArrowDownIcon/>
            </Stack>
            <AddressReselectPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
                t={t}
                address={address}
                setAddress={setAddress}
                token={token}
            />
        </>
    );
};

AddressReselect.propTypes = {};

export default AddressReselect;
