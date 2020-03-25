import React from 'react';
import { Route, useHistory } from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Header } from './layout/Header';
import { EntityList } from './views/EntityList';
import { EntityEdit } from './views/EntityEdit';
import { NewEntityEdit } from './views/NewEntityEdit';

import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import './App.css';
import {ParsedQuery} from "query-string";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    ja: {
      translation: jaJson,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

interface Props {
    qs: ParsedQuery;
}

const pageValidator = function(page: number): number {
    if(!Number.isInteger(page) || page < 0) {
        return 0;
    }else {
        return page;
    }
};

const App = (props: Props) => {
    const [projectName, setProjectName] = React.useState(props.qs.projectName ? props.qs.projectName : '');
    const [kind, setKind] = React.useState(props.qs.kind ? props.qs.kind : '');
    const [page, setPage] = React.useState(props.qs.page ? pageValidator(Number(props.qs.page)) : 0);
    const [lang, setLang] = React.useState<string>('en');
    let history = useHistory();

    React.useEffect(() => {
        let queryPath = '/datastore_viewer/?';
        if(projectName) queryPath += `projectName=${projectName}`;
        if(projectName && kind) queryPath += `&kind=${kind}`;
        if(projectName && page) queryPath += `&page=${page}`;
        if(queryPath !== '/datastore_viewer/?') history.push(queryPath);
    }, [projectName, kind, page]);

    return (
        <div className="App">
            <Header setProjectName={setProjectName} projectName={projectName} setLang={setLang}/>
            <Route exact path="/datastore_viewer" render={() => <EntityList setKind={setKind} kind={kind} setPage={setPage} page={page} projectName={projectName} lang={lang}/>} />
            <Route path="/datastore_viewer/edit/update/:kind/:urlSafeKey" render={() => <EntityEdit projectName={projectName} lang={lang}/>} />
            <Route path="/datastore_viewer/edit/new" render={() => <NewEntityEdit lang={lang}/>} />
        </div>
    );
};

export default App;
