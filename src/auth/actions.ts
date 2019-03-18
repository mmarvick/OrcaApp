import { createAction } from 'redux-actions';

import ActionTypes from './actionTypes';

export const setAuthorized = createAction(ActionTypes.SET_AUTHORIZED);
export const setUnauthorized = createAction(ActionTypes.SET_UNAUTHORIZED);
export const setAuthLoading = createAction(ActionTypes.SET_AUTH_LOADING);
export const setAuthPasswordError = createAction(ActionTypes.SET_AUTH_PASSWORD_ERROR);
