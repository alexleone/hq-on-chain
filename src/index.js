import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import MainStart from './MainStart';
import CreateGameContainer from './CreateGameContainer';
import ManageGameContainer from './ManageGameContainer';
import PlayGame from './PlayGame';
import HomeContainer from './layouts/home/HomeContainer'
import Test from './Test';
import { LoadingContainer } from 'drizzle-react-components'

import store from './store'
import drizzleOptions from './drizzleOptions'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={MainStart} />
            <Route path="/create" component={CreateGameContainer} />
            <Route path="/manage" component={ManageGameContainer} />
            <Route path="/play" component={PlayGame} />
            <Route path="/home" component={HomeContainer} />
            <Route path="/test" component={Test} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
