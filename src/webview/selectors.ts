import * as _ from 'lodash';
import { Map } from 'immutable';
import { createSelector } from 'reselect';


import { AppState } from '../rootReducer';
import WebViewRequest from './models/webViewRequest';

const webviewRequestsByIdSelector = (state: AppState) => state.webview.requestsById || Map<string, WebViewRequest>();

export const lastWebViewRequest = createSelector(
  webviewRequestsByIdSelector,
  webviewRequestsById =>
    _.maxBy(webviewRequestsById.toArray(), request => request.startAt)
)
