import React from 'react';

import { Header } from './components/Header';
import { EntityList } from './views/EntityList';
import { Entity } from './views/Entity';


import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
          <Header />
          <Entity />
      </div>
  );
};

export default App;
