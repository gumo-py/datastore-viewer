import React from 'react';
import { MenuBar } from './components/MenuBar';
import { EntityListHeader } from './components/EntityListHeader';
import { EntityListBody } from './components/EntityListBody';


export default function EntityList() {
    return (
        <div className={'EntityList'}>
            <MenuBar/>
            <EntityListHeader/>
            <EntityListBody/>
        </div>
    )
}