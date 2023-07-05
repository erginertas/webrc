import { useTheme } from "@emotion/react";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import {
  CustomPaperBigCard,
  CustomStackFullWidth,
} from "../../styled-components/CustomStyles.style";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";

const ProfileStatistics = ({ value, title, image, pathname }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  return (
    <Link href={`${pathname}`}>
      <Paper
        sx={{ minWidth: "100px", p: "10px", width: "100%", height: "100%" }}
        elevation={6}
      >
        <CardContent>
          <Grid container md={12} xs={12} sx={{ textAlign: "center" }}>
            <Grid item md={10} xs={12}>
              <Stack flexGrow="wrap" width="100%">
                <Typography
                  sx={{
                    fontWeight: "500",
                  }}
                  color={theme.palette.primary.main}
                >
                  {value}
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", textTransform: "capitalize" }}
                >
                  {t(title)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={2} xs={2}>
              <Stack
                sx={{
                  display: { xs: "none", md: "inline" },
                }}
              >
                <img src={image} alt="" />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Link>
  );
};
export default ProfileStatistics;
