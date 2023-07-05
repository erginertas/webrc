import { alpha, InputBase, styled } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  //borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.neutral[200],
  color: theme.palette.neutral[600],
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  height: "35px",
  //margin: 'auto',
  [theme.breakpoints.up("sm")]: {},
}));
export const SearchIconWrapper = styled("div")(
  ({ theme, language_direction }) => ({
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  })
);

export const StyledInputBase = styled(InputBase)(
  ({ theme, language_direction }) => ({
    color: "inherit",
    width: "100%",

    "& .MuiInputBase-input": {
      padding: theme.spacing(0.8, 0, 1.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      paddingRight:
        language_direction === "rtl" && `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  })
);
