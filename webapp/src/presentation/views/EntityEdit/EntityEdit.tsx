import React from 'react';
import { useParams } from "react-router-dom";
import { MenuBar } from "./components/MenuBar";
import { EntityInfo } from "./components/EntityInfo";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { getEntity } from "../../../infrastructure/APIClient";

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
    let { kind, entity_id } = useParams();
    const [entity, setEntity] = React.useState<EntityObject>();
    if(!entity && kind && entity_id) {
        getEntity('gumo-example', kind, entity_id)
            .then(res => setEntity(res));
    }

    React.useEffect(() => {
        console.log(entity);
    }, [entity]);

    const classes = useStyles();
    return (
        <div className={'Entity'}>
            <MenuBar />
            { entity && <EntityInfo
                kind={entity.key.getKind()}
                entityKey={entity.key.toString()}
                keyLiteral={entity.key.toLiteral()}
                />
            }
            { entity && <PropertyMenu properties={entity.properties}/> }
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