import React from 'react';
import { Provider } from 'react-redux';
import {
  Route, Redirect, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import configureStore from '../store/configureStore';

import Menu from './Menu';
import MoviePage from './MoviePage';
import SingleMovie from './SingleMovie';
import SearchPage from './SearchPage';
import Login from './Login';
import Register from './Signup';

const store = configureStore();

const App = (
  <Provider store={store}>
    <Router>
      <Segment inverted style={{ minHeight: '100%' }}>
        <Menu />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search/:page" component={SearchPage} />
          <Route exact path="/search" render={() => (<Redirect to="search/1" />)} />
          <Route exact path="/:page" component={MoviePage} />
          <Route exact path="/movie/:id" component={SingleMovie} />
          <Route exact path="/" render={() => (<Redirect to="/1" />)} />
        </Switch>
      </Segment>
    </Router>
  </Provider>
);

export default App;
