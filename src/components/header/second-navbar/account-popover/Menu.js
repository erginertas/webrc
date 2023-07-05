import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomDialogConfirm from "../../../custom-dialog/confirm/CustomDialogConfirm";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutUser } from "../../../../redux/slices/profileInfo";
import toast from "react-hot-toast";
import { logoutSuccessFull } from "../../../../utils/toasterMessages";
import { menuData } from "./menuData";
import { useRouter } from "next/router";

const Menu = ({ onClose }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { configData } = useSelector((state) => state.configData);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout =  () => {
    setIsLogoutLoading(true);
    try {
      setTimeout(() => {
        dispatch(setLogoutUser(null));
        localStorage.removeItem("token");
        onClose?.();
        toast.success(t(logoutSuccessFull));
        router.push("/home");
        setOpenModal(false);
      }, 500);
    } catch (err) {
    }
  };
  return (
    <Box>
      <MenuList>
        {menuData.map((item, index) => {
          if (
            (configData?.customer_wallet_status === 0 && item.id === 4) ||
            (configData?.loyalty_point_status === 0 && item.id === 5) ||
            (configData?.ref_earning_status === 0 && item.id === 6)
          ) {
            return null;
          } else {
            return (
              <Link key={index} href={`${item?.path}`}>
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.primary.semiLight,
                      color:theme=> theme.palette.neutral[900]
                    },
                  }}
                >
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText>{t(item.name)}</ListItemText>
                </MenuItem>
              </Link>
            );
          }
        })}
        <Divider />
        <MenuItem
          onClick={() => setOpenModal(true)}
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.semiLight,
              color:theme=> theme.palette.neutral[900]
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">{t("Logout")}</Typography>}
          />
        </MenuItem>
      </MenuList>
      <CustomDialogConfirm
        isLoading={isLogoutLoading}
        dialogTexts={t("Are you sure you want to  logout?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleLogout}
      />
    </Box>
  );
};
export default Menu;
