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

const App = (props: Props) => {
    const [projectName, setProjectName] = React.useState(props.qs.projectName);
    const [lang, setLang] = React.useState<string>('en');
    let history = useHistory();

    React.useEffect(() => {
        console.log(projectName);
        if(projectName) history.push(`/?projectName=${projectName}`);
    }, [projectName]);

    return (
        <div className="App">
            <Header setProjectName={setProjectName} projectName={projectName} setLang={setLang}/>
            <Route exact path="/" render={() => <EntityList kind={props.qs.kind} projectName={projectName} lang={lang}/>} />
            <Route path="/edit/update/:kind/:urlSafeKey" render={() => <EntityEdit projectName={projectName} lang={lang}/>} />
            <Route path="/edit/new" render={() => <NewEntityEdit lang={lang}/>} />
        </div>
    );
};

export default App;
