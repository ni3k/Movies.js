import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';

import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Menu from './components/Menu';

const store = configureStore();

const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Menu />
        <Route exact path="/" component={App} />

      </div>
    </Router>
    </Provider>
);

ReactDOM.render(routing, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
