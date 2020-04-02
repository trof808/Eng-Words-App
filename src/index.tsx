import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStore, { defaultValue } from './context/global-context';

import Routes from './routes';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <GlobalStore.Provider value={defaultValue}>
    <Router>
      <Routes />
    </Router>
  </GlobalStore.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
