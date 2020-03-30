import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import queryString from 'query-string';
import './index.css';
import App from './presentation/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
      <Route render={ (props) =>
        <App qs={queryString.parse(props.location.search)}/>
      }/>
    </Router>, document.getElementById('root'));

serviceWorker.unregister();
