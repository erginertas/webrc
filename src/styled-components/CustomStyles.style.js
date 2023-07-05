import {
  Alert,
  alpha,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Fab,
  FormControlLabel,
  InputBase,
  ListItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  styled,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
// import imgB from '../../public/static/Privacy/RectangleP.png'
//import { Link } from 'react-router-dom'
import MuiList from "@mui/material/List";
export const FlexContainerCol = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
export const FlexContainerSpaceBetween = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const FlexContainerCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "1400px",
  width: "100%",
  marginRight: "auto",
  marginLeft: "auto",
});
export const FlexContainer = styled(Box)({
  display: "flex",
  gap: ".5rem",
  overflowX: "auto",
  whiteSpace: "nowrap",
  flexWrap: "nowrap",
  padding: "8px 0px 8px 5px",
  typography: "body1",
  "& :not(style) + :not(style)": {
    ml: 1,
    // mr:2
  },
});
export const CustomTextField = styled(TextField)(({ theme }) => ({
  borderRadius: "13px",

  "& .MuiInputBase-input": {
    padding: "10px 10px",
    "& .MuiOutlinedInput-input": {
      padding: "4px 10px",
      borderRadius: "5px",
    },
  },
}));
export const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
  padding: "10px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.neutral[100],
  color: theme.palette.neutral[1000],
}));
export const CustomPaper = styled(Paper)(({ theme, width, height }) => ({
  //backgroundColor: '#D1D5DB',
  padding: "2rem",
  maxWidth: width ? width : "600px",
  width: "100%",
  minHeight: "300px",
  height: height ? height : "100%",
  borderRadius: "20px",
  justifyContent: "center",
  textAlign: "center",
}));

export const CustomPaperBigCard = styled(Paper)(
  ({
    theme,
    nopadding,
    minheight,
    height,
    backgroundcolor,
    padding,
    width,
    noboxshadow,
  }) => ({
    backgroundColor: backgroundcolor
      ? backgroundcolor
      : theme.palette.background.paper,
    padding: nopadding === "true" ? "none" : padding ? padding : "1.875rem",
    width: width ? width : "100%",
    height: height ? height : "100%",
    minHeight: minheight && minheight,
    borderRadius: "10px",
    boxShadow:
      noboxshadow === "true"
        ? "none"
        : theme.palette.mode === "light"
        ? `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${theme.palette.paperBoxShadow}`
        : "none",
    // marginBottom: '30px',
  })
);

export const CustomButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {},
}));
export const CustomFullDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
}));
export const LayoutCenter = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100%",
  paddingTop: "7.5rem",
}));
export const CustomAlert = styled(Alert)(({ theme }) => ({}));
export const OutletWrapper = styled(Container)(({ theme, iconicSidebar }) => ({
  display: "flex",
  flex: "1 1 auto",
  width: "100%",
  paddingTop: "6.25rem",
  paddingBottom: "10vh",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: iconicSidebar ? 180 : 310,
  },
}));

export const CustomImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",

  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    objectFit: "contained",
  },
}));
export const CustomImageContainerWithBorderRadius = styled(Box)(
  ({ theme }) => ({
    borderRadius: "0.125rem",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contained",
    },
  })
);
export const ImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: "0.125rem",
  position: "relative",
  "& img": {
    width: "100%",
    height: "300px",
    objectFit: "contain",
  },
}));
export const CustomColouredTypography = styled(Typography)(
  ({ theme, color }) => ({
    color: color ? color : theme.palette.primary.main,
  })
);
export const CustomColouredTypographySubtitle = styled(Typography)(
  ({ theme }) => ({
    marginTop: "0.563rem",
    textTransform: "none",
    color: theme.palette.neutral[700],
  })
);

export const CenteringSingleComponentOnLayout = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

export const CustomStack = styled(Stack)({
  alignItems: "start",
  width: "100%",
  paddingLeft: "1rem",
});
export const CustomBoxTab = styled(Box)({
  border: "1px solid #ff903f",
  padding: "5px",
  borderRadius: "15px",
});
export const CustomTabs = styled(Tabs)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  padding: "5px",
  borderRadius: "15px",
  "& .MuiTabs-scrollButtons.Mui-disabled": {
    opacity: 0.3,
  },
}));
export const CloseIconWrapper = styled("div")(
  ({ theme, right, language_direction }) => ({
    top: 0,
    right: language_direction !== "rtl" ? (right ? right : 9) : null,
    left: language_direction === "rtl" ? (right ? right : 9) : null,
    height: "100%",
    position: "absolute",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })
);

export const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.neutral[500],
}));

export const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontWeight: "bold",
  },
}));
export const CustomTypographyBold = styled(Typography)(
  ({ theme, marginTop }) => ({
    fontWeight: "bold",
  })
);
export const CustomTypographyAlign = styled(Typography)(({ theme, align }) => ({
  textAlign: align,
}));

export const CustomChip = styled(Chip)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.whiteContainer.main,
}));

export const CustomIconButton = styled(Box)(({ theme, marginTop }) => ({
  color: theme.palette.neutral[700],
  cursor: "pointer",
}));

export const CustomBoxFullWidth = styled(Box)(({ theme }) => ({
  width: "100%",
}));
export const CustomStackFullWidth = styled(Stack)(
  ({ theme, marginBottom }) => ({
    width: "100%",
  })
);
export const CustomBoxWithSpacing = styled(Box)(
  ({ theme, marginTopBottom }) => ({
    width: "100%",
    marginTop: marginTopBottom && `${marginTopBottom}rem`,
    marginBottom: marginTopBottom && `${marginTopBottom}rem`,
  })
);
// export const CustomLink = styled(Link)(({ theme, width }) => ({
//     textDecoration: 'none',
//     width: width ? '100%' : 'auto',
// }))
export const CustomSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F3F2F2",
  color: "black",
  //alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    //backgroundColor: alpha(theme.palette.common.white, 0.25),
    backgroundColor: "#F3F2F2",
  },
  marginLeft: 0,
  marginRight: "10px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
export const SearchIconWrapper = styled("div")(
  ({ theme, language_direction }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: language_direction === "rtl" ? "0px" : "",
  })
);
export const StyledInputBase = styled(InputBase)(({ theme, width }) => ({
  color: "inherit",
  width: "120px",
  border: "2px solid #EF7822",
  padding: "5px 0",
  marginLeft: "5px",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    fontSize: "1.3rem",
    textAlign: "center",
  },
}));
export const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));
export const Logo = styled("div")(({ theme, height, width }) => ({
  width: width,
  height: height,
  justifyContent: "center",

  position: "relative",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contained",
  },
}));
export const CustomBoxNav = styled(Box)(({ theme, isSmall }) => ({
  // display: isSmall ? 'none' : 'inline',
  flexGrow: 1,
}));
export const CustomLink = styled(Link)(({ theme, color }) => ({
  color: color ? color : "primary.main",
  cursor: "pointer",
  fontWeight: "700",
  "&:hover": {
    //backgroundColor: alpha(theme.palette.common.white, 0.25),
    color: theme.palette.primary.dark,
    textDecoration: "none",
  },
}));
export const CustomOtp = styled(OutlinedInput)(({ theme }) => ({
  width: "60px",
}));
export const CustomTextFieldContainer = styled(Box)(
  ({ theme, background, noheight }) => ({
    width: "100%",
    height: !noheight && "5.5rem",
    color: theme.palette.neutral[1000],
  })
);
export const CustomStackForLoaction = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  cursor: "pointer",
  alignItems: "center",
}));
export const CustomOverlayBox = styled(Box)(({ theme, height, top }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  top: top ? top : 0,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.54)",
  color: "white",
  // padding: '10px',
  height: height ? height : "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "999",
}));
export const EmptyMessageContainer = styled(CustomStackFullWidth)(
  ({ theme }) => ({
    height: "20vh",
    width: "25vw",
  })
);
export const CustomViewAll = styled(Stack)(({ theme }) => ({
  justifyContent: "end",
  color: theme.palette.primary.main,
  paddingTop: "5px",
  paddingBottom: "5px",
  fontSize: "14px",
  cursor: "pointer",
}));
export const CustomFab = styled(Fab)(({ theme }) => ({
  width: "40px",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    width: "33px",
    height: "35px",
  },
}));
export const CustomImageContainerStyled = styled(Box)(
  ({
    theme,
    sm_width,
    max_width,
    margin_bottom,
    width,
    smheight,
    height,
    objectfit,
    minwidth,
    border_radius,
    sm_mb,
    sm_max_width,
    mdHeight,
    cursor,
    aspect_ratio,
  }) => ({
    //maxWidth:'20rem',
    display: "inline-flex",
    background: "transparent",
    width: width ? width : "100%",
    height: height ? height : "100%",
    minWidth: minwidth,
    maxWidth: max_width,
    marginBottom: margin_bottom,
    position: "relative",
    //cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      height: mdHeight ? mdHeight : "",
    },

    [theme.breakpoints.down("sm")]: {
      marginBottom: sm_mb ? sm_mb : "",
      height: smheight ? smheight : "",
      maxWidth: sm_max_width ? sm_max_width : "",
      width: sm_width ? sm_width : "",
    },
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: objectfit ? objectfit : "cover",
      borderRadius: border_radius,
      aspectRatio: aspect_ratio ? aspect_ratio : "",
    },
  })
);
export const CustomListItem = styled(ListItem)(
  ({ theme, display, cursor }) => ({
    display: display,
    cursor: cursor && "pointer",
  })
);
export const CustomBoxRelative = styled(Box)(({ theme, maxWidth, height }) => ({
  position: "relative",
  textAlign: "center",
  maxWidth: maxWidth,
  width: "100%",
  height: height,
}));
export const CustomBoxAbsoluteCenter = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));
export const ccsSelect = styled(Select)(({ theme }) => ({
  select: {
    "&:before": {
      borderColor: (theme) => theme.palette.primary.main,
    },
    "&:after": {
      borderColor: (theme) => theme.palette.primary.main,
    },
  },
  icon: {
    fill: (theme) => theme.palette.primary.main,
  },
}));

export const BackImage = styled(Stack)(({ theme }) => ({
  backgroundImage:
    "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
}));
export const List = styled(MuiList)(({ theme }) => ({}));
export const SliderCustom = styled(Stack)(
    ({ theme, language_direction, nopadding }) => ({
      position: "relative",
      width: "100%",
      paddingY: "10px",
      "& .slick-slider": {
        "& .slick-slide": {
          padding: "6px",
        },
        "& .slick-list": {
          paddingY: nopadding !== "true" && "8px",
          "& .slick-track": {
            float: "left",
            gap: "5px",
          },
        },
      },
    })
);
export const CustomHeroBackground = styled(Box)(({ theme, bgImg }) => ({
  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
  width: "100%",
  height: "100%",
  paddingTop: "8.25rem",
  backgroundImage: `url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
export const customScrollBar = styled(Stack)(({ theme, height }) => ({
  overflowY: "auto",
  height: height,
  "&:hover::-webkit-scrollbar": {
    display: "block",
  },
  "&::-webkit-scrollbar": {
    display: "none",
    width: "0.512rem",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#8d8e90",
    height: "8px",
    borderRadius: "8px",
  },
}));
export const CustomTypographyGray = styled(Typography)(
  ({ theme, nodefaultfont, textdecoration }) => ({
    color: theme.palette.neutral[400],
    fontWeight: "bold",
    fontSize: nodefaultfont !== "true" && "1rem",
    textDecoration: textdecoration,
  })
);
export const CustomBoxForTips = styled(Box)(({ theme }) => ({
  height: "40px",
  width: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
  cursor: "pointer",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    height: "40px",
  },
}));
export const CustomZoom = styled(Stack)(({ theme }) => ({}));
export const StoreDetailsNavButton = styled(Button)(
  ({
    theme,
    color,
    background,
    language_direction,
    borderRigthTop,
    borderRightBottom,
    borderLeftBottom,
    borderLeftTop,
  }) => ({
    backgroundColor: background ? theme.palette.primary.main : "inherit",
    color: background
      ? theme.palette.whiteContainer.main
      : theme.palette.neutral[1000],
    borderRadius: "15px",
    borderBottomLeftRadius: borderLeftBottom && borderLeftBottom,

    "&:hover": {
      backgroundColor: background && theme.palette.primary.light,
    },
  })
);
export const CustomModalWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  backgroundColor: "background.paper",
  p: 2,
  outline: "none",
}));
// export const phoneWrapper=styled((Stack)(({theme})=>({
//
// }))
export const PhoneWrapper = styled(Stack)(({ theme, lanDirection }) => ({
  "&.react-tel-input .special-label": {
    color: focus ? theme.palette.primary.main : theme.palette.neutral[1000],
    left: "10px",
    background: theme.palette.neutral[100],
  },
  "&.react-tel-input .form-control": {
    background: theme.palette.neutral[100],
    color: theme.palette.neutral[1000],
    padding: "1px 70px 0px 1px",
    borderRadius: "8px",
  },
  "&.react-tel-input .form-control:focus": {
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    zIndex: 999,
    boxShadow: "none",
  },
  "&.react-tel-input .country-list .country-name": {
    color: "#000000",
  },
  "&.react-tel-input .flag-dropdown": {
    borderRadius: "8px 0px 0px 8px",
  },
  "&.react-tel-input .selected-flag": {
    marginRight: lanDirection === "rtl" ? "30px" : "0px",
    padding: " 0 0px 0 11px",
  },
  "&.react-tel-input .selected-flag .arrow": {
    left: "29px",
  },
}));
