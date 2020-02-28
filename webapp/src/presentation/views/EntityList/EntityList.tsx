import React from 'react';
import { MenuBar } from './components/MenuBar';
import { EntityListHeader } from './components/EntityListHeader';
import { EntityListBody } from './components/EntityListBody';
import { getEntityList, getKindList } from "../../../infrastructure/APIClient";

interface Props {
    projectName: string;
}


export default function EntityList(props: Props) {
    const [kinds, setKinds] = React.useState< KindResults | undefined >();
    const [kindObj, setKindObj] = React.useState<KindResult>();
    const [entities, setEntities] = React.useState< Array<EntityObject> >([]);

    if(!kinds && props.projectName){
        getKindList(props.projectName)
            .then( res => setKinds(res) );
    }

    const updateEntities = React.useCallback(() => {
        if(kindObj){
            getEntityList(props.projectName, kindObj.kind)
                .then( res => setEntities(res) );
        }
    }, [kindObj, props.projectName]);

    React.useEffect(() => {
        updateEntities();
    },[kindObj, updateEntities]);

    return (
        <div className={'EntityList'}>
            <MenuBar refreash={updateEntities}/>
            <EntityListHeader kinds={kinds} kindHandler={setKindObj}/>
            <EntityListBody kindObj={kindObj} entities={entities}/>
        </div>
    )
}