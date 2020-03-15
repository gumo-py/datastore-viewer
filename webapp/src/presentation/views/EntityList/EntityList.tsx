import React from 'react';
import { MenuBar } from './components/MenuBar';
import { EntityListHeader } from './components/EntityListHeader';
import { EntityListBody } from './components/EntityListBody';
import { getEntityList, getKindList } from "../../../infrastructure/APIClient";
import { EntityCollection } from '../../../domain/Entity';

interface Props {
    projectName: string;
}


export default function EntityList(props: Props) {
    const [kinds, setKinds] = React.useState< KindResults | undefined >();
    const [kindObj, setKindObj] = React.useState<KindResult>();
    const [entityCollection, setEntities] = React.useState< EntityCollection >();

    const onChangePageHandler = (pageNumber: number, rowsPerPage: number) => {
        if (kindObj) {
            getEntityList(props.projectName, kindObj.kind, pageNumber, rowsPerPage)
                .then( entityCollection => setEntities(entityCollection) );
        }
    };

    if(!kinds?.kindResults.length && props.projectName){
        getKindList(props.projectName)
            .then( res => setKinds(res) );
    }

    const updateEntities = React.useCallback(() => {
        if(kindObj){
            getEntityList(props.projectName, kindObj.kind)
                .then( entityCollection => setEntities(entityCollection) );
        }
    }, [kindObj, props.projectName]);

    React.useEffect(() => {
        updateEntities();
    },[kindObj, updateEntities]);

    React.useEffect(() => {
        console.log(entityCollection);
    },[entityCollection]);

    return (
        <div className={'EntityList'}>
            <MenuBar refreash={updateEntities}/>
            <EntityListHeader kinds={kinds} kindHandler={setKindObj}/>
            <EntityListBody kindObj={kindObj} entityCollection={entityCollection} onChangePageHandler={onChangePageHandler}/>
        </div>
    )
}
