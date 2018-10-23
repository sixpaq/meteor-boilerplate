import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from '../reducers/demo/reducer';
import notifications from '../reducers/Notifications/reducer';
import users from '../reducers/Users/reducer';

export default combineReducers({
  router: routerReducer,
  demo,
  notifications,
  users,
});