import React from 'react';
import { Route, useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
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
    const [cookies, setCookie] = useCookies(['lang']);
    const [projectName, setProjectName] = React.useState(props.qs.projectName ? props.qs.projectName : '');
    const [kind, setKind] = React.useState(props.qs.kind ? props.qs.kind : '');
    const [page, setPage] = React.useState(props.qs.page ? pageValidator(Number(props.qs.page)) : 0);
    const [lang, setLang] = React.useState<string>(cookies['lang'] ? cookies['lang'] : 'en');
    const history = useHistory();

    i18n.use(initReactI18next).init({
        resources: {
            en: {
                translation: enJson,
            },
            ja: {
                translation: jaJson,
            },
        },
        lng: lang,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

    React.useEffect(() => {
        setCookie('lang', lang);
    }, [lang]);

    React.useEffect(() => {
        if(history.location.pathname === '/datastore_viewer/') {
            let queryPath = '/datastore_viewer/?';
            if (projectName) queryPath += `projectName=${projectName}`;
            if (projectName && kind) queryPath += `&kind=${kind}`;
            if (projectName && page) queryPath += `&page=${page}`;
            if (queryPath !== '/datastore_viewer/?') history.push(queryPath);
        }
    }, [kind, page]);

    React.useEffect(() => {
        if(history.location.pathname === '/datastore_viewer/') {
            setKind('');
            setPage(0);
            history.push(`/datastore_viewer/?projectName=${projectName}`);
        }
    }, [projectName]);

    return (
        <div className="App">
            <Header setProjectName={setProjectName} projectName={projectName} setLang={setLang} lang={lang}/>
            <Route exact path="/datastore_viewer" render={() => <EntityList setKind={setKind} kind={kind} setPage={setPage} page={page} projectName={projectName} lang={lang}/>} />
            <Route path="/datastore_viewer/edit/update/:projectName/:kind/:urlSafeKey" render={() => <EntityEdit lang={lang}/>} />
            <Route path="/datastore_viewer/edit/new" render={() => <NewEntityEdit lang={lang}/>} />
        </div>
    );
};

export default App;
