// import React from 'react';
// import ReactDOM from 'react-dom';
//     import App from './components/App';
//     import AdminApp from './components/AdminApp';
//     import * as serviceWorker from './serviceWorker';
//     import { Route, BrowserRouter as Router } from 'react-router-dom'

// // import 'semantic-ui-css/semantic.min.css'


//   ReactDOM.render(routing, document.getElementById('root'))

import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import Menu from './components/Menu';

const routing = (
    <Router>
      <div>
        <Menu />
        <Route exact path="/" component={App} />

      </div>
    </Router>
  )

ReactDOM.render(routing, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();