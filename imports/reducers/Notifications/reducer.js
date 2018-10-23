import { get } from 'lodash';
import { START_SUBSCRIPTION, STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import {
  NOTIFICATIONS_SUBSCRIPTION_READY,
  NOTIFICATIONS_SUBSCRIPTION_CHANGED,
  NOTIFICATIONS_SUBSCRIPTION,
} from './actions.js';

export const initialState = {
  ready: false,
  rows: [],
  subscriptionActive: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case NOTIFICATIONS_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: get(payload, 'ready'),
        receivedAt: get(payload, 'data.receivedAt'),
      };

    case NOTIFICATIONS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        rows: payload,
      };

    case START_SUBSCRIPTION:
      return action.payload === NOTIFICATIONS_SUBSCRIPTION
        ? {
          ...state,
          rows: [],
          ready: false,
          subscriptionActive: true,
        }
        : state;

    case STOP_SUBSCRIPTION:
      return action.payload === NOTIFICATIONS_SUBSCRIPTION
        ? {
          ...state,
          rows: [],
          ready: false,
          subscriptionActive: false,
        }
        : state;

    default:
      return state;
  }
}