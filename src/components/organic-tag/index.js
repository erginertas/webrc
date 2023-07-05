import React from 'react';
import {CustomBadgeWrapepr} from "../cards/CustomBadge";
import {useTranslation} from "react-i18next";

const OrganicTag = props => {
    const {status, top, left} = props
    const {t} = useTranslation()
    return (
        <>
            {status === 1 ? <CustomBadgeWrapepr bg_color='primary' top={top} left={left}
                                                border_radius='0px 4px 4px 0px'>{t('Organic')}</CustomBadgeWrapepr> : null}
        </>
    );
};

OrganicTag.propTypes = {};

export default OrganicTag;