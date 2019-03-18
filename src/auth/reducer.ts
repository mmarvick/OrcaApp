import { handleActions } from 'redux-actions';

import ActionTypes from './actionTypes';
import AuthStatus from './models/authStatus';

export interface AuthState {
  status: AuthStatus;
}

export default handleActions<AuthState, {}>(
  {
    [ActionTypes.SET_AUTHORIZED]: (state: AuthState): AuthState => {
      return {
        ...state,
        status: AuthStatus.AUTHED
      };
    },

    [ActionTypes.SET_UNAUTHORIZED]: (state: AuthState): AuthState => {
      return {
        ...state,
        status: AuthStatus.UNAUTHED
      };
    },

    [ActionTypes.SET_AUTH_LOADING]: (state: AuthState): AuthState => {
      return {
        ...state,
        status: AuthStatus.LOADING
      }
    },

    [ActionTypes.SET_AUTH_PASSWORD_ERROR]: (state: AuthState): AuthState => {
      return {
        ...state,
        status: AuthStatus.ERROR_PASSWORD
      }
    }
  },

  {
    status: undefined
  }
);
