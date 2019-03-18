import { createAction } from 'redux-actions';

import ActionTypes from './actionTypes';
import WebViewRequest from './models/webViewRequest';

export const addWebViewRequest = createAction<WebViewRequest>(ActionTypes.ADD_WEB_VIEW_REQUEST);
export const updateWebViewRequest = createAction<Partial<WebViewRequest>>(ActionTypes.UPDATE_WEB_VIEW_REQUEST);
