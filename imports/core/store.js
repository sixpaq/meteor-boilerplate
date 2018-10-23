import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createTracker } from 'redux-segment';
import { routerMiddleware } from 'react-router-redux';

import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';

import rootReducer from './reducer';
import history from './history';

const {
  sources,
  subscriptions,
} = createReactiveMiddlewares(Tracker);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({
  collapsed: true,
});
const tracker = createTracker();
const router = routerMiddleware(history);

const middleware = [
  router,
  sources,
  subscriptions,
  thunk,
  logger,
  tracker,
];

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

export default store;