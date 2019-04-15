import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../store/configureStore';

import Menu from './Menu';
import MovieGrid from './MovieGrid';
import SingleMovie from './SingleMovie';

const store = configureStore();

const App = (
  <Provider store={store}>
    <Router>
      <div>
        <Menu />
        <Route exact path="/:page" component={MovieGrid} />
        <Route path="/movie/:id" component={SingleMovie} />
        <Route exact path="/" render={() => (<Redirect to="/1" />)} />
      </div>
    </Router>
  </Provider>
);

export default App;
