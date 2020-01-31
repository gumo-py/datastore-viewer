import React from 'react';
import { MenuBar } from "./components/MenuBar";
import { EntityInfo } from "./components/EntityInfo";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        saveMenu: {
            marginLeft: theme.spacing(2),
            textAlign: 'left',
        },
        button: {
            marginRight: theme.spacing(2),
        }
    }),
);

export default function Entity() {
    const classes = useStyles();
    return (
        <div className={'Entity'}>
            <MenuBar />
            <EntityInfo />
            <PropertyMenu />
            <div className={classes.saveMenu}>
                <Button className={classes.button} variant="contained" color="primary">
                    {"保存"}
                </Button>
                <Button className={classes.button} color="primary">
                    {"キャンセル"}
                </Button>
            </div>
        </div>
    )
}