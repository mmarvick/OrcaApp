import { combineReducers, Reducer } from 'redux';

import AuthReducer, { AuthState } from './auth/reducer';
import WebViewReducer, { WebViewState } from './webview/reducer';

const appReducer: Reducer<AppState> = combineReducers({
  auth: AuthReducer,
  webview: WebViewReducer
});

const rootReducer: Reducer<any> = (state: AppState, action: any) => {
  // Setting state as undefined tells all reducers to use initial state
  if (action.type === 'CLEAR_ALL_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export interface AppState {
  auth: AuthState,
  webview: WebViewState;
}

export default rootReducer;
