import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Header } from './components/Header';
import { EntityList } from './views/EntityList';
import { EntityEdit } from './views/EntityEdit';
import { NewEntityEdit } from './views/NewEntityEdit';

import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
          <Router>
            <Header />
            <Route exact path="/" component={EntityList} />
            <Route path="/edit/update/:kind/:entity_id" component={EntityEdit} />
            <Route path="/edit/new" component={NewEntityEdit} />
          </Router>
      </div>
  );
};

export default App;
