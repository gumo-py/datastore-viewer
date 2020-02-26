import React from 'react';
import { MenuBar } from './components/MenuBar';
import { EntityListHeader } from './components/EntityListHeader';
import { EntityListBody } from './components/EntityListBody';
import { getEntityList, getKindList } from "../../../infrastructure/APIClient";


export default function EntityList() {
    const [kinds, setKinds] = React.useState< KindResults | undefined >();
    const [kindObj, setKindObj] = React.useState<KindResult>();
    const [entities, setEntities] = React.useState< Array<EntityObject> >([]);

    if(!kinds){
        getKindList('gumo-example')
            .then( res => setKinds(res) );
    }

    React.useEffect(() => {
        if(kindObj){
            getEntityList('gumo-example', kindObj.kind)
                .then( res => setEntities(res) );
        }
    },[kindObj]);

    return (
        <div className={'EntityList'}>
            <MenuBar/>
            <EntityListHeader kinds={kinds} kindHandler={setKindObj}/>
            <EntityListBody kindObj={kindObj} entities={entities}/>
        </div>
    )
}