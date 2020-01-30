import React from 'react';
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

export default function MenuBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button startIcon={<AddBoxIcon/>} className={classes.button}>
                { "エンティティを作成" }
            </Button>
            <Button startIcon={<GetAppIcon/>} className={classes.button}>
                { "インポート" }
            </Button>
            <Button startIcon={<PublishIcon/>} className={classes.button}>
                { "エクスポート" }
            </Button>
            <Button startIcon={<DeleteIcon/>} className={classes.button} disabled>
                { "削除" }
            </Button>
            <IconButton aria-label="delete" className={classes.iconButton}>
                <RefreshIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}