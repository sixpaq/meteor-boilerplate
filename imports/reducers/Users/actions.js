import { Meteor } from 'meteor/meteor';

export const USERS_SUBSCRIPTION = 'users';
export const USERS_SUBSCRIPTION_READY = 'USERS_SUBSCRIPTION_READY';
export const USERS_SUBSCRIPTION_CHANGED = 'USERS_SUBSCRIPTION_CHANGED';
export const USERS_ADD = 'USERS_ADD';
export const USERS_EDIT = 'USERS_EDIT';
export const USERS_DELETE = 'USERS_DELETE';
export const USERS_DELETED = 'USERS_DELETED';
export const USERS_SAVE = 'USERS_SAVE';
export const USERS_SAVED = 'USERS_SAVED';
export const USERS_SAVE_FAILED = 'USERS_SAVE_FAILED';

export const addUser = user => (dispatch) => {
  dispatch({
    type: USERS_SAVE,
    payload: user,
  });
  Meteor.call('user.add', user, (error, result) => {
    if (error) {
      console.error('add_user failed', error);
      dispatch({
        type: USERS_SAVE_FAILED,
        error,
      });
    } else {
      dispatch({
        type: USERS_SAVED,
        payload: result,
      });
    }
  });
};

export const updateUser = user => (dispatch) => {
  dispatch({
    type: USERS_SAVE,
    payload: user,
  });
  Meteor.call('user.update', user, (error, result) => {
    if (error) {
      console.error('update user failed', error);
      dispatch({
        type: USERS_SAVE_FAILED,
        error,
      });
    } else {
      dispatch({
        type: USERS_SAVED,
        payload: result,
      });
    }
  });
};