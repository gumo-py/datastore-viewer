import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Header } from './components/Header';
import { EntityList } from './views/EntityList';
import { Entity } from './views/Entity';


import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
          <Router>
            <Header />
            <Route exact path="/" component={EntityList} />
            <Route path="/entity" component={Entity} />
          </Router>
      </div>
  );
};

export default App;
