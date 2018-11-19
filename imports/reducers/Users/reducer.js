import { get } from 'lodash';
import { NotificationManager } from 'react-notifications';
import { START_SUBSCRIPTION, STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import {
  USERS_SUBSCRIPTION_READY,
  USERS_SUBSCRIPTION_CHANGED,
  USERS_SAVE,
  USERS_SAVED,
  USERS_ADD,
  USERS_EDIT,
  USERS_DELETE,
  USERS_SUBSCRIPTION,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from './actions.js';

export const initialState = {
  ready: false,
  saved: false,
  rows: [],
  subscriptionActive: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case USERS_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: get(payload, 'ready'),
        receivedAt: get(payload, 'data.receivedAt'),
      };

    case USERS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        rows: payload,
      };

    case USERS_SAVE:
      return {
        ...state,
        saved: false,
      };

    case USERS_SAVED:
      NotificationManager.info('User saved');
      return {
        ...state,
        saved: true,
        id: payload.id,
      };

    case USERS_ADD:
      return {
        ...state,
      };

    case USERS_EDIT:
      return {
        ...state,
        user: payload,
      };

    case USERS_DELETE:
      return {
        ...state,
        user: payload,
      };

    case USER_LOGGED_IN:
      NotificationManager.info('User logged in');
      return {
        ...state,
      };

    case USER_LOGGED_OUT:
      NotificationManager.info('User logged out');
      return {
        ...state,
      };

    case START_SUBSCRIPTION:
      return action.payload === USERS_SUBSCRIPTION
        ? {
          ...state,
          rows: [],
          ready: false,
          saved: false,
          subscriptionActive: true,
        }
        : state;

    case STOP_SUBSCRIPTION:
      return action.payload === USERS_SUBSCRIPTION
        ? {
          ...state,
          rows: [],
          ready: false,
          saved: false,
          subscriptionActive: false,
        }
        : state;

    default:
      return state;
  }
}