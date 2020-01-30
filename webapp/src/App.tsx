import React from 'react';

import { Header } from './components/Header';
import { EntityList } from './views/EntityList';

import './App.css';

const App: React.FC = () => {
  return (
      <div className="App">
          <Header />
          <EntityList />
      </div>
  );
};

export default App;
