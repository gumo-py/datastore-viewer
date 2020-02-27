import React from 'react';
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";
import { MenuBar } from "./components/MenuBar";
import { EntityInfo } from "./components/EntityInfo";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import { getEntity } from "../../../infrastructure/APIClient";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        saveMenu: {
            marginLeft: theme.spacing(2),
            textAlign: 'left',
        },
        button: {
            marginRight: theme.spacing(2),
        },
        link: {
            color: '#4169e1',
            textDecoration: 'none'
        },
    }),
);

export default function EntityEdit() {
    let { kind, entity_id } = useParams();
    const [entity, setEntity] = React.useState<EntityObject>();

    const updateEntity = () => {
        if(kind && entity_id) {
            getEntity('gumo-example', kind, entity_id)
                .then(res => setEntity(res));
        }
    };

    if(!entity) {
        updateEntity();
    }

    const classes = useStyles();
    return (
        <div className={'Entity'}>
            <MenuBar refreash={updateEntity} />
            { entity && <EntityInfo
                kind={entity.key.getKind()}
                entityKey={entity.key.toString()}
                keyLiteral={entity.key.toLiteral()}
                URLSafeKey={entity.URLSafeKey}
                />
            }
            { entity && <PropertyMenu properties={entity.properties}/> }
            <div className={classes.saveMenu}>
                <Button className={classes.button} variant="contained" color="primary">
                    {"保存"}
                </Button>
                <Button className={classes.button} color="primary">
                    <NavLink className={classes.link} to={'/'}>{"キャンセル"}</NavLink>
                </Button>

            </div>
        </div>
    )
}