import React, {useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {DeliveryCaption} from "../CheckOut.style";
import useGetAddressList from "../../../api-manage/hooks/react-query/address/useGetAddressList";
import AddressSelectionField from "./AddressSelectionField";
import AddressSelectionList from "./AddressSelectionList";
import {Skeleton, useTheme} from "@mui/material";


const getZoneWiseAddresses = (addresses, restaurantId) => {
    const newArray = []
    addresses.forEach(item => item.zone_ids.includes(restaurantId) && newArray.push(item))
    return newArray

}
const DeliveryAddress = ({
                             setAddress,
                             address,
                             hideAddressSelectionField,
                             handleSize,
                             renderOnNavbar,
                             configData,
                             storeZoneId
                         }) => {
    const theme = useTheme();
    const {t} = useTranslation();
    const [allAddress, setAllAddress] = useState();
    const [data, setData] = useState(null);

    const mainAddress = {
        ...address,
    };
    const handleSuccess = (addressData) => {
        if (storeZoneId) {
            const newObj = {
                ...addressData,
                addresses: getZoneWiseAddresses(addressData.addresses, storeZoneId)
            }
            setData(newObj)
        } else {
            setData(addressData)
        }
    };
    const {refetch, isRefetching, isLoading} = useGetAddressList(handleSuccess);

    useEffect(() => {
        refetch();
    }, []);
    useEffect(() => {
        // handleSize(data.total_size)
        data && setAllAddress([mainAddress, ...data.addresses]);
    }, [data]);

    const handleLatLng = (values) => {
        setAddress({...values, lat: values.latitude, lng: values.longitude});
    };

    return (
        <>
            <DeliveryCaption>{t("Delivery Addresses")}</DeliveryCaption>
            {isLoading && <Skeleton width="100%" height={150}/>}
            {isRefetching && <Skeleton width="100%" height={150}/>}
            {hideAddressSelectionField !== "true" && (
                <AddressSelectionField
                    theme={theme}
                    address={address}
                    refetch={refetch}
                    t={t}
                    configData={configData}
                />
            )}
            {renderOnNavbar === "true" ? (
                <>
                    <AddressSelectionList
                        data={data}
                        allAddress={allAddress}
                        handleLatLng={handleLatLng}
                        t={t}
                        address={address}
                    />
                </>
            ) : (
                <SimpleBar style={{maxHeight: 200}}>
                    <AddressSelectionList
                        data={data}
                        allAddress={allAddress}
                        handleLatLng={handleLatLng}
                        t={t}
                        address={address}
                        isRefetching={isRefetching}
                    />
                </SimpleBar>
            )}
        </>
    );
};
export default DeliveryAddress;
