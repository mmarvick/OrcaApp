import { handleActions, Action } from 'redux-actions';
import { Map } from 'immutable';

import ActionTypes from './actionTypes';
import WebViewRequest from './models/webViewRequest';

export interface WebViewState {
  requestsById: Map<string, WebViewRequest>;
}

export default handleActions<WebViewState, {}>(
  {
    [ActionTypes.ADD_WEB_VIEW_REQUEST]: (state: WebViewState, action: Action<WebViewRequest>): WebViewState => {
      let request = action.payload;
      return {
        ...state,
        requestsById: state.requestsById.set(request.id, request)
      };
    },

    [ActionTypes.UPDATE_WEB_VIEW_REQUEST]: (state: WebViewState, action: Action<Partial<WebViewRequest>>): WebViewState => {
      let updates = action.payload;
      let existing = state.requestsById.get(updates.id);

      // Don't add a new request if the existing one can't be found
      if (!existing) return state;

      // Otherwise, merge the updates in
      let updatedRequest: WebViewRequest = {
        ...existing,
        ...updates
      };

      return {
        ...state,
        requestsById: state.requestsById.set(updatedRequest.id, updatedRequest)
      };
    }
  },

  {
    requestsById: Map()
  }
);
