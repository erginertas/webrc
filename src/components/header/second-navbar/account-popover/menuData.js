import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import WalletIcon from "@mui/icons-material/Wallet";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SettingsIcon from "@mui/icons-material/Settings";
export const menuData = [
  {
    id: 1,
    name: "My Orders",
    icon: <ShoppingCartCheckoutIcon />,
    path: "/my-orders",
  },
  {
    id: 2,
    name: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
  {
    id: 3,
    name: "Coupons",
    icon: <ConfirmationNumberIcon />,
    path: "/coupons",
  },
  {
    id: 4,
    name: "Wallet",
    icon: <WalletIcon />,
    path: "/wallet",
  },
  {
    id: 5,
    name: "Loyalty Points",
    icon: <LoyaltyIcon />,
    path: "/loyalty-points",
  },
  {
    id: 6,
    name: "Referral Code",
    icon: <SendToMobileIcon />,
    path: "/referral-code",
  },
  {
    id: 7,
    name: "Address",
    icon: <ImportContactsIcon />,
    path: "/address",
  },

  {
    id: 8,
    name: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];
