import React from 'react';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
        iconButton: {
            marginLeft: theme.spacing(1),
            color: '#4169e1',
        },
    }),
);

export default function MenuBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Link to={'/'}>
                <IconButton aria-label="back" className={classes.iconButton}>
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
            </Link>
            <div className={classes.title}>エンティティの作成</div>
        </div>
    )
}