import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import configureStore from '../store/configureStore';

import Menu from './Menu';
import MoviePage from './MoviePage';
import SingleMovie from './SingleMovie';

const store = configureStore();

const App = (
  <Provider store={store}>
    <Router>
      <Segment inverted style={{ minHeight: '100%' }}>
        <Menu />
        <Route exact path="/:page" component={MoviePage} />
        <Route path="/movie/:id" component={SingleMovie} />
        <Route exact path="/" render={() => (<Redirect to="/1" />)} />
      </Segment>
    </Router>
  </Provider>
);

export default App;
