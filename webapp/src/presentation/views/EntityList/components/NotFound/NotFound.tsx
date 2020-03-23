import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    lang: string;
}

export default function NotFound(props: Props) {
    const [t, i18n] = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(props.lang);
    }, [props.lang, i18n]);

    return (
        <div className={'NotFound'}>
            {t('EntityList.NotFound.message')}
        </div>
    )
}