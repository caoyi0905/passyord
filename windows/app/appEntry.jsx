'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import LoginApp from './containers/login.jsx';
import ViewApp from './containers/view.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)


import {connect} from 'camo';
connect('nedb://passyord').then(function(){
  console.log('connected');
});


ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LoginApp}/>
      <Route path="/view" component={ViewApp}/>
    </Router>
  </Provider>
), document.getElementById('app'));