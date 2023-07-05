import React, {useState} from "react";
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import {Typography, useTheme} from "@mui/material";
import {Stack} from "@mui/system";
import CustomImageContainer from "../../CustomImageContainer";
import CustomRatings from "../../search/CustomRatings";
import {useSelector} from "react-redux";
import CustomModal from "../../modal";
import {Scrollbar} from "../../srollbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ProductReviewCard = ({review}) => {
    const {configData} = useSelector((state) => state.configData);
    const [openModal, setOpenModal] = useState(false)
    const theme = useTheme();
    const userImageUrl = configData?.base_urls?.customer_image_url;
    return (
        <>
            <CustomStackFullWidth onClick={() => setOpenModal(true)} backgroundColor={theme.palette.neutral[300]}
                                  padding="20px"
                                  spacing={1.5}
                                  sx={{borderRadius: ".9rem", width: '330px', height: '200px', cursor: 'pointer'}}>
                <Typography
                    fontWeight="400"
                    variant="subtitle2"
                    color={theme.palette.neutral[1000]}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {review?.comment}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Stack width="40px" height="40px">
                        <CustomImageContainer
                            src={`${userImageUrl}/${review?.customer?.image}`}
                            width="100%"
                            height="100%"
                            borderRadius="50%"
                            objectFit="contain"
                        />
                    </Stack>
                    <Stack>
                        <Typography fontWeight="500"
                                    color={theme.palette.neutral[1000]}>{`${review?.customer?.f_name}` + ' ' + `${review?.customer?.l_name}`}</Typography>
                        <CustomRatings readOnly="false" ratingValue={review?.rating}/>
                    </Stack>
                </Stack>
            </CustomStackFullWidth>
            <CustomModal
                openModal={openModal} handleClose={() => setOpenModal(false)}
            >
                <CustomStackFullWidth backgroundColor={theme.palette.neutral[300]}
                                      padding="20px"
                                      spacing={1.5}
                                      sx={{
                                          borderRadius: ".9rem",
                                          width: {xs: '300px', sm: '550px'},
                                          cursor: 'pointer',
                                          position: 'relative'
                                      }}>
                    <IconButton onClick={() => setOpenModal(false)}
                                sx={{position: 'absolute', top: 0, right: 3, width: '45px', borderRadius: '50%'}}>
                        <CloseIcon/>
                    </IconButton>
                    <Scrollbar style={{maxHeight: '200px'}}>
                        <Typography
                            fontWeight="400"
                            variant="subtitle2"
                            color={theme.palette.neutral[1000]}
                        >
                            {review?.comment}
                        </Typography>
                    </Scrollbar>

                    <Stack direction="row" spacing={2}>
                        <Stack width="40px" height="40px">
                            <CustomImageContainer
                                src={`${userImageUrl}/${review?.customer?.image}`}
                                width="100%"
                                height="100%"
                                borderRadius="50%"
                                objectFit="contain"
                            />
                        </Stack>
                        <Stack mb='10px'>
                            <Typography fontWeight="500"
                                        color={theme.palette.neutral[1000]}>{`${review?.customer?.f_name}` + ' ' + `${review?.customer?.l_name}`}</Typography>
                            <CustomRatings readOnly="false" ratingValue={review?.rating}/>
                        </Stack>
                    </Stack>
                </CustomStackFullWidth>
            </CustomModal>
        </>
    );
};

export default ProductReviewCard;
