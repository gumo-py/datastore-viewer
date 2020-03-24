import React from 'react';
import { MenuBar } from './components/MenuBar';
import { EntityListHeader } from './components/EntityListHeader';
import { EntityListBody } from './components/EntityListBody';
import { NotFound } from './components/NotFound';
import { getEntityList, getKindList } from "../../../infrastructure/APIClient";
import { EntityCollection } from '../../../domain/Entity';

interface Props {
    setKind(kind: string): void;
    setPage(page: number): void;
    kind: any;
    projectName: any;
    lang: string;
    page: any;
}


export default function EntityList(props: Props) {
    const [kinds, setKinds] = React.useState< KindResults | undefined >();
    const [kindObj, setKindObj] = React.useState<KindResult>();
    const [page, setPage] = React.useState(props.page);
    const rowsPerPage = 25;
    const [entityCollection, setEntities] = React.useState< EntityCollection >();

    if(!kinds?.kindResults.length && props.projectName){
        getKindList(props.projectName)
            .then( res => setKinds(res) );
    }

    const updateEntities = React.useCallback(() => {
        if(kindObj){
            getEntityList(props.projectName, kindObj.kind, page, rowsPerPage)
                .then( entityCollection => {
                    const maxPage = entityCollection.totalCount / rowsPerPage - 1;
                    if(maxPage < page) setPage(maxPage);
                    console.log('updateEntities', entityCollection);
                    setEntities(entityCollection);
                });
        }
        props.setPage(page);
    }, [kindObj, props.projectName, page]);

    React.useEffect(() => {
        updateEntities();
    },[kindObj, updateEntities]);

    React.useEffect(() => {
        console.log('effect watch', entityCollection);
    },[entityCollection]);

    return (
        <div className={'EntityList'}>
            <MenuBar refreash={updateEntities} lang={props.lang}/>
            <EntityListHeader
                kinds={kinds}
                kind={props.kind}
                setKind={props.setKind}
                kindHandler={setKindObj}
                projectName={props.projectName}
                lang={props.lang}/>

            {
                entityCollection?.entities.length ?
                    <EntityListBody
                        kindObj={kindObj}
                        entityCollection={entityCollection}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        setPage={setPage}
                        lang={props.lang}
                    /> :
                    <NotFound
                        lang={props.lang}
                    />
            }

        </div>
    )
}
