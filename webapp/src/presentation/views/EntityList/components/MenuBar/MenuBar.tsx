import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
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
            marginLeft: theme.spacing(3),
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
            color: '#4169e1',
        },
    }),
);

interface Props {
    refreash(): void;
}

export default function MenuBar(props: Props) {
    const classes = useStyles();

    const handleClickRefreashEntity = () => {
        props.refreash();
    };

    return (
        <div className={classes.root}>
            <div className={classes.title}>エンティティ</div>
            {/*<Button startIcon={<AddBoxIcon/>} className={classes.button}>*/}
            {/*    <Link to={'/edit/new'} style={{ textDecoration: 'none', color: '#4169e1' }}  > { "エンティティを作成" }</Link>*/}
            {/*</Button>*/}
            {/*<Button startIcon={<GetAppIcon/>} className={classes.button}>*/}
            {/*    { "インポート" }*/}
            {/*</Button>*/}
            {/*<Button startIcon={<PublishIcon/>} className={classes.button}>*/}
            {/*    { "エクスポート" }*/}
            {/*</Button>*/}
            <Button startIcon={<DeleteIcon/>} className={classes.button} disabled>
                { "削除" }
            </Button>
            <IconButton aria-label="refreash" onClick={handleClickRefreashEntity} className={classes.iconButton}>
                <RefreshIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}