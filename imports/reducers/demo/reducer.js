import { get } from 'lodash';
import { START_SUBSCRIPTION, STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import {
  DEMO_SUBSCRIPTION_READY,
  DEMO_SUBSCRIPTION_CHANGED,
  DEMO_SUBSCRIPTION,
} from './actions.js';

export const initialState = {
  ready: false,
  rows: [],
  subscriptionActive: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case DEMO_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: get(payload, 'ready'),
        receivedAt: get(payload, 'data.receivedAt'),
      };

    case DEMO_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        rows: payload,
      };

    case START_SUBSCRIPTION:
      return action.payload === DEMO_SUBSCRIPTION
        ? {
          ...state,
          rows: [],
          ready: false,
          subscriptionActive: true,
        }
        : state;

    case STOP_SUBSCRIPTION:
      return action.payload === DEMO_SUBSCRIPTION
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