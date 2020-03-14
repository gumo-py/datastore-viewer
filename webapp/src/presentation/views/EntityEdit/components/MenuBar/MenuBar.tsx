import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
            textAlign: 'left',
            display: 'flex',
        },
        title: {
            marginTop: theme.spacing(1.5),
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(2),
            fontSize: 20,
        },
        button: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(2),
            textTransform: 'none',
            fontSize: 13,
            color: '#4169e1',
        },
        iconButton: {
            marginLeft: theme.spacing(1),
            color: '#4169e1',
        },
    }),
);

interface Props {
    refreash(): void;
    lang: string;
}

export default function MenuBar(props: Props) {
    const classes = useStyles();
    const [t, i18n] = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(props.lang);
        }, [props.lang, i18n]);

    const handleClickRefreashEntity = () => {
        props.refreash();
    };

    return (
        <div className={classes.root}>
            <Link to={'/'}>
                <IconButton aria-label="back" className={classes.iconButton}>
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
            </Link>
            <div className={classes.title}>{t('EntityEdit.MenuBar.title')}</div>
            <Button startIcon={<RefreshIcon/>} onClick={handleClickRefreashEntity} className={classes.button}>
                {t('EntityEdit.MenuBar.refresh')}
            </Button>
            {/*<Button startIcon={<DeleteIcon/>} className={classes.button}>*/}
            {/*    {t('EntityEdit.MenuBar.delete')}*/}
            {/*</Button>*/}
        </div>
    )
}