import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Header } from './layout/Header';
import { EntityList } from './views/EntityList';
import { EntityEdit } from './views/EntityEdit';
import { NewEntityEdit } from './views/NewEntityEdit';

import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import './App.css';

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


const App: React.FC = () => {
    const [projectName, setProjectName] = React.useState<string>('');
    const [lang, setLang] = React.useState<string>('en');

    return (
        <div className="App">
            <Router>
                <Header setProjectName={setProjectName} setLang={setLang}/>
                <Route exact path="/" render={() => <EntityList projectName={projectName} lang={lang}/>} />
                <Route path="/edit/update/:kind/:urlSafeKey" render={() => <EntityEdit projectName={projectName} lang={lang}/>} />
                <Route path="/edit/new" component={NewEntityEdit} />
            </Router>
        </div>
    );
};

export default App;
