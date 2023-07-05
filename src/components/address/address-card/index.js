import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack } from "@mui/system";
import CustomDivider from "../../CustomDivider";
import IconButton from "@mui/material/IconButton";
import deleteIcon from "../../../../public/static/delete-icon.png";
import { useTranslation } from "react-i18next";
import CustomModal from "../../modal";
import DeleteAddress from "../DeleteAddress";

const AddressCard = (props) => {
  const {
    address_type,
    contact_person_number,
    address,
    road,
    floor,
    house,
    latitude,
    longitude,
    user_id,
    contact_person_name,
    zone_id,
    id,
    refetch,
  } = props;
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Paper
      elevation={8}
      sx={{
        p: "10px",
        border: "1px solid",
        borderColor: (theme) => theme.palette.primary.main,
        height: "100%",
      }}
    >
      <CustomStackFullWidth spacing={2}>
        <CustomStackFullWidth
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <LocationOnIcon
              sx={{
                fontSize: "16px",
                color: (theme) => theme.palette.primary.main,
                marginRight: "8px",
              }}
            />
            <Typography fontWeight="bold" textTransform="capitalize">
              {t(address_type)}
            </Typography>
          </Stack>
          <IconButton onClick={() => setOpenDelete(true)}>
            <img src={deleteIcon.src} />
          </IconButton>
        </CustomStackFullWidth>
        <CustomDivider />
        <Stack>
          <Typography fontWeight="bold" textTransform="capitalize">
            {address}
          </Typography>
          <Typography fontWeight="bold" textTransform="capitalize">
            {t("Floor:")}
          </Typography>
        </Stack>
      </CustomStackFullWidth>
      {openDelete && (
        <DeleteAddress
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          addressId={id}
          refetch={refetch}
        />
      )}
    </Paper>
  );
};

AddressCard.propTypes = {};

export default AddressCard;
