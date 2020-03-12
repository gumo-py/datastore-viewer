import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Header } from './layout/Header';
import { EntityList } from './views/EntityList';
import { EntityEdit } from './views/EntityEdit';
import { NewEntityEdit } from './views/NewEntityEdit';

import './App.css';

const App: React.FC = () => {
    const [projectName, setProjectName] = React.useState<string>('');

    return (
        <div className="App">
            <Router>
                <Header setProjectName={setProjectName}/>
                <Route exact path="/" render={() => <EntityList projectName={projectName}/>} />
                <Route path="/edit/update/:kind/:urlSafeKey" render={() => <EntityEdit projectName={projectName}/>} />
                <Route path="/edit/new" component={NewEntityEdit} />
            </Router>
        </div>
    );
};

export default App;
