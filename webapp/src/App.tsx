import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ParsedQuery } from 'query-string';
import { Header } from './components/Header';
import { EntityList } from './pages/EntityList';
import { EntityEdit } from './pages/EntityEdit';
import { NewEntityEdit } from './pages/NewEntityEdit';

import enJson from './locales/en.json';
import jaJson from './locales/ja.json';
import './App.css';

interface Props {
  qs: ParsedQuery;
}

const pageValidator = (page: number): number => {
  if (!Number.isInteger(page) || page < 0) {
    return 0;
  }
  return page;
};

export const App: React.FunctionComponent<Props> = ({ qs }) => {
  const [cookies, setCookie] = useCookies(['lang']);
  const [projectNameStatus, setProjectNameStatus] = React.useState(
    qs.projectName ? qs.projectName : '',
  );
  const [kindStatus, setKindStatus] = React.useState(qs.kind ? qs.kind : '');
  const [pageStatus, setPageStatus] = React.useState(
    qs.page ? pageValidator(Number(qs.page)) : 0,
  );
  const [langStatus, setLangStatus] = React.useState<string>(
    cookies.lang ? cookies.lang : 'en',
  );
  const beforeProjectName = React.useRef(qs.projectName ? qs.projectName : '');
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
    lng: langStatus,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  React.useEffect(() => {
    setCookie('lang', langStatus);
  }, [langStatus]);

  React.useEffect(() => {
    setProjectNameStatus(qs.projectName ? qs.projectName : '');
    setKindStatus(qs.kind ? qs.kind : '');
    setPageStatus(qs.page ? pageValidator(Number(qs.page)) : 0);
  }, [qs.kind, qs.page, qs.projectName]);

  React.useEffect(() => {
    if (history.location.pathname === '/datastore_viewer/') {
      if (projectNameStatus === beforeProjectName.current) {
        let queryPath = `/datastore_viewer/?projectName=${projectNameStatus}`;
        if (kindStatus) queryPath += `&kind=${kindStatus}`;
        if (pageStatus) queryPath += `&page=${pageStatus}`;
        if (queryPath !== `/datastore_viewer/?projectName=${projectNameStatus}`)
          history.push(queryPath);
      } else {
        beforeProjectName.current = projectNameStatus;
        setKindStatus('');
        setPageStatus(0);
        history.push(`/datastore_viewer/?projectName=${projectNameStatus}`);
        window.location.reload();
      }
    }
  }, [kindStatus, pageStatus, projectNameStatus]);

  return (
    <div className="App">
      <Header
        setProjectName={setProjectNameStatus}
        projectName={projectNameStatus}
        setLang={setLangStatus}
        lang={langStatus}
      />
      <div className="Content">
        <Route
          exact
          path="/datastore_viewer/"
          render={() => (
            <EntityList
              setKind={setKindStatus}
              kind={kindStatus}
              setCurrentPage={setPageStatus}
              currentPage={pageStatus}
              projectName={projectNameStatus}
              lang={langStatus}
            />
          )}
        />
        <Route
          path="/datastore_viewer/edit/update/:projectName/:kind/:urlSafeKey"
          render={() => <EntityEdit lang={langStatus} />}
        />
        <Route
          path="/datastore_viewer/edit/new"
          render={() => <NewEntityEdit lang={langStatus} />}
        />
      </div>
    </div>
  );
};
