import React, {useEffect, useState} from 'react';
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {Typography} from "@mui/material";
import ImageUploaderWithPreview from "../../single-file-uploader-with-preview/ImageUploaderWithPreview";
import ImageAddIcon from "../../single-file-uploader-with-preview/ImageAddIcon";
import {Stack} from "@mui/system";
import addImage from './assets/add-image.png'

const SinglePrescriptionUpload = props => {
    const {t, handleImageUpload} = props
    const [image, setImage] = useState(addImage.src)
    useEffect(() => {
        typeof image !== 'string' && handleImageUpload?.(image)
    }, [image])

    const singleFileUploadHandlerForImage = (value) => {
        setImage(value.currentTarget.files[0]);
    };
    const imageOnchangeHandlerForImage = (value) => {
        setImage(value);
    };
    return (
        <CustomStackFullWidth alignItems='center' justifyContent='center' spacing={3}>
            <Typography variant="h6">{t("Prescription")} <span
                style={{color: 'red', fontSize: '14px'}}>({t('Max size 2MB')})</span> </Typography>
            <Stack alignItems='center' justifyContent='center' sx={{position: 'relative'}}>
                <ImageUploaderWithPreview
                    type="file"
                    labelText={t("file Upload")}
                    hintText="Image format - jpg, png, jpeg, gif Image Size - maximum size 2 MB Image Ratio - 1:1"
                    file={image}
                    onChange={singleFileUploadHandlerForImage}
                    imageOnChange={imageOnchangeHandlerForImage}
                    width="10rem"
                    borderRadius="50%"
                    height='140px'
                />
                {typeof image !== 'string' && (
                    <ImageAddIcon imageChangeHandler={singleFileUploadHandlerForImage}/>
                )}
            </Stack>
        </CustomStackFullWidth>
    );
};

SinglePrescriptionUpload.propTypes = {};

export default SinglePrescriptionUpload;