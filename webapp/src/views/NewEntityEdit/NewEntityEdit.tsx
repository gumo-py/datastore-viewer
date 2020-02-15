import React from 'react';
import { MenuBar } from "./components/MenuBar";
import { EntityInfoEdit } from "./components/EntityInfoEdit";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const testEntity = {
    namespace: '[デフォルト]',
    kind: 'Project',
    entityKey: 'Project name:3exmxvfn2nbktklxerll7agmme',
    keyLiteral: 'Key(Project, \'3exmxvfn2nbktklxerll7agmme\')',
    URLSafeKey: 'ahNufnRvZG8td2l0aG91dC1ndW1vcicLEgdQcm9qZWN0IhozZXhteHZmbjJuYmt0a2x4ZXJsbDdhZ21tZQw\n',
    property: []
};

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

export default function NewEntityEdit() {
    const classes = useStyles();
    return (
        <div className={'Entity'}>
            <MenuBar />
            <EntityInfoEdit kinds={['Project', 'Task']}/>
            <PropertyMenu properties={testEntity.property}/>
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