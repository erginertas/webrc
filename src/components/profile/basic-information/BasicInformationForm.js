import React, { useRef, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { ButtonBox, SaveButton } from "./Profile.style";
import { useFormik } from "formik";
import ValidationSechemaProfile from "./Validation";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CustomDialogConfirm from "../../custom-dialog/confirm/CustomDialogConfirm";
import toast from "react-hot-toast";
import { useDeleteProfile } from "../../../api-manage/hooks/react-query/profile/useDeleteProfile";
import { useRouter } from "next/router";
import ImageUploaderWithPreview from "../../single-file-uploader-with-preview/ImageUploaderWithPreview";
import useUpdateProfile from "../../../api-manage/hooks/react-query/profile/useUpdateProfile";
import { onSingleErrorResponse } from "../../../api-manage/api-error-response/ErrorResponses";
import { setUser } from "../../../redux/slices/profileInfo";
import { useDispatch } from "react-redux";
import ImageAddIcon from "../../single-file-uploader-with-preview/ImageAddIcon";

export const convertValuesToFormData = (values) => {
  let formData = new FormData();
  formData.append("f_name", values?.f_name);
  formData.append("l_name", values?.l_name);
  formData.append("phone", values?.phone);
  formData.append("email", values?.email);
  formData.append("image", values?.image);
  if (values?.password) {
    formData.append("password", values?.password);
  }
  return formData;
};
const BasicInformationForm = ({ data, configData, t, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const imageContainerRef = useRef();
  const { f_name, l_name, phone, email, image } = data;
  const customerImageUrl = configData?.base_urls?.customer_image_url;
  const dispatch = useDispatch();
  const profileFormik = useFormik({
    initialValues: {
      f_name: f_name ? f_name : "",
      l_name: l_name ? l_name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      image: image ? image : "",
      password: "",
      confirm_password: "",
    },
    validationSchema: ValidationSechemaProfile(),
    onSubmit: async (values, helpers) => {
      try {
        formSubmitOnSuccess(values);
      } catch (err) {}
    },
  });
  const { mutate: profileUpdateByMutate, isLoading } = useUpdateProfile();
  const formSubmitOnSuccess = (values) => {
    const onSuccessHandler = (response) => {
      if (response) {
        toast.success(response?.message);
        refetch();
      }
    };
    const formData = convertValuesToFormData(values);
    profileUpdateByMutate(formData, {
      onSuccess: onSuccessHandler,
      onError: onSingleErrorResponse,
    });
  };
  const singleFileUploadHandlerForImage = (value) => {
    profileFormik.setFieldValue("image", value.currentTarget.files[0]);
  };
  const imageOnchangeHandlerForImage = (value) => {
    profileFormik.setFieldValue("image", value);
  };
  const router = useRouter();
  const onSuccessHandlerForUserDelete = (res) => {
    if (res?.errors) {
      toast.error(res?.errors?.[0]?.message);
    } else {
      localStorage.removeItem("token");
      toast.success(t("Account has been deleted"));
      dispatch(setUser(null));
      router.push("/", undefined, { shallow: true });
    }
    setOpenModal(false);
  };
  const { mutate, isLoading: isLoadingDelete } = useDeleteProfile(
    onSuccessHandlerForUserDelete
  );
  const deleteUserHandler = () => {
    mutate();
  };
  return (
    <>
      <Grid item md={12} xs={12}>
        <ButtonBox onClick={() => setOpenModal(true)}>
          <Button
            variant="outlined"
            type="submit"
            startIcon={<PersonRemoveIcon />}
          >
            <Typography fontWeight="400" fontSize="12px">
              {t("Delete My Account")}
            </Typography>
          </Button>
        </ButtonBox>
      </Grid>
      <form noValidate onSubmit={profileFormik.handleSubmit}>
        <Grid container md={12} xs={12} spacing={2} sx={{ padding: "20px" }}>
          <Grid item md={12} xs={12} textAlign="-webkit-center">
            <Stack
              sx={{
                position: "relative",
                width: "140px",
                borderRadius: "50%",
              }}
            >
              <ImageUploaderWithPreview
                type="file"
                labelText={t("file Upload")}
                hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                file={profileFormik.values.image}
                onChange={singleFileUploadHandlerForImage}
                imageOnChange={imageOnchangeHandlerForImage}
                width="10.75rem"
                imageUrl={customerImageUrl}
                borderRadius="50%"
                objectFit
                //height='140px'
              />
              {image && (
                <ImageAddIcon
                  imageChangeHandler={singleFileUploadHandlerForImage}
                />
              )}
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              variant="outlined"
              name="f_name"
              value={profileFormik.values.f_name}
              onChange={profileFormik.handleChange}
              label={t("Fast Name")}
              required
              error={
                profileFormik.touched.f_name &&
                Boolean(profileFormik.errors.f_name)
              }
              helperText={
                profileFormik.touched.f_name && profileFormik.errors.f_name
              }
              touched={profileFormik.touched.f_name && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              // label="Enter Last Name"
              variant="outlined"
              name="l_name"
              value={profileFormik.values.l_name}
              onChange={profileFormik.handleChange}
              label={t("Last Name")}
              required
              error={
                profileFormik.touched.l_name &&
                Boolean(profileFormik.errors.l_name)
              }
              helperText={
                profileFormik.touched.l_name && profileFormik.errors.l_name
              }
              touched={profileFormik.touched.l_name && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              // label="Enter Email"
              variant="outlined"
              name="email"
              value={profileFormik.values.email}
              onChange={profileFormik.handleChange}
              label={t("Email")}
              required
              error={
                profileFormik.touched.email &&
                Boolean(profileFormik.errors.email)
              }
              helperText={
                profileFormik.touched.email && profileFormik.errors.email
              }
              touched={profileFormik.touched.email && "true"}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={
                <span>
                  {t("Phone")}{" "}
                  <span style={{ color: "red" }}>({t("Not changeable")})</span>{" "}
                </span>
              }
              variant="outlined"
              sx={{ width: "100%" }}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              value={phone}
            />
          </Grid>

          <Grid item md={12} xs={12} align="end">
            <SaveButton variant="contained" type="submit" loading={isLoading}>
              {t("Update")}
            </SaveButton>
          </Grid>
        </Grid>
      </form>
      <CustomDialogConfirm
        dialogTexts={t("Are you sure you want to delete your account?")}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={deleteUserHandler}
        isLoading={isLoadingDelete}
      />
    </>
  );
};
export default BasicInformationForm;
