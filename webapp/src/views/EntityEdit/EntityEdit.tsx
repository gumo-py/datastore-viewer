import React from 'react';
import { useParams } from "react-router-dom";
import { MenuBar } from "./components/MenuBar";
import { EntityInfo } from "./components/EntityInfo";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const testEntity = {
    namespace: '[デフォルト]',
    kind: 'Project',
    entityKey: 'Project name:3exmxvfn2nbktklxerll7agmme',
    keyLiteral: 'Key(Project, \'3exmxvfn2nbktklxerll7agmme\')',
    URLSafeKey: 'ahNufnRvZG8td2l0aG91dC1ndW1vcicLEgdQcm9qZWN0IhozZXhteHZmbjJuYmt0a2x4ZXJsbDdhZ21tZQw\n',
    property: [
        {
            name: 'name',
            type: 'String',
            value: "testProject2"
        },
        {
            name: 'created_at',
            type: 'Date',
            value: "2020-02-06T19:30"
        }]
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

export default function EntityEdit() {
    let { entity_id } = useParams();
    console.log(entity_id);
    const classes = useStyles();
    return (
        <div className={'Entity'}>
            <MenuBar />
            <EntityInfo
                namespace={testEntity.namespace}
                kind={testEntity.kind}
                entityKey={testEntity.entityKey}
                keyLiteral={testEntity.keyLiteral}
                URLSafeKey={testEntity.URLSafeKey}
            />
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